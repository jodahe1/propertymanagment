import { RoomType } from 'src/roomType/domain/entities/roomType.entity';
import { CreateRoomTypeDto, UpdateRoomTypeDto, RoomTypeResponseDto } from 'src/roomType/presentation/http/dto';
import { CreateRoomTypeCommand, UpdateRoomTypeCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RoomTypeMapper {
    static createDtoToCommand(dto: CreateRoomTypeDto): CreateRoomTypeCommand {
        return new CreateRoomTypeCommand(
            dto.hotel_id,
            dto.name,
            dto.description,
            dto.max_guests,
            dto.max_adults,
            dto.max_children,
            dto.bed_type,
            dto.amenities,
            dto.base_price,
            dto.size_sqm,
            dto.quantity,
            dto.extra_bed_capacity,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRoomTypeDto): UpdateRoomTypeCommand {
        return new UpdateRoomTypeCommand(
            dto.id,
            dto.hotel_id,
            dto.name,
            dto.description,
            dto.max_guests,
            dto.max_adults,
            dto.max_children,
            dto.bed_type,
            dto.amenities,
            dto.base_price,
            dto.size_sqm,
            dto.quantity,
            dto.extra_bed_capacity,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRoomTypeCommand): RoomType {
        return new RoomType(
            command.hotel_id,
            command.name,
            command.description,
            command.max_guests,
            command.max_adults,
            command.max_children,
            command.bed_type,
            command.amenities,
            command.base_price,
            command.size_sqm,
            command.quantity,
            command.extra_bed_capacity,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRoomTypeCommand, roomType: RoomType): RoomType {
        roomType.update(
            command.hotel_id,
            command.name,
            command.description,
            command.max_guests,
            command.max_adults,
            command.max_children,
            command.bed_type,
            command.amenities,
            command.base_price,
            command.size_sqm,
            command.quantity,
            command.extra_bed_capacity,
            command.isActive,
        );
        return roomType;
    }

    static toResponseDto(roomType: RoomType): RoomTypeResponseDto {
        return {
            id: roomType.id,
            hotel_id: roomType.hotel_id,
            name: roomType.name,
            description: roomType.description,
            max_guests: roomType.max_guests,
            max_adults: roomType.max_adults,
            max_children: roomType.max_children,
            bed_type: roomType.bed_type,
            amenities: roomType.amenities,
            base_price: roomType.base_price,
            size_sqm: roomType.size_sqm,
            quantity: roomType.quantity,
            extra_bed_capacity: roomType.extra_bed_capacity,
            isActive: roomType.isActive,
            createdAt: roomType.createdAt,
            updatedAt: roomType.updatedAt,
            createdBy: roomType.createdBy,
            updatedBy: roomType.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<RoomType>): PaginatedResponseDto<RoomTypeResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
