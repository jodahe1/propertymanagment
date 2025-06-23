import { Hotel } from 'src/hotel/domain/entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto, HotelResponseDto } from 'src/hotel/presentation/http/dto';
import { CreateHotelCommand, UpdateHotelCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class HotelMapper {
    static createDtoToCommand(dto: CreateHotelDto): CreateHotelCommand {
        return new CreateHotelCommand(
            dto.userId,
            dto.name,
            dto.description,
            dto.address,
            dto.city,
            dto.country,
            dto.zipCode,
            dto.latitude,
            dto.longitude,
            dto.contactEmail,
            dto.contactPhone,
            dto.starRating,
            dto.status,
            dto.timezone,
            dto.images,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateHotelDto): UpdateHotelCommand {
        return new UpdateHotelCommand(
            dto.id,
            dto.userId,
            dto.name,
            dto.description,
            dto.address,
            dto.city,
            dto.country,
            dto.zipCode,
            dto.latitude,
            dto.longitude,
            dto.contactEmail,
            dto.contactPhone,
            dto.starRating,
            dto.status,
            dto.timezone,
            dto.images,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateHotelCommand): Hotel {
        return new Hotel(
            command.userId,
            command.name,
            command.description,
            command.address,
            command.city,
            command.country,
            command.zipCode,
            command.latitude,
            command.longitude,
            command.contactEmail,
            command.contactPhone,
            command.starRating,
            command.status,
            command.timezone,
            command.images,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateHotelCommand, hotel: Hotel): Hotel {
        hotel.update(
            command.userId,
            command.name,
            command.description,
            command.address,
            command.city,
            command.country,
            command.zipCode,
            command.latitude,
            command.longitude,
            command.contactEmail,
            command.contactPhone,
            command.starRating,
            command.status,
            command.timezone,
            command.images,
            command.isActive,
        );
        return hotel;
    }

    static toResponseDto(hotel: Hotel): HotelResponseDto {
        return {
            id: hotel.id,
            userId: hotel.userId,
            name: hotel.name,
            description: hotel.description,
            address: hotel.address,
            city: hotel.city,
            country: hotel.country,
            zipCode: hotel.zipCode,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            contactEmail: hotel.contactEmail,
            contactPhone: hotel.contactPhone,
            starRating: hotel.starRating,
            status: hotel.status,
            timezone: hotel.timezone,
            images: hotel.images,
            isActive: hotel.isActive,
            createdAt: hotel.createdAt,
            updatedAt: hotel.updatedAt,
            createdBy: hotel.createdBy,
            updatedBy: hotel.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Hotel>): PaginatedResponseDto<HotelResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
