import { Hotel } from 'src/hotel/domain/entities/hotel.entity';
import { CreateHotelDto, UpdateHotelDto, HotelResponseDto } from 'src/hotel/presentation/http/dto';
import { CreateHotelCommand, UpdateHotelCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';
import { HotelStatus } from 'src/hotel/domain/valueObjects';

export class HotelMapper {
    static createDtoToCommand(dto: CreateHotelDto): CreateHotelCommand {
        return new CreateHotelCommand(
            dto.user_id,
            dto.name,
            dto.address,
            dto.city,
            dto.country,
            dto.status,
            dto.description,
            dto.zip_code,
            dto.latitude,
            dto.longitude,
            dto.contact_email,
            dto.contact_phone,
            dto.star_rating,
            dto.timezone,
            dto.images,
            dto.amenities,
            dto.check_in_instructions,
            dto.legal_information,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateHotelDto): UpdateHotelCommand {
        return new UpdateHotelCommand(
            dto.id,
            dto.user_id,
            dto.name,
            dto.address,
            dto.city,
            dto.country,
            dto.status,
            dto.description,
            dto.zip_code,
            dto.latitude,
            dto.longitude,
            dto.contact_email,
            dto.contact_phone,
            dto.star_rating,
            dto.timezone,
            dto.images,
            dto.amenities,
            dto.check_in_instructions,
            dto.legal_information,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateHotelCommand): Hotel {
        return new Hotel(
            command.user_id,
            command.name,
            command.address,
            command.city,
            command.country,
            command.status as HotelStatus,
            command.description,
            command.zip_code,
            command.latitude,
            command.longitude,
            command.contact_email,
            command.contact_phone,
            command.star_rating,
            command.timezone,
            command.images,
            command.amenities,
            command.check_in_instructions,
            command.legal_information,
            null,
            command.isActive,
        );
    }
    
    static updateCommandToDomain(command: UpdateHotelCommand, hotel: Hotel): Hotel {
        hotel.update(
            command.user_id,
            command.name,
            command.address,
            command.city,
            command.country,
            command.status as HotelStatus,
            command.description,
            command.zip_code,
            command.latitude,
            command.longitude,
            command.contact_email,
            command.contact_phone,
            command.star_rating,
            command.timezone,
            command.images,
            command.amenities,
            command.check_in_instructions,
            command.legal_information,
            command.isActive,
        );
        return hotel;
    }

    static toResponseDto(hotel: Hotel): HotelResponseDto {
        return {
            id: hotel.id,
            user_id: hotel.user_id,
            name: hotel.name,
            description: hotel.description,
            address: hotel.address,
            city: hotel.city,
            country: hotel.country,
            zip_code: hotel.zip_code,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            contact_email: hotel.contact_email,
            contact_phone: hotel.contact_phone,
            star_rating: hotel.star_rating,
            status: hotel.status,
            timezone: hotel.timezone,
            images: hotel.images,
            amenities: hotel.amenities,
            check_in_instructions: hotel.check_in_instructions,
            legal_information: hotel.legal_information,
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
