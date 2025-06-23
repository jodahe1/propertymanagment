import { Room } from 'src/room/domain/entities/room.entity';
import { CreateRoomDto, UpdateRoomDto, RoomResponseDto } from 'src/room/presentation/http/dto';
import { CreateRoomCommand, UpdateRoomCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RoomMapper {
    static createDtoToCommand(dto: CreateRoomDto): CreateRoomCommand {
        return new CreateRoomCommand(
            dto.roomTypeId,
            dto.roomNumber,
            dto.floor,
            dto.status,
            dto.lastCleanedAt,
            dto.notes,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRoomDto): UpdateRoomCommand {
        return new UpdateRoomCommand(
            dto.id,
            dto.roomTypeId,
            dto.roomNumber,
            dto.floor,
            dto.status,
            dto.lastCleanedAt,
            dto.notes,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRoomCommand): Room {
        return new Room(
            command.roomTypeId,
            command.roomNumber,
            command.floor,
            command.status,
            command.lastCleanedAt,
            command.notes,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRoomCommand, room: Room): Room {
        room.update(
            command.roomTypeId,
            command.roomNumber,
            command.floor,
            command.status,
            command.lastCleanedAt,
            command.notes,
            command.isActive,
        );
        return room;
    }

    static toResponseDto(room: Room): RoomResponseDto {
        return {
            id: room.id,
            roomTypeId: room.roomTypeId,
            roomNumber: room.roomNumber,
            floor: room.floor,
            status: room.status,
            lastCleanedAt: room.lastCleanedAt,
            notes: room.notes,
            isActive: room.isActive,
            createdAt: room.createdAt,
            updatedAt: room.updatedAt,
            createdBy: room.createdBy,
            updatedBy: room.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Room>): PaginatedResponseDto<RoomResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
