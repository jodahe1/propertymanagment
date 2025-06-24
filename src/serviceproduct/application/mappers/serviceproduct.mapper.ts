import { Serviceproduct } from 'src/serviceproduct/domain/entities/serviceproduct.entity';
import { CreateServiceproductDto, UpdateServiceproductDto, ServiceproductResponseDto } from 'src/serviceproduct/presentation/http/dto';
import { CreateServiceproductCommand, UpdateServiceproductCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class ServiceproductMapper {
    static createDtoToCommand(dto: CreateServiceproductDto): CreateServiceproductCommand {
        return new CreateServiceproductCommand(
            dto.hotelId,
            dto.name,
            dto.description,
            dto.price,
            dto.currency,
            dto.status,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateServiceproductDto): UpdateServiceproductCommand {
        return new UpdateServiceproductCommand(
            dto.id,
            dto.hotelId,
            dto.name,
            dto.description,
            dto.price,
            dto.currency,
            dto.status,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateServiceproductCommand): Serviceproduct {
        return new Serviceproduct(
            command.hotelId,
            command.name,
            command.description,
            command.price,
            command.currency,
            command.status,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateServiceproductCommand, serviceproduct: Serviceproduct): Serviceproduct {
        serviceproduct.update(
            command.hotelId,
            command.name,
            command.description,
            command.price,
            command.currency,
            command.status,
            command.isActive,
        );
        return serviceproduct;
    }

    static toResponseDto(serviceproduct: Serviceproduct): ServiceproductResponseDto {
        return {
            id: serviceproduct.id,
            hotelId: serviceproduct.hotelId,
            name: serviceproduct.name,
            description: serviceproduct.description,
            price: serviceproduct.price,
            currency: serviceproduct.currency,
            status: serviceproduct.status,
            isActive: serviceproduct.isActive,
            createdAt: serviceproduct.createdAt,
            updatedAt: serviceproduct.updatedAt,
            createdBy: serviceproduct.createdBy,
            updatedBy: serviceproduct.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Serviceproduct>): PaginatedResponseDto<ServiceproductResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
