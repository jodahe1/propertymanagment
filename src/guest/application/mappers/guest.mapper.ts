import { Guest } from 'src/guest/domain/entities/guest.entity';
import { CreateGuestDto, UpdateGuestDto, GuestResponseDto } from 'src/guest/presentation/http/dto';
import { CreateGuestCommand, UpdateGuestCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class GuestMapper {
    static createDtoToCommand(dto: CreateGuestDto): CreateGuestCommand {
        return new CreateGuestCommand(
            dto.fullName,
            dto.email,
            dto.phoneNumber,
            dto.address,
            dto.city,
            dto.country,
            dto.zipCode,
            dto.dateOfBirth,
            dto.nationality,
            dto.idDocumentType,
            dto.idDocumentNumber,
            dto.notes,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateGuestDto): UpdateGuestCommand {
        return new UpdateGuestCommand(
            dto.id,
            dto.fullName,
            dto.email,
            dto.phoneNumber,
            dto.address,
            dto.city,
            dto.country,
            dto.zipCode,
            dto.dateOfBirth,
            dto.nationality,
            dto.idDocumentType,
            dto.idDocumentNumber,
            dto.notes,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateGuestCommand): Guest {
        return new Guest(
            command.fullName,
            command.email,
            command.phoneNumber,
            command.address,
            command.city,
            command.country,
            command.zipCode,
            command.dateOfBirth,
            command.nationality,
            command.idDocumentType,
            command.idDocumentNumber,
            command.notes,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateGuestCommand, guest: Guest): Guest {
        guest.update(
            command.fullName,
            command.email,
            command.phoneNumber,
            command.address,
            command.city,
            command.country,
            command.zipCode,
            command.dateOfBirth,
            command.nationality,
            command.idDocumentType,
            command.idDocumentNumber,
            command.notes,
            command.isActive,
        );
        return guest;
    }

    static toResponseDto(guest: Guest): GuestResponseDto {
        return {
            id: guest.id,
            fullName: guest.fullName,
            email: guest.email,
            phoneNumber: guest.phoneNumber,
            address: guest.address,
            city: guest.city,
            country: guest.country,
            zipCode: guest.zipCode,
            dateOfBirth: guest.dateOfBirth,
            nationality: guest.nationality,
            idDocumentType: guest.idDocumentType,
            idDocumentNumber: guest.idDocumentNumber,
            notes: guest.notes,
            isActive: guest.isActive,
            createdAt: guest.createdAt,
            updatedAt: guest.updatedAt,
            createdBy: guest.createdBy,
            updatedBy: guest.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Guest>): PaginatedResponseDto<GuestResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
