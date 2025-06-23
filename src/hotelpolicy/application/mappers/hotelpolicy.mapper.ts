import { Hotelpolicy } from 'src/hotelpolicy/domain/entities/hotelpolicy.entity';
import { CreateHotelpolicyDto, UpdateHotelpolicyDto, HotelpolicyResponseDto } from 'src/hotelpolicy/presentation/http/dto';
import { CreateHotelpolicyCommand, UpdateHotelpolicyCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class HotelpolicyMapper {
    static createDtoToCommand(dto: CreateHotelpolicyDto): CreateHotelpolicyCommand {
        return new CreateHotelpolicyCommand(
            dto.hotelId,
            dto.policyType,
            dto.description,
            dto.effectiveDate,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateHotelpolicyDto): UpdateHotelpolicyCommand {
        return new UpdateHotelpolicyCommand(
            dto.id,
            dto.hotelId,
            dto.policyType,
            dto.description,
            dto.effectiveDate,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateHotelpolicyCommand): Hotelpolicy {
        return new Hotelpolicy(
            command.hotelId,
            command.policyType,
            command.description,
            command.effectiveDate,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateHotelpolicyCommand, hotelpolicy: Hotelpolicy): Hotelpolicy {
        hotelpolicy.update(
            command.hotelId,
            command.policyType,
            command.description,
            command.effectiveDate,
            command.isActive,
        );
        return hotelpolicy;
    }

    static toResponseDto(hotelpolicy: Hotelpolicy): HotelpolicyResponseDto {
        return {
            id: hotelpolicy.id,
            hotelId: hotelpolicy.hotelId,
            policyType: hotelpolicy.policyType,
            description: hotelpolicy.description,
            effectiveDate: hotelpolicy.effectiveDate,
            isActive: hotelpolicy.isActive,
            createdAt: hotelpolicy.createdAt,
            updatedAt: hotelpolicy.updatedAt,
            createdBy: hotelpolicy.createdBy,
            updatedBy: hotelpolicy.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Hotelpolicy>): PaginatedResponseDto<HotelpolicyResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
