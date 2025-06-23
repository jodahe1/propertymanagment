import { Roomtype } from 'src/roomtype/domain/entities/roomtype.entity';
import { CreateRoomtypeDto, UpdateRoomtypeDto, RoomtypeResponseDto } from 'src/roomtype/presentation/http/dto';
import { CreateRoomtypeCommand, UpdateRoomtypeCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class RoomtypeMapper {
    static createDtoToCommand(dto: CreateRoomtypeDto): CreateRoomtypeCommand {
        return new CreateRoomtypeCommand(
            dto.hotelId,
            dto.name,
            dto.description,
            dto.maxGuests,
            dto.bedType,
            dto.amenities,
            dto.basePrice,
            dto.sizeSqft,
            dto.images,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateRoomtypeDto): UpdateRoomtypeCommand {
        return new UpdateRoomtypeCommand(
            dto.id,
            dto.hotelId,
            dto.name,
            dto.description,
            dto.maxGuests,
            dto.bedType,
            dto.amenities,
            dto.basePrice,
            dto.sizeSqft,
            dto.images,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateRoomtypeCommand): Roomtype {
        return new Roomtype(
            command.hotelId,
            command.name,
            command.description,
            command.maxGuests,
            command.bedType,
            command.amenities,
            command.basePrice,
            command.sizeSqft,
            command.images,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateRoomtypeCommand, roomtype: Roomtype): Roomtype {
        roomtype.update(
            command.hotelId,
            command.name,
            command.description,
            command.maxGuests,
            command.bedType,
            command.amenities,
            command.basePrice,
            command.sizeSqft,
            command.images,
            command.isActive,
        );
        return roomtype;
    }

    static toResponseDto(roomtype: Roomtype): RoomtypeResponseDto {
        return {
            id: roomtype.id,
            hotelId: roomtype.hotelId,
            name: roomtype.name,
            description: roomtype.description,
            maxGuests: roomtype.maxGuests,
            bedType: roomtype.bedType,
            amenities: roomtype.amenities,
            basePrice: roomtype.basePrice,
            sizeSqft: roomtype.sizeSqft,
            images: roomtype.images,
            isActive: roomtype.isActive,
            createdAt: roomtype.createdAt,
            updatedAt: roomtype.updatedAt,
            createdBy: roomtype.createdBy,
            updatedBy: roomtype.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Roomtype>): PaginatedResponseDto<RoomtypeResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
