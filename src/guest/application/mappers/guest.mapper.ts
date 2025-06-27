import { Guest } from 'src/guest/domain/entities/guest.entity';
import {
  CreateGuestDto,
  UpdateGuestDto,
  GuestResponseDto,
} from 'src/guest/presentation/http/dto';
import { CreateGuestCommand, UpdateGuestCommand } from '../ports/incoming';
import {
  PaginatedResponseDto,
  PaginatedResult,
  PaginationMapper,
} from '@shared/shared-kernel';

export class GuestMapper {
  static createDtoToCommand(dto: CreateGuestDto): CreateGuestCommand {
    return new CreateGuestCommand(
      dto.first_name,
      dto.last_name,
      dto.email,
      dto.phone,
      dto.address,
      dto.country,
      dto.country_num,
      dto.city,
      dto.postcode,
      dto.gender,
      dto.id_document_type,
      dto.id_number,
      dto.id_issue_date,
      dto.id_expiry_date,
      dto.nationality,
      dto.date_of_birth,
      dto.marketing_opt_in,
      dto.registered_by_user_id,
      dto.is_organization, // Moved to correct position for the command constructor
      dto.address2,
      dto.state,
      dto.organization_name,
      dto.isActive,
    );
  }

  static updateDtoToCommand(dto: UpdateGuestDto): UpdateGuestCommand {
    return new UpdateGuestCommand(
      dto.id,
      dto.first_name,
      dto.last_name,
      dto.email,
      dto.phone,
      dto.address,
      dto.country,
      dto.country_num,
      dto.city,
      dto.postcode,
      dto.gender,
      dto.id_document_type,
      dto.id_number,
      dto.id_issue_date,
      dto.id_expiry_date,
      dto.nationality,
      dto.date_of_birth,
      dto.marketing_opt_in,
      dto.registered_by_user_id,
      dto.is_organization, 
      dto.address2,
      dto.state,
      dto.organization_name,
      dto.isActive,
    );
  }

  static createCommandToDomain(command: CreateGuestCommand): Guest {
    return new Guest(
      command.first_name,
      command.last_name,
      command.email,
      command.phone,
      command.address,
      command.country,
      command.country_num,
      command.city,
      command.postcode,
      command.gender,
      command.id_document_type,
      command.id_number,
      command.id_issue_date,
      command.id_expiry_date,
      command.nationality,
      command.date_of_birth,
      command.marketing_opt_in,
      command.registered_by_user_id,
      command.is_organization, // Ensure this is before optional params
      command.address2,
      command.state,
      command.organization_name,

      null, // id (pass null or undefined if not available for creation)
      command.isActive,
      null, // createdAt
      null, // updatedAt
      null, // createdBy
      null, // updatedBy
    );
  }

  static updateCommandToDomain(
    command: UpdateGuestCommand,
    guest: Guest,
  ): Guest {
    guest.update(
      command.first_name,
      command.last_name,
      command.email,
      command.phone,
      command.address,
      command.country,
      command.country_num,
      command.city,
      command.postcode,
      command.gender,
      command.id_document_type,
      command.id_number,
      command.id_issue_date,
      command.id_expiry_date,
      command.nationality,
      command.date_of_birth,
      command.marketing_opt_in,
      command.registered_by_user_id,
      command.is_organization,
      command.address2,
      command.state,
      command.organization_name,
      command.isActive,
    );
    return guest;
  }

  static toResponseDto(guest: Guest): GuestResponseDto {
    return {
      id: guest.id,
      first_name: guest.first_name,
      last_name: guest.last_name,
      email: guest.email,
      phone: guest.phone,
      address: guest.address,
      country: guest.country,
      country_num: guest.country_num,
      city: guest.city,
      postcode: guest.postcode,
      gender: guest.gender,
      id_document_type: guest.id_document_type,
      id_number: guest.id_number,
      id_issue_date: guest.id_issue_date,
      id_expiry_date: guest.id_expiry_date,
      nationality: guest.nationality,
      date_of_birth: guest.date_of_birth,
      marketing_opt_in: guest.marketing_opt_in,
      registered_by_user_id: guest.registered_by_user_id,
      address2: guest.address2,
      state: guest.state,
      is_organization: guest.is_organization,
      organization_name: guest.organization_name,
      isActive: guest.isActive,
      createdAt: guest.createdAt,
      updatedAt: guest.updatedAt,
      createdBy: guest.createdBy,
      updatedBy: guest.updatedBy,
    };
  }

  static toPaginatedResponseDto(
    paginatedData: PaginatedResult<Guest>,
  ): PaginatedResponseDto<GuestResponseDto> {
    return PaginationMapper.toPaginatedResponseDto(paginatedData, (item) =>
      this.toResponseDto(item),
    );
  }
}
