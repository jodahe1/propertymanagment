import { Roomtypeavailabilities } from 'src/roomtypeavailabilities/domain/entities/roomtypeavailabilities.entity';
import { CreateRoomtypeavailabilitiesDto, UpdateRoomtypeavailabilitiesDto, RoomtypeavailabilitiesResponseDto } from 'src/roomtypeavailabilities/presentation/http/dto';
import { CreateRoomtypeavailabilitiesCommand, UpdateRoomtypeavailabilitiesCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RoomtypeavailabilitiesMapper {
    static createDtoToCommand(dto: CreateRoomtypeavailabilitiesDto): CreateRoomtypeavailabilitiesCommand {
        return new CreateRoomtypeavailabilitiesCommand(
            dto.roomTypeId,
            dto.date,
            dto.availableQuantity,
            dto.priceModifier,
            dto.minStayNights,
            dto.maxStayNights,
            dto.blockedReason,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRoomtypeavailabilitiesDto): UpdateRoomtypeavailabilitiesCommand {
        return new UpdateRoomtypeavailabilitiesCommand(
            dto.id,
            dto.roomTypeId,
            dto.date,
            dto.availableQuantity,
            dto.priceModifier,
            dto.minStayNights,
            dto.maxStayNights,
            dto.blockedReason,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRoomtypeavailabilitiesCommand): Roomtypeavailabilities {
        return new Roomtypeavailabilities(
            command.roomTypeId,
            command.date,
            command.availableQuantity,
            command.priceModifier,
            command.minStayNights,
            command.maxStayNights,
            command.blockedReason,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRoomtypeavailabilitiesCommand, roomtypeavailabilities: Roomtypeavailabilities): Roomtypeavailabilities {
        roomtypeavailabilities.update(
            command.roomTypeId,
            command.date,
            command.availableQuantity,
            command.priceModifier,
            command.minStayNights,
            command.maxStayNights,
            command.blockedReason,
            command.isActive,
        );
        return roomtypeavailabilities;
    }

    static toResponseDto(roomtypeavailabilities: Roomtypeavailabilities): RoomtypeavailabilitiesResponseDto {
        return {
            id: roomtypeavailabilities.id,
            roomTypeId: roomtypeavailabilities.roomTypeId,
            date: roomtypeavailabilities.date,
            availableQuantity: roomtypeavailabilities.availableQuantity,
            priceModifier: roomtypeavailabilities.priceModifier,
            minStayNights: roomtypeavailabilities.minStayNights,
            maxStayNights: roomtypeavailabilities.maxStayNights,
            blockedReason: roomtypeavailabilities.blockedReason,
            isActive: roomtypeavailabilities.isActive,
            createdAt: roomtypeavailabilities.createdAt,
            updatedAt: roomtypeavailabilities.updatedAt,
            createdBy: roomtypeavailabilities.createdBy,
            updatedBy: roomtypeavailabilities.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Roomtypeavailabilities>): PaginatedResponseDto<RoomtypeavailabilitiesResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
