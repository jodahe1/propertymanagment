import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateStaffCommand } from "../ports/incoming";
import { TStaffRepository } from "../ports/outgoing/staff.repository";
import { StaffResponseDto } from "src/staff/presentation/http/dto";
import { StaffMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateStaffCommand)
export class UpdateStaffUseCase implements ICommandHandler<UpdateStaffCommand> {
    constructor(
        private readonly staffRepository: TStaffRepository,
    ) { }
    
    async execute(command: UpdateStaffCommand): Promise<StaffResponseDto> {
        const staff = await this.staffRepository.findById(command.id);
        if (!staff) {
            throw new NotFoundException(`Staff with id ${command.id} not found`);
        }
          const updatedStaff = await this.staffRepository.update(command.id, StaffMapper.updateCommandToDomain(command, staff));
        return StaffMapper.toResponseDto(updatedStaff);
    }
}
