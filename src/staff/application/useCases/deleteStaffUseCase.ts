import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteStaffCommand } from "../ports/incoming";
import { TStaffRepository } from "../ports/outgoing/staff.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteStaffCommand)
export class DeleteStaffUseCase implements ICommandHandler<DeleteStaffCommand> {
    constructor(
        private readonly staffRepository: TStaffRepository,
    ) { }

    async execute(command: DeleteStaffCommand): Promise<string> {
        const staff = await this.staffRepository.findById(command.id);
        if (!staff) {
            throw new NotFoundException(`Staff with id ${command.id} not found`);
        }

        const flag = await this.staffRepository.delete(command.id);
        if (flag)
            return `Staff with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Staff with id ${command.id} could not be deleted`);
    }
}
