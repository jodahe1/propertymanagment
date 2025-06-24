import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateStaffCommand } from "../ports/incoming";
import { TStaffRepository } from "../ports/outgoing/staff.repository";
import { StaffResponseDto } from "src/staff/presentation/http/dto";
import { StaffMapper } from "../mappers";

@CommandHandler(CreateStaffCommand)
export class CreateStaffUseCase implements ICommandHandler<CreateStaffCommand> {
  constructor(
    private readonly staffRepository: TStaffRepository,
  ) { }

  async execute(command: CreateStaffCommand): Promise<StaffResponseDto> {
    const createdStaff = await this.staffRepository.create(StaffMapper.createCommandToDomain(command));
    return StaffMapper.toResponseDto(createdStaff);
  }
}
