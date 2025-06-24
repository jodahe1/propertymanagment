import { Housekeeping } from 'src/housekeeping/domain/entities/housekeeping.entity';
import { CreateHousekeepingDto, UpdateHousekeepingDto, HousekeepingResponseDto } from 'src/housekeeping/presentation/http/dto';
import { CreateHousekeepingCommand, UpdateHousekeepingCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class HousekeepingMapper {
    static createDtoToCommand(dto: CreateHousekeepingDto): CreateHousekeepingCommand {
        return new CreateHousekeepingCommand(
            dto.roomId,
            dto.staffId,
            dto.status,
            dto.notes,
            dto.completedAt,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateHousekeepingDto): UpdateHousekeepingCommand {
        return new UpdateHousekeepingCommand(
            dto.id,
            dto.roomId,
            dto.staffId,
            dto.status,
            dto.notes,
            dto.completedAt,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateHousekeepingCommand): Housekeeping {
        return new Housekeeping(
            command.roomId,
            command.staffId,
            command.status,
            command.notes,
            command.completedAt,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateHousekeepingCommand, housekeeping: Housekeeping): Housekeeping {
        housekeeping.update(
            command.roomId,
            command.staffId,
            command.status,
            command.notes,
            command.completedAt,
            command.isActive,
        );
        return housekeeping;
    }

    static toResponseDto(housekeeping: Housekeeping): HousekeepingResponseDto {
        return {
            id: housekeeping.id,
            roomId: housekeeping.roomId,
            staffId: housekeeping.staffId,
            status: housekeeping.status,
            notes: housekeeping.notes,
            completedAt: housekeeping.completedAt,
            isActive: housekeeping.isActive,
            createdAt: housekeeping.createdAt,
            updatedAt: housekeeping.updatedAt,
            createdBy: housekeeping.createdBy,
            updatedBy: housekeeping.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Housekeeping>): PaginatedResponseDto<HousekeepingResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
