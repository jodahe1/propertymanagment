import { Staff } from 'src/staff/domain/entities/staff.entity';
import { CreateStaffDto, UpdateStaffDto, StaffResponseDto } from 'src/staff/presentation/http/dto';
import { CreateStaffCommand, UpdateStaffCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class StaffMapper {
    static createDtoToCommand(dto: CreateStaffDto): CreateStaffCommand {
        return new CreateStaffCommand(
            dto.hotelId,
            dto.userId,
            dto.position,
            dto.employmentStatus,
            dto.hireDate,
            dto.salary,
            dto.contactNumber,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateStaffDto): UpdateStaffCommand {
        return new UpdateStaffCommand(
            dto.id,
            dto.hotelId,
            dto.userId,
            dto.position,
            dto.employmentStatus,
            dto.hireDate,
            dto.salary,
            dto.contactNumber,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateStaffCommand): Staff {
        return new Staff(
            command.hotelId,
            command.userId,
            command.position,
            command.employmentStatus,
            command.hireDate,
            command.salary,
            command.contactNumber,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateStaffCommand, staff: Staff): Staff {
        staff.update(
            command.hotelId,
            command.userId,
            command.position,
            command.employmentStatus,
            command.hireDate,
            command.salary,
            command.contactNumber,
            command.isActive,
        );
        return staff;
    }

    static toResponseDto(staff: Staff): StaffResponseDto {
        return {
            id: staff.id,
            hotelId: staff.hotelId,
            userId: staff.userId,
            position: staff.position,
            employmentStatus: staff.employmentStatus,
            hireDate: staff.hireDate,
            salary: staff.salary,
            contactNumber: staff.contactNumber,
            isActive: staff.isActive,
            createdAt: staff.createdAt,
            updatedAt: staff.updatedAt,
            createdBy: staff.createdBy,
            updatedBy: staff.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Staff>): PaginatedResponseDto<StaffResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
