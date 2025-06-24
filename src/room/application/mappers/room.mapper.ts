import { Room } from 'src/room/domain/entities/room.entity';
import { CreateRoomDto, UpdateRoomDto, RoomResponseDto } from 'src/room/presentation/http/dto';
import { CreateRoomCommand, UpdateRoomCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RoomMapper {
    static createDtoToCommand(dto: CreateRoomDto): CreateRoomCommand {
        return new CreateRoomCommand(
            dto.hotel_id,
            dto.room_type_id,
            dto.room_number,
            dto.floor_number,
            dto.availability_status,
            dto.current_price,
            dto.notes,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRoomDto): UpdateRoomCommand {
        return new UpdateRoomCommand(
            dto.id,
            dto.hotel_id,
            dto.room_type_id,
            dto.room_number,
            dto.floor_number,
            dto.availability_status,
            dto.current_price,
            dto.notes,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRoomCommand): Room {
        return new Room(
            command.hotel_id,
            command.room_type_id,
            command.room_number,
            command.floor_number,
            command.availability_status,
            command.current_price,
            command.notes,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRoomCommand, room: Room): Room {
        room.update(
            command.hotel_id,
            command.room_type_id,
            command.room_number,
            command.floor_number,
            command.availability_status,
            command.current_price,
            command.notes,
            command.isActive,
        );
        return room;
    }

    static toResponseDto(room: Room): RoomResponseDto {
        return {
            id: room.id,
            hotel_id: room.hotel_id,
            room_type_id: room.room_type_id,
            room_number: room.room_number,
            floor_number: room.floor_number,
            availability_status: room.availability_status,
            current_price: room.current_price,
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
