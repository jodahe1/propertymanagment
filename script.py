#!/usr/bin/env python3
"""
Hexagonal Architecture Module Generator for E.D.G.E Backend

This script generates a complete module structure following hexagonal architecture
principles for the E.D.G.E backend project.

Usage:
    python script.py <module_name> [schema_file.json]

Examples:
    python script.py teacher
    python script.py student schema/student.json
    python script.py course schema/course.json

Schema file should contain field definitions (excluding id which is handled automatically):
{
  "name": { "type": "string", "required": true, "description": "The name" },
  "description": { "type": "string", "required": false, "description": "Optional description" },
  "email": { "type": "string", "required": true, "format": "email", "description": "Email address" }
}
"""
import json
import re
import sys
from pathlib import Path
from typing import Dict, List, Optional, Any


class ModuleGenerator:
    def __init__(
        self,
        module_name: str,
        schema_file: Optional[str] = None,
        base_path: str = "src",
    ):
        # Convert underscores to spaces for consistent processing
        self.module_name = module_name.replace("_", " ")
        self.module_name_pascal = self.to_pascal_case(self.module_name)
        self.module_name = self.to_camel_case(self.module_name)
        self.base_path = Path(base_path)
        self.module_path = self.base_path / self.module_name

        # Load schema if provided, otherwise use default
        self.schema = (
            self.load_schema(
                schema_file) if schema_file else self.get_default_schema()
        )

    def load_schema(self, schema_file: str) -> Dict[str, Any]:
        """Load schema from JSON file"""
        try:
            with open(schema_file, "r", encoding="utf-8") as f:
                schema = json.load(f)
            # Validate schema structure
            self.validate_schema(schema)
            return schema
        except FileNotFoundError:
            print(f"Error: Schema file '{schema_file}' not found")
            sys.exit(1)
        except json.JSONDecodeError as e:
            print(f"Error: Invalid JSON in schema file '{schema_file}': {e}")
            sys.exit(1)
        except Exception as e:
            print(f"Error loading schema: {e}")
            sys.exit(1)

    def get_default_schema(self) -> Dict[str, Any]:
        """Return default schema with name and description"""
        return {
            "name": {
                "type": "string",
                "required": True,
                "description": f"The name of the {self.module_name}",
            },
            "description": {
                "type": "string",
                "required": False,
                "description": f"Optional description of the {self.module_name}",
            },
        }

    def validate_schema(self, schema: Dict[str, Any]) -> None:
        """Validate the schema structure"""
        if not isinstance(schema, dict):
            raise ValueError("Schema must be a dictionary")

        for field_name, field_def in schema.items():
            if not isinstance(field_def, dict):
                raise ValueError(
                    f"Field '{field_name}' definition must be a dictionary"
                )

            if "type" not in field_def:
                raise ValueError(
                    f"Field '{field_name}' must have a 'type' property")

            valid_types = ["string", "number",
                           "boolean", "date", "uuid", "array"]
            if field_def["type"] not in valid_types:
                raise ValueError(
                    f"Field '{field_name}' has invalid type. Valid types: {valid_types}"
                )

    def get_field_names(self) -> List[str]:
        """Get list of field names from schema"""
        return list(self.schema.keys())

    def get_required_fields(self) -> List[str]:
        """Get list of required field names"""
        return [
            name for name, def_ in self.schema.items() if def_.get("required", False)
        ]

    def get_optional_fields(self) -> List[str]:
        """Get list of optional field names"""
        return [
            name
            for name, def_ in self.schema.items()
            if not def_.get("required", False)
        ]

    def get_typescript_type(self, field_def: Dict[str, Any]) -> str:
        """Convert schema type to TypeScript type"""
        field_type = field_def["type"]

        if field_type == "array":
            # Handle array types with proper item type detection
            items_type = field_def.get("items", {}).get("type", "string")
            if items_type == "string":
                return "string[]"
            elif items_type == "number" or items_type == "integer":
                return "number[]"
            elif items_type == "boolean":
                return "boolean[]"
            else:
                return "string[]"  # default fallback

        type_mapping = {
            "string": "string",
            "number": "number",
            "integer": "number",
            "boolean": "boolean",
            "date": "Date",
            "uuid": "string",
        }

        return type_mapping.get(field_type, "string")

    def get_class_validator_decorator(
        self, field_name: str, field_def: Dict[str, Any]
    ) -> List[str]:
        """Get class-validator decorators for a field"""
        decorators = []

        if field_def.get("required", False):
            decorators.append("@IsNotEmpty()")
        else:
            decorators.append("@IsOptional()")

        field_type = field_def["type"]
        if field_type == "string":
            if field_def.get("format") == "email":
                decorators.append("@IsEmail()")
            elif field_def.get("format") == "uuid":
                decorators.append("@IsUUID()")
            else:
                decorators.append("@IsString()")
        elif field_type == "number":
            decorators.append("@IsNumber()")
        elif field_type == "boolean":
            decorators.append("@IsBoolean()")
        elif field_type == "date":
            decorators.append("@IsDate()")
            decorators.append("@Type(() => Date)")
        elif field_type == "array":
            decorators.append("@IsArray()")

        return decorators

    def to_pascal_case(self, text: str) -> str:
        words = re.findall(r"\w+", text)
        return "".join(word.capitalize() for word in words)

    def to_camel_case(self, text: str) -> str:
        words = re.findall(r"\w+", text)
        if not words:
            return ""
        return words[0].lower() + "".join(word.capitalize() for word in words[1:])

    def create_directory_structure(self) -> None:
        """Create the complete directory structure for the module"""
        directories = [
            # Root module directory
            self.module_path,
            # Application layer
            self.module_path / "application" / "mappers",
            self.module_path / "application" / "ports" / "incoming" / "commands",
            self.module_path / "application" / "ports" / "incoming" / "query",
            self.module_path / "application" / "ports" / "outgoing",
            self.module_path / "application" / "useCases",
            # Domain layer
            self.module_path / "domain" / "entities",
            self.module_path / "domain" / "valueObjects",
            # Infrastructure layer
            self.module_path / "infrastructure" / "adapters" / "eventbus",
            self.module_path / "infrastructure" / "adapters" / "in-memory",
            self.module_path / "infrastructure" / "adapters" / "orm" / "mappers",
            self.module_path
            / "infrastructure"
            / "adapters"
            / "orm"
            / "persistence-entities",
            self.module_path / "infrastructure" / "adapters" / "orm" / "repositories",
            # Presentation layer
            self.module_path / "presentation" / "http" / "dto",
        ]

        for directory in directories:
            directory.mkdir(parents=True, exist_ok=True)
            print(f"Created directory: {directory}")

    def get_file_templates(self) -> Dict[str, str]:
        """Return templates for all files to be generated"""
        return {
            # Root module files
            f"{self.module_name}.module-definition.ts": self.get_module_definition_template(),
            f"{self.module_name}.module.ts": self.get_module_template(),
            # Application layer files
            "application/mappers/index.ts": self.get_application_mappers_index_template(),
            f"application/mappers/{self.module_name}.mapper.ts": self.get_application_mapper_template(),
            "application/ports/incoming/index.ts": self.get_incoming_ports_index_template(),
            f"application/ports/incoming/commands/create{self.module_name_pascal}.command.ts": self.get_create_command_template(),
            f"application/ports/incoming/commands/delete{self.module_name_pascal}.command.ts": self.get_delete_command_template(),
            f"application/ports/incoming/commands/update{self.module_name_pascal}.command.ts": self.get_update_command_template(),
            f"application/ports/incoming/query/getAll{self.module_name_pascal}s.query.ts": self.get_get_all_query_template(),
            f"application/ports/incoming/query/get{self.module_name_pascal}ById.query.ts": self.get_get_by_id_query_template(),
            f"application/ports/outgoing/{self.module_name}.repository.ts": self.get_repository_port_template(),
            "application/useCases/index.ts": self.get_use_cases_index_template(),
            f"application/useCases/create{self.module_name_pascal}UseCase.ts": self.get_create_use_case_template(),
            f"application/useCases/delete{self.module_name_pascal}UseCase.ts": self.get_delete_use_case_template(),
            f"application/useCases/getAll{self.module_name_pascal}sUseCase.ts": self.get_get_all_use_case_template(),
            f"application/useCases/get{self.module_name_pascal}ByIdUseCase.ts": self.get_get_by_id_use_case_template(),
            f"application/useCases/update{self.module_name_pascal}UseCase.ts": self.get_update_use_case_template(),
            # Domain layer files
            "domain/entities/index.ts": self.get_domain_entities_index_template(),
            f"domain/entities/{self.module_name}.entity.ts": self.get_entity_template(),
            "domain/valueObjects/index.ts": self.get_value_objects_index_template(),
            f"domain/valueObjects/{self.module_name}Enum.ts": self.get_value_object_template(),
            # Infrastructure layer files
            f"infrastructure/{self.module_name}-infrastructure.module-definition.ts": self.get_infrastructure_module_definition_template(),
            f"infrastructure/{self.module_name}-infrastructure.module.ts": self.get_infrastructure_module_template(),
            "infrastructure/adapters/eventbus/.gitkeep": "",
            "infrastructure/adapters/in-memory/in-memory-persistence.module.ts": self.get_in_memory_persistence_template(),
            "infrastructure/adapters/orm/index.ts": self.get_orm_index_template(),
            "infrastructure/adapters/orm/mikro-orm-persistence.module.ts": self.get_mikro_orm_persistence_template(),
            f"infrastructure/adapters/orm/mappers/{self.module_name}.mapper.ts": self.get_orm_mapper_template(),
            f"infrastructure/adapters/orm/persistence-entities/{self.module_name}.persistence.entity.ts": self.get_persistence_entity_template(),
            f"infrastructure/adapters/orm/repositories/{self.module_name}.repository.ts": self.get_orm_repository_template(),
            # Presentation layer files
            f"presentation/http/{self.module_name}.controller.ts": self.get_controller_template(),
            "presentation/http/dto/index.ts": self.get_dto_index_template(),
            f"presentation/http/dto/{self.module_name}Response.dto.ts": self.get_response_dto_template(),
            f"presentation/http/dto/create{self.module_name_pascal}.dto.ts": self.get_create_dto_template(),
            f"presentation/http/dto/update{self.module_name_pascal}.dto.ts": self.get_update_dto_template(),
        }

    def create_files(self) -> None:
        """Create all files with their respective templates"""
        file_templates = self.get_file_templates()

        for file_path, content in file_templates.items():
            full_path = self.module_path / file_path

            # Create file with content
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)

            print(f"Created file: {full_path}")

    def generate(self) -> None:
        """Generate the complete module structure"""
        print(f"Generating {self.module_name_pascal} module structure...")
        print(f"Target directory: {self.module_path.absolute()}")

        # Create directory structure
        self.create_directory_structure()

        # Create files
        self.create_files()

        print(f"\n✅ Successfully generated {self.module_name_pascal} module!")
        print(f"📁 Module created at: {self.module_path.absolute()}")

    # Template methods for each file type
    def get_module_definition_template(self) -> str:
        return f"""import {{ ConfigurableModuleBuilder }} from '@nestjs/common';

export interface T{self.module_name_pascal}ModuleConfigurationOptions {{
  storage_driver: 'orm' | 'in-memory';
}}

export const {{
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: {self.module_name.upper()}_MODULE_OPTIONS_TOKEN,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
}} = new ConfigurableModuleBuilder<T{self.module_name_pascal}ModuleConfigurationOptions>().build();

export type {self.module_name_pascal}ModuleOptions = typeof OPTIONS_TYPE;
export type {self.module_name_pascal}ModuleAsyncOptions = typeof ASYNC_OPTIONS_TYPE;
"""

    def get_module_template(self) -> str:
        return f"""import {{ CqrsModule }} from '@nestjs/cqrs';
import {{ {self.module_name_pascal}UseCases }} from './application/useCases';
import {{ {self.module_name_pascal}Controller }} from './presentation/http/{self.module_name}.controller';
import {{ Module }} from '@nestjs/common';
import {{ {self.module_name_pascal}InfrastructureModule }} from './infrastructure/{self.module_name}-infrastructure.module';

@Module({{
    imports: [
        CqrsModule,
        {self.module_name_pascal}InfrastructureModule.register({{
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }}),
    ],
    controllers: [{self.module_name_pascal}Controller],
    providers: [...{self.module_name_pascal}UseCases],
}})
export class {self.module_name_pascal}Module {{}}
"""

    def get_application_mappers_index_template(self) -> str:
        return f"""export * from './{self.module_name}.mapper';
"""

    def get_application_mapper_template(self) -> str:
        # Generate field mappings for createDtoToCommand
        create_dto_fields = []
        for field_name in self.get_field_names():
            create_dto_fields.append(f"dto.{field_name}")
        create_dto_fields.append("dto.isActive")  # Add isActive

        # Generate field mappings for updateDtoToCommand
        update_dto_fields = ["dto.id"]
        for field_name in self.get_field_names():
            update_dto_fields.append(f"dto.{field_name}")
        update_dto_fields.append("dto.isActive")

        # Generate field mappings for createCommandToDomain
        create_command_fields = []
        for field_name in self.get_field_names():
            create_command_fields.append(f"command.{field_name}")
        create_command_fields.extend(["null", "command.isActive"])  # id

        # Generate field mappings for updateCommandToDomain (call entity's update method)
        update_command_fields = []
        for field_name in self.get_field_names():
            update_command_fields.append(f"command.{field_name}")
        update_command_fields.append("command.isActive")

        # Generate field mappings for toResponseDto
        response_dto_fields = []
        base_fields = [
            "isActive",
            "createdAt",
            "updatedAt",
            "createdBy",
            "updatedBy",
        ]
        response_dto_fields.append(f"id: {self.module_name}.id")
        for field_name in self.get_field_names():
            response_dto_fields.append(
                f"{field_name}: {self.module_name}.{field_name}")

        for field in base_fields:
            response_dto_fields.append(f"{field}: {self.module_name}.{field}")

        create_dto_str = ',\n            '.join(create_dto_fields)
        update_dto_str = ',\n            '.join(update_dto_fields)
        create_command_str = ',\n            '.join(create_command_fields)
        update_command_str = ',\n            '.join(update_command_fields)
        response_dto_str = ',\n            '.join(response_dto_fields)

        return f"""import {{ {self.module_name_pascal} }} from 'src/{self.module_name}/domain/entities/{self.module_name}.entity';
import {{ Create{self.module_name_pascal}Dto, Update{self.module_name_pascal}Dto, {self.module_name_pascal}ResponseDto }} from 'src/{self.module_name}/presentation/http/dto';
import {{ Create{self.module_name_pascal}Command, Update{self.module_name_pascal}Command }} from '../ports/incoming';
import {{ PaginatedResponseDto, PaginatedResult, PaginationMapper }} from '@shared/shared-kernel';

export class {self.module_name_pascal}Mapper {{
    static createDtoToCommand(dto: Create{self.module_name_pascal}Dto): Create{self.module_name_pascal}Command {{
        return new Create{self.module_name_pascal}Command(
            {create_dto_str},
        );
    }}
    
    static updateDtoToCommand(dto: Update{self.module_name_pascal}Dto): Update{self.module_name_pascal}Command {{
        return new Update{self.module_name_pascal}Command(
            {update_dto_str},
        );
    }}
    
    static createCommandToDomain(command: Create{self.module_name_pascal}Command): {self.module_name_pascal} {{
        return new {self.module_name_pascal}(
            {create_command_str},
        );
    }}    static updateCommandToDomain(command: Update{self.module_name_pascal}Command, {self.module_name}: {self.module_name_pascal}): {self.module_name_pascal} {{
        {self.module_name}.update(
            {update_command_str},
        );
        return {self.module_name};
    }}

    static toResponseDto({self.module_name}: {self.module_name_pascal}): {self.module_name_pascal}ResponseDto {{
        return {{
            {response_dto_str},
        }};
    }}
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<{self.module_name_pascal}>): PaginatedResponseDto<{self.module_name_pascal}ResponseDto> {{
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }}
}}
"""

    def get_incoming_ports_index_template(self) -> str:
        return f"""// Commands
export * from './commands/create{self.module_name_pascal}.command';
export * from './commands/delete{self.module_name_pascal}.command';
export * from './commands/update{self.module_name_pascal}.command';

// Queries
export * from './query/getAll{self.module_name_pascal}s.query';
export * from './query/get{self.module_name_pascal}ById.query';
"""

    def get_create_command_template(self) -> str:
        # Generate constructor parameters for all schema fields
        constructor_params = []
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            field_type = self.get_typescript_type(field_def)
            optional_marker = "?" if not field_def.get(
                "required", False) else ""
            constructor_params.append(
                f"public readonly {field_name}{optional_marker}: {field_type}"
            )  # Add isActive field
        constructor_params.append("public readonly isActive?: boolean")

        params_str = ',\n        '.join(constructor_params)
        return f"""export class Create{self.module_name_pascal}Command {{
    constructor(
        {params_str},
    ) {{ }}
}}
"""

    def get_delete_command_template(self) -> str:
        return f"""export class Delete{self.module_name_pascal}Command {{
  constructor(
    public readonly id: string,
  ) {{}}
}}
"""

    def get_update_command_template(self) -> str:
        # Generate constructor parameters for update (id + all schema fields with same required/optional as create)
        constructor_params = ["public readonly id: string"]

        # Add all fields with the same required/optional status as in create
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            field_type = self.get_typescript_type(field_def)
            optional_marker = "?" if not field_def.get(
                "required", False) else ""
            constructor_params.append(
                f"public readonly {field_name}{optional_marker}: {field_type}"
            )

        # Add isActive field (required, same as create)
        constructor_params.append("public readonly isActive?: boolean")

        params_str = ',\n        '.join(constructor_params)
        return f"""export class Update{self.module_name_pascal}Command {{
    constructor(
        {params_str},
    ) {{ }}
}}
"""

    def get_get_all_query_template(self) -> str:
        return f"""import {{ QueryOptions }} from "@shared/shared-kernel";
export class GetAll{self.module_name_pascal}sQuery {{
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {{}}
}}
"""

    def get_get_by_id_query_template(self) -> str:
        return f"""export class Get{self.module_name_pascal}ByIdQuery {{
  constructor(
    public readonly id: string,
  ) {{}}
}}
"""

    def get_repository_port_template(self) -> str:
        return f"""import {{ {self.module_name_pascal} }} from 'src/{self.module_name}/domain/entities';
import {{ BaseRepository }} from "@shared/shared-kernel";

export abstract class T{self.module_name_pascal}Repository extends BaseRepository<{self.module_name_pascal}> {{
}}
"""

    def get_use_cases_index_template(self) -> str:
        return f"""import {{ Provider }} from "@nestjs/common";
import {{ Create{self.module_name_pascal}UseCase }} from "./create{self.module_name_pascal}UseCase";
import {{ GetAll{self.module_name_pascal}sUseCase }} from "./getAll{self.module_name_pascal}sUseCase";
import {{ Get{self.module_name_pascal}ByIdUseCase }} from "./get{self.module_name_pascal}ByIdUseCase";
import {{ Delete{self.module_name_pascal}UseCase }} from "./delete{self.module_name_pascal}UseCase";
import {{ Update{self.module_name_pascal}UseCase }} from "./update{self.module_name_pascal}UseCase";

export const {self.module_name_pascal}UseCases: Provider[] = [Create{self.module_name_pascal}UseCase, GetAll{self.module_name_pascal}sUseCase, Get{self.module_name_pascal}ByIdUseCase, Delete{self.module_name_pascal}UseCase, Update{self.module_name_pascal}UseCase];
"""

    def get_create_use_case_template(self) -> str:
        return f"""import {{ CommandHandler, ICommandHandler }} from "@nestjs/cqrs";
import {{ Create{self.module_name_pascal}Command }} from "../ports/incoming";
import {{ T{self.module_name_pascal}Repository }} from "../ports/outgoing/{self.module_name}.repository";
import {{ {self.module_name_pascal}ResponseDto }} from "src/{self.module_name}/presentation/http/dto";
import {{ {self.module_name_pascal}Mapper }} from "../mappers";

@CommandHandler(Create{self.module_name_pascal}Command)
export class Create{self.module_name_pascal}UseCase implements ICommandHandler<Create{self.module_name_pascal}Command> {{
  constructor(
    private readonly {self.module_name}Repository: T{self.module_name_pascal}Repository,
  ) {{ }}

  async execute(command: Create{self.module_name_pascal}Command): Promise<{self.module_name_pascal}ResponseDto> {{
    const created{self.module_name_pascal} = await this.{self.module_name}Repository.create({self.module_name_pascal}Mapper.createCommandToDomain(command));
    return {self.module_name_pascal}Mapper.toResponseDto(created{self.module_name_pascal});
  }}
}}
"""

    def get_delete_use_case_template(self) -> str:
        return f"""import {{ CommandHandler, ICommandHandler }} from "@nestjs/cqrs";
import {{ Delete{self.module_name_pascal}Command }} from "../ports/incoming";
import {{ T{self.module_name_pascal}Repository }} from "../ports/outgoing/{self.module_name}.repository";
import {{ InternalServerErrorException, NotFoundException }} from "@nestjs/common";

@CommandHandler(Delete{self.module_name_pascal}Command)
export class Delete{self.module_name_pascal}UseCase implements ICommandHandler<Delete{self.module_name_pascal}Command> {{
    constructor(
        private readonly {self.module_name}Repository: T{self.module_name_pascal}Repository,
    ) {{ }}

    async execute(command: Delete{self.module_name_pascal}Command): Promise<string> {{
        const {self.module_name} = await this.{self.module_name}Repository.findById(command.id);
        if (!{self.module_name}) {{
            throw new NotFoundException(`{self.module_name_pascal} with id ${{command.id}} not found`);
        }}

        const flag = await this.{self.module_name}Repository.delete(command.id);
        if (flag)
            return `{self.module_name_pascal} with id ${{command.id}} deleted successfully`;
        else
            throw new InternalServerErrorException(`{self.module_name_pascal} with id ${{command.id}} could not be deleted`);
    }}
}}
"""

    def get_get_all_use_case_template(self) -> str:
        return f"""import {{ IQueryHandler, QueryHandler }} from "@nestjs/cqrs";
import {{ T{self.module_name_pascal}Repository }} from "../ports/outgoing/{self.module_name}.repository";
import {{ GetAll{self.module_name_pascal}sQuery }} from "../ports/incoming";
import {{ {self.module_name_pascal}Mapper }} from "../mappers";
import {{ {self.module_name_pascal}ResponseDto }} from "src/{self.module_name}/presentation/http/dto";
import {{ PaginatedResponseDto }} from "@shared/shared-kernel";

@QueryHandler(GetAll{self.module_name_pascal}sQuery)
export class GetAll{self.module_name_pascal}sUseCase implements IQueryHandler<GetAll{self.module_name_pascal}sQuery> {{
    constructor(
        private readonly repository: T{self.module_name_pascal}Repository,
    ) {{ }}

    async execute(query: GetAll{self.module_name_pascal}sQuery): Promise<PaginatedResponseDto<{self.module_name_pascal}ResponseDto>> {{
        const {self.module_name}s = await this.repository.findPaginated(query.queryOptions);
        return {self.module_name_pascal}Mapper.toPaginatedResponseDto({self.module_name}s);
    }}
}}
"""

    def get_get_by_id_use_case_template(self) -> str:
        return f"""import {{ IQueryHandler, QueryHandler }} from "@nestjs/cqrs";
import {{ Get{self.module_name_pascal}ByIdQuery }} from "../ports/incoming";
import {{ T{self.module_name_pascal}Repository }} from "../ports/outgoing/{self.module_name}.repository";
import {{ {self.module_name_pascal}ResponseDto }} from "src/{self.module_name}/presentation/http/dto";
import {{ {self.module_name_pascal}Mapper }} from "../mappers";
import {{ NotFoundException }} from "@nestjs/common";
import {{ QueryOptions }} from "@shared/shared-kernel";

@QueryHandler(Get{self.module_name_pascal}ByIdQuery)
export class Get{self.module_name_pascal}ByIdUseCase implements IQueryHandler<Get{self.module_name_pascal}ByIdQuery> {{
    constructor(
        private readonly repository: T{self.module_name_pascal}Repository,
    ) {{ }}

    async execute(query: Get{self.module_name_pascal}ByIdQuery): Promise<{self.module_name_pascal}ResponseDto | null> {{
        const {self.module_name} = await this.repository.findById(query.id);
        if (!{self.module_name}) {{
            throw new NotFoundException(`{self.module_name_pascal} with id ${{query.id}} not found`);
        }}
        return {self.module_name_pascal}Mapper.toResponseDto({self.module_name});
    }}
}}
"""

    def get_update_use_case_template(self) -> str:
        return f"""import {{ CommandHandler, ICommandHandler }} from "@nestjs/cqrs";
import {{ Update{self.module_name_pascal}Command }} from "../ports/incoming";
import {{ T{self.module_name_pascal}Repository }} from "../ports/outgoing/{self.module_name}.repository";
import {{ {self.module_name_pascal}ResponseDto }} from "src/{self.module_name}/presentation/http/dto";
import {{ {self.module_name_pascal}Mapper }} from "../mappers";
import {{ NotFoundException }} from "@nestjs/common";

@CommandHandler(Update{self.module_name_pascal}Command)
export class Update{self.module_name_pascal}UseCase implements ICommandHandler<Update{self.module_name_pascal}Command> {{
    constructor(
        private readonly {self.module_name}Repository: T{self.module_name_pascal}Repository,
    ) {{ }}
    
    async execute(command: Update{self.module_name_pascal}Command): Promise<{self.module_name_pascal}ResponseDto> {{
        const {self.module_name} = await this.{self.module_name}Repository.findById(command.id);
        if (!{self.module_name}) {{
            throw new NotFoundException(`{self.module_name_pascal} with id ${{command.id}} not found`);
        }}
          const updated{self.module_name_pascal} = await this.{self.module_name}Repository.update(command.id, {self.module_name_pascal}Mapper.updateCommandToDomain(command, {self.module_name}));
        return {self.module_name_pascal}Mapper.toResponseDto(updated{self.module_name_pascal});
    }}
}}
"""

    def get_domain_entities_index_template(self) -> str:
        return f"""export * from './{self.module_name}.entity';
"""

    def get_entity_template(self) -> str:
        # Generate private properties with getters
        property_declarations = []
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            field_type = self.get_typescript_type(field_def)
            optional_marker = "?" if not field_def.get(
                "required", False) else ""

            # Add private property
            property_declarations.append(
                f"    private _{field_name}{optional_marker}: {field_type};"
            )
            # Add getter
            property_declarations.append(
                f"    get {field_name}() {{ return this._{field_name} }}"
            )
            property_declarations.append("")  # Empty line for spacing

        property_declarations.append(f"    private _isActive: boolean;")
        # Add getter
        property_declarations.append(
            f"    get isActive() {{ return this._isActive }}")
        property_declarations.append("")  # Empty line for spacing

        # Generate constructor parameters (fields first, then base class parameters)
        constructor_params = []
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            field_type = self.get_typescript_type(field_def)
            optional_marker = "?" if not field_def.get(
                "required", False) else ""
            constructor_params.append(
                f"        {field_name}{optional_marker}: {field_type}"
            )

        # Add base class parameters
        constructor_params.extend(
            [
                "        //base class properties",
                "        id?: string",
                "        isActive?: boolean",
                "        createdAt?: Date",
                "        updatedAt?: Date",
                "        createdBy?: string",
                "        updatedBy?: string",
            ]
        )

        # Generate constructor assignments
        constructor_assignments = [
            "        super(",
            "            id,",
            "            createdAt,",
            "            updatedAt,",
            "            createdBy,",
            "            updatedBy,",
            "        );",
        ]

        for field_name in self.get_field_names():
            constructor_assignments.append(
                f"        this._{field_name} = {field_name};"
            )
        constructor_assignments.append(f"        this._isActive = isActive;")

        # Generate update method parameters
        update_params = []
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            field_type = self.get_typescript_type(field_def)
            optional_marker = "?" if not field_def.get(
                "required", False) else ""
            update_params.append(
                f"        {field_name}{optional_marker}: {field_type}")
        update_params.append(
            "        isActive?: boolean"
        )  # Generate update method assignments
        update_assignments = []
        for field_name in self.get_field_names():
            update_assignments.append(
                f"        this._{field_name} = {field_name};")
        update_assignments.append("        ")
        update_assignments.append("        this._isActive = isActive;")

        constructor_params_str = ',\n'.join(constructor_params)
        update_params_str = ',\n'.join(update_params)
        property_declarations_str = '\n\n'.join(property_declarations)
        constructor_assignments_str = '\n'.join(constructor_assignments)
        update_assignments_str = '\n        '.join(update_assignments)

        return f"""import {{ Entity }} from "@shared/shared-kernel";

export class {self.module_name_pascal} extends Entity {{

{property_declarations_str}

    constructor(
{constructor_params_str},
    ) {{
{constructor_assignments_str}
    }}

    public update(
{update_params_str},
    ) {{
{update_assignments_str}
    }}


}}
"""

    def get_value_objects_index_template(self) -> str:
        return f"""export * from './{self.module_name}Enum';
"""

    def get_value_object_template(self) -> str:
        return f"""export enum {self.module_name_pascal}Enum {{
}}
"""

    def get_infrastructure_module_definition_template(self) -> str:
        return f"""import {{ ConfigurableModuleBuilder }} from '@nestjs/common';

export interface T{self.module_name_pascal}InfrastructureConfigurationOptions {{
  storage_driver: 'orm' | 'in-memory';
}}

export const {{
  ConfigurableModuleClass,
  MODULE_OPTIONS_TOKEN: {self.module_name.upper()}_INFRASTRUCTURE_MODULE_OPTIONS,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
}} = new ConfigurableModuleBuilder<T{self.module_name_pascal}InfrastructureConfigurationOptions>().build();
"""

    def get_infrastructure_module_template(self) -> str:
        return f"""import {{ DynamicModule, Module }} from '@nestjs/common';
import {{
  ConfigurableModuleClass,
  OPTIONS_TYPE,
}} from './{self.module_name}-infrastructure.module-definition';
import {{ InMemoryPersistenceModule }} from './adapters/in-memory/in-memory-persistence.module';
import {{ MikroOrmPersistenceModule }} from './adapters/orm/mikro-orm-persistence.module';

@Module({{}})
export class {self.module_name_pascal}InfrastructureModule extends ConfigurableModuleClass {{
  constructor() {{
    super();
  }}
  static register(options: typeof OPTIONS_TYPE): DynamicModule {{
    super.register(options);

    const persistenceModule =
      options.storage_driver === 'in-memory'
        ? InMemoryPersistenceModule
        : MikroOrmPersistenceModule;

    return {{
      module: {self.module_name_pascal}InfrastructureModule,
      imports: [persistenceModule],
      exports: [persistenceModule],
    }};
  }}
}}
"""

    def get_in_memory_persistence_template(self) -> str:
        return f"""import {{ Module }} from '@nestjs/common';
// In-memory implementation can be added here for testing purposes
// This module would provide in-memory implementations of repositories

@Module({{
  providers: [
    // Add in-memory repository implementations here
  ],
  exports: [
    // Export in-memory repository implementations here
  ],
}})
export class InMemoryPersistenceModule {{}}
"""

    def get_orm_index_template(self) -> str:
        return f"""export * from './mikro-orm-persistence.module';
export * from './repositories/{self.module_name}.repository';
export * from './persistence-entities/{self.module_name}.persistence.entity';
export * from './mappers/{self.module_name}.mapper';
"""

    def get_mikro_orm_persistence_template(self) -> str:
        return f"""import {{ Module }} from '@nestjs/common';
import {{ MikroOrmModule }} from '@mikro-orm/nestjs';
import {{ {self.module_name_pascal}PersistenceEntity }} from './persistence-entities/{self.module_name}.persistence.entity';
import {{ T{self.module_name_pascal}Repository }} from 'src/{self.module_name}/application/ports/outgoing/{self.module_name}.repository';
import {{ {self.module_name_pascal}Repository }} from './repositories/{self.module_name}.repository';


@Module({{
  imports: [
    MikroOrmModule.forFeature([{self.module_name_pascal}PersistenceEntity]),
  ],
  providers: [
    {{
      provide: T{self.module_name_pascal}Repository,
      useClass: {self.module_name_pascal}Repository,
    }},
  ],
  exports: [T{self.module_name_pascal}Repository],
}})
export class MikroOrmPersistenceModule {{}}
"""

    def get_orm_mapper_template(self) -> str:
        # Generate field mappings for toDomain - schema fields first, then id
        domain_constructor_args = []
        for field_name in self.get_field_names():
            domain_constructor_args.append(f"entity.{field_name}")
        domain_constructor_args.append("entity.id")

        # Generate field mappings for toEntity
        entity_assignments = ["entity.id = domain.id"]
        for field_name in self.get_field_names():
            entity_assignments.append(
                f"entity.{field_name} = domain.{field_name}")

        domain_constructor_str = ',\n            '.join(
            domain_constructor_args)
        entity_assignments_str = ';\n        '.join(entity_assignments)

        return f"""import {{ {self.module_name_pascal} }} from 'src/{self.module_name}/domain/entities';
import {{ {self.module_name_pascal}PersistenceEntity }} from '../persistence-entities/{self.module_name}.persistence.entity';
import {{ EntityManager }} from '@mikro-orm/core';

export class {self.module_name_pascal}PersistenceMapper {{
    static toDomain(entity: {self.module_name_pascal}PersistenceEntity): {self.module_name_pascal} {{
        return new {self.module_name_pascal}(
            {domain_constructor_str},
        );
    }}

    static toEntity(domain: {self.module_name_pascal}, em: EntityManager): {self.module_name_pascal}PersistenceEntity {{
        const entity = new {self.module_name_pascal}PersistenceEntity();
        {entity_assignments_str};
        return entity;
    }}
}}
"""

    def get_persistence_entity_template(self) -> str:
        # Generate properties for all schema fields
        properties = []
        for field_name, field_def in self.schema.items():
            nullable = "nullable: true" if not field_def.get(
                "required", False) else ""
            property_options = f"{{ {nullable} }}" if nullable else ""

            if field_def["type"] == "date":
                properties.append(
                    f"  @Property({property_options})\n  {field_name}{'?' if not field_def.get('required', False) else ''}: Date;"
                )
            elif field_def["type"] == "boolean":
                default_value = " = true" if field_def.get("default") else ""
                properties.append(
                    f"  @Property({property_options})\n  {field_name}{'?' if not field_def.get('required', False) else ''}: boolean{default_value};"
                )
            elif field_def["type"] == "number" or field_def["type"] == "integer":
                properties.append(
                    f"  @Property({property_options})\n  {field_name}{'?' if not field_def.get('required', False) else ''}: number;"
                )
            elif field_def["type"] == "array":
                # Handle array types
                items_type = field_def.get("items", {}).get("type", "string")
                if items_type == "string":
                    ts_type = "string[]"
                elif items_type == "number" or items_type == "integer":
                    ts_type = "number[]"
                elif items_type == "boolean":
                    ts_type = "boolean[]"
                else:
                    ts_type = "string[]"  # default fallback

                # Add type: 'json' for MikroORM array handling
                array_options = (
                    f"{{ type: 'json'{', ' + nullable if nullable else ''} }}"
                    if nullable
                    else "{{ type: 'json' }}"
                )
                properties.append(
                    f"  @Property({array_options})\n  {field_name}{'?' if not field_def.get('required', False) else ''}: {ts_type};"
                )
            else:  # string, uuid (default to string)
                properties.append(
                    f"  @Property({property_options})\n  {field_name}{'?' if not field_def.get('required', False) else ''}: string;"
                )

        properties_str = '\n\n'.join(properties)

        return f"""import {{ Entity, PrimaryKey, Property }} from '@mikro-orm/core';
import {{ PersistenceEntity }} from '@shared/shared-kernel/entities/persistence/persistence.entity';

@Entity({{ tableName: '{self.module_name_pascal}' }})
export class {self.module_name_pascal}PersistenceEntity extends PersistenceEntity{{
  @PrimaryKey({{ type: 'uuid', defaultRaw: 'gen_random_uuid()' }})
  id!: string;

{properties_str}
}}
"""

    def get_orm_repository_template(self) -> str:
        # Generate updateEntity method assignments
        update_assignments = []
        for field_name in self.get_field_names():
            field_def = self.schema[field_name]
            if field_def.get("required", False):
                update_assignments.append(
                    f"if (updates.{field_name}) entity.{field_name} = updates.{field_name};"
                )
            else:
                update_assignments.append(
                    f"if (updates.{field_name} !== undefined) entity.{field_name} = updates.{field_name};"
                )

        update_assignments_str = '\n        '.join(update_assignments)

        return f"""import {{ EntityManager, EntityRepository }} from "@mikro-orm/core";
import {{ InjectRepository }} from "@mikro-orm/nestjs";
import {{ Injectable }} from "@nestjs/common";
import {{ MikroOrmBaseRepository }} from "@shared/shared-kernel";
import {{ T{self.module_name_pascal}Repository }} from "src/{self.module_name}/application/ports/outgoing/{self.module_name}.repository";
import {{ {self.module_name_pascal} }} from "src/{self.module_name}/domain/entities";
import {{ {self.module_name_pascal}PersistenceMapper }} from "../mappers/{self.module_name}.mapper";
import {{ {self.module_name_pascal}PersistenceEntity }} from "../persistence-entities/{self.module_name}.persistence.entity";

@Injectable()
export class {self.module_name_pascal}Repository extends MikroOrmBaseRepository<{self.module_name_pascal}> implements T{self.module_name_pascal}Repository {{
    constructor(
        @InjectRepository({self.module_name_pascal}PersistenceEntity)
        private readonly repo: EntityRepository<{self.module_name_pascal}PersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {{
        super(repo, entityManager);
    }}

    protected toDomain(entity: {self.module_name_pascal}PersistenceEntity): {self.module_name_pascal} {{
        return {self.module_name_pascal}PersistenceMapper.toDomain(entity);
    }}
    protected toEntity(domain: {self.module_name_pascal}): {self.module_name_pascal}PersistenceEntity {{
        return {self.module_name_pascal}PersistenceMapper.toEntity(domain, this.entityManager);
    }}
    protected updateEntity(entity: {self.module_name_pascal}PersistenceEntity, updates: {self.module_name_pascal}): void {{
        {update_assignments_str}
    }}
}}
"""

    def get_controller_template(self) -> str:
        return f"""import {{ Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query }} from '@nestjs/common';
import {{ CommandBus, QueryBus }} from '@nestjs/cqrs';
import {{ ApiOperation, ApiResponse }} from '@nestjs/swagger';
import {{ QueryDto, QueryMapper }} from '@shared/shared-kernel';
import {{ {self.module_name_pascal}Mapper }} from 'src/{self.module_name}/application/mappers';
import {{ Delete{self.module_name_pascal}Command, GetAll{self.module_name_pascal}sQuery, Get{self.module_name_pascal}ByIdQuery }} from 'src/{self.module_name}/application/ports/incoming';
import {{ Create{self.module_name_pascal}Dto, Update{self.module_name_pascal}Dto }} from './dto';

@Controller('{self.module_name}s')
export class {self.module_name_pascal}Controller {{
    constructor(
        private commandBus: CommandBus,
        private queryBus: QueryBus,
    ) {{ }}

    @Get()
    @ApiOperation({{ summary: 'Get all {self.module_name}s' }})
    @ApiResponse({{ status: 200, description: 'Return all {self.module_name}s.' }})
    async findAll(@Query() queryDto: QueryDto) {{
        return await this.queryBus.execute(new GetAll{self.module_name_pascal}sQuery(QueryMapper.toQueryOptions(queryDto)));
    }}

    @Get(':id')
    @ApiOperation({{ summary: 'Get a {self.module_name} by id' }})
    @ApiResponse({{ status: 200, description: 'Return the {self.module_name}.' }})
    @ApiResponse({{ status: 404, description: '{self.module_name} not found.' }})
    async findOne(@Param('id', ParseUUIDPipe) id: string) {{
        return await this.queryBus.execute(new Get{self.module_name_pascal}ByIdQuery(id));
    }}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({{ summary: 'Create a new {self.module_name}' }})
    @ApiResponse({{ status: 201, description: 'The {self.module_name} has been successfully created.' }})
    @ApiResponse({{ status: 409, description: 'Conflict - {self.module_name} with this name already exists.' }})
    async create(@Body() createDto: Create{self.module_name_pascal}Dto) {{
        return await this.commandBus.execute({self.module_name_pascal}Mapper.createDtoToCommand(createDto));
    }}

    @Put(':id')
    @ApiOperation({{ summary: 'Update a {self.module_name}' }})
    @ApiResponse({{ status: 200, description: 'The {self.module_name} has been successfully updated.' }})
    @ApiResponse({{ status: 404, description: '{self.module_name} not found.' }})
    @ApiResponse({{ status: 409, description: 'Conflict - {self.module_name} with this name already exists.' }})
    async update(@Param('id', ParseUUIDPipe) id: string, @Body() data: Update{self.module_name_pascal}Dto) {{
        return await this.commandBus.execute({self.module_name_pascal}Mapper.updateDtoToCommand(data));
    }}

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({{ summary: 'Delete a {self.module_name}' }})
    @ApiResponse({{ status: 204, description: 'The {self.module_name} has been successfully deleted.' }})
    @ApiResponse({{ status: 404, description: '{self.module_name} not found.' }})
    async delete(@Param('id', ParseUUIDPipe) id: string) {{
        return await this.commandBus.execute(new Delete{self.module_name_pascal}Command(id));    }}
}}
"""

    def get_dto_index_template(self) -> str:
        return f"""export * from './{self.module_name}Response.dto';
export * from './create{self.module_name_pascal}.dto';
export * from './update{self.module_name_pascal}.dto';
"""

    def get_response_dto_template(self) -> str:
        # Generate response DTO properties (including base entity fields)
        response_properties = []

        # Add base entity fields to response DTO
        base_fields = [
            ("isActive", "boolean", "Whether the entity is active", "true"),
            (
                "createdAt",
                "Date",
                "When the entity was created",
                "2023-01-01T00:00:00Z",
            ),
            (
                "updatedAt",
                "Date",
                "When the entity was last updated",
                "2023-01-01T00:00:00Z",
            ),
            ("createdBy", "string", "Who created the entity", "user123"),
            ("updatedBy", "string", "Who last updated the entity", "user123"),
        ]

        for field_name, field_type, description, example in base_fields:
            optional_marker = (
                "?"
                if field_name in ["createdAt", "updatedAt", "createdBy", "updatedBy"]
                else ""
            )
            response_properties.append(
                f"""  @ApiProperty({{
    description: '{description}',
    example: '{example}',
    required: {str(field_name not in ["createdAt", "updatedAt", "createdBy", "updatedBy"]).lower()},
  }})
  {field_name}{optional_marker}: {field_type};"""
            )

        # Add schema fields to response DTO
        for field_name, field_def in self.schema.items():
            field_type = self.get_typescript_type(field_def)
            description = field_def.get(
                "description", f"The {field_name} of the {self.module_name}"
            )
            example = field_def.get("example", f"Example {field_name}")
            required = field_def.get("required", False)
            optional_marker = "" if required else "?"

            response_properties.append(
                f"""  @ApiProperty({{
    description: '{description}',
    example: '{example}',
    required: {str(required).lower()},
  }})
  {field_name}{optional_marker}: {field_type};"""
            )

        # Generate formatted response properties with proper newlines
        response_properties_str = "\n\n".join(response_properties)

        return f"""import {{ ApiProperty }} from '@nestjs/swagger';

export class {self.module_name_pascal}ResponseDto {{
  @ApiProperty({{
    description: 'The unique identifier of the {self.module_name}',
    example: '123e4567-e89b-12d3-a456-426614174000',
  }})
  id!: string;

{response_properties_str}
}}
"""

    def get_create_dto_template(self) -> str:
        # Generate imports for class-validator decorators
        all_decorators = set(["IsNotEmpty", "IsOptional", "IsBoolean"])
        for field_name, field_def in self.schema.items():
            decorators = self.get_class_validator_decorator(
                field_name, field_def)
            for decorator in decorators:
                decorator_name = decorator.replace("@", "").split("(")[0]
                all_decorators.add(decorator_name)

        needs_type_import = False
        if "Type" in str(all_decorators):
            needs_type_import = True
            all_decorators.discard("Type")

        # Generate create DTO properties
        create_properties = []

        # Add schema fields to create DTO
        for field_name, field_def in self.schema.items():
            field_type = self.get_typescript_type(field_def)
            description = field_def.get(
                "description", f"The {field_name} of the {self.module_name}"
            )
            example = field_def.get("example", f"Example {field_name}")
            required = field_def.get("required", False)
            optional_marker = "" if required else "?"

            decorators = self.get_class_validator_decorator(
                field_name, field_def)
            decorators_str = "\n  ".join(decorators)

            create_properties.append(
                f"""  @ApiProperty({{
    description: '{description}',
    example: '{example}',
    required: {str(required).lower()},
  }})
  {decorators_str}
  {field_name}{optional_marker}: {field_type};"""
            )

        # Add isActive to create DTO
        create_properties.append(
            f"""  @ApiProperty({{
    description: 'Whether the {self.module_name} is active',
    example: true,
    required: false,
  }})
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;"""
        )

        # Generate formatted create properties with proper newlines
        create_properties_str = "\n\n".join(create_properties)

        # Build import statements
        class_validator_imports = ", ".join(sorted(all_decorators))
        type_import = (
            "import { Type } from 'class-transformer';" if needs_type_import else ""
        )

        return f"""import {{ ApiProperty }} from '@nestjs/swagger';
import {{ {class_validator_imports} }} from 'class-validator';
{type_import}

export class Create{self.module_name_pascal}Dto {{
{create_properties_str}
}}
"""

    def get_update_dto_template(self) -> str:
        # Simple update DTO that extends create DTO and adds only the id field
        return f"""import {{ ApiProperty }} from '@nestjs/swagger';
import {{ IsUUID }} from 'class-validator';
import {{ Create{self.module_name_pascal}Dto }} from './create{self.module_name_pascal}.dto';

export class Update{self.module_name_pascal}Dto extends Create{self.module_name_pascal}Dto {{
  @ApiProperty({{
    description: 'The unique identifier of the {self.module_name}',
    example: '123e4567-e89b-12d3-a456-426614174000',
    required: true,
  }})
  @IsUUID()
  id: string;
}}
"""

    def get_dto_template(self) -> str:
        """Legacy method - use separate DTO templates instead"""
        return ""


def main():
    """Main function to handle command line arguments and generate module"""
    if len(sys.argv) < 2 or len(sys.argv) > 3:
        print("Usage: python script.py <module_name> [schema_file.json]")
        print("Examples:")
        print("  python script.py teacher")
        print("  python script.py student schema/student.json")
        print("  python script.py course schema/course.json")
        print("")
        print("Schema file format:")
        print("{")
        print(
            '  "name": { "type": "string", "required": true, "description": "The name" },'
        )
        print(
            '  "email": { "type": "string", "required": true, "format": "email" },')
        print(
            '  "age": { "type": "number", "required": false, "description": "Age" }')
        print("}")
        sys.exit(1)

    module_name = sys.argv[1]
    schema_file = sys.argv[2] if len(sys.argv) == 3 else None

    # Validate module name
    if not module_name.replace("_", "").replace(" ", "").isalnum():
        print(
            "Error: Module name should only contain letters, numbers, underscores, and spaces"
        )
        sys.exit(1)

    try:
        generator = ModuleGenerator(module_name, schema_file)
        generator.generate()
    except Exception as e:
        print(f"Error generating module: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
