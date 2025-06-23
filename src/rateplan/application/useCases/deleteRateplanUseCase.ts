import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteRateplanCommand } from "../ports/incoming";
import { TRateplanRepository } from "../ports/outgoing/rateplan.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteRateplanCommand)
export class DeleteRateplanUseCase implements ICommandHandler<DeleteRateplanCommand> {
    constructor(
        private readonly rateplanRepository: TRateplanRepository,
    ) { }

    async execute(command: DeleteRateplanCommand): Promise<string> {
        const rateplan = await this.rateplanRepository.findById(command.id);
        if (!rateplan) {
            throw new NotFoundException(`Rateplan with id ${command.id} not found`);
        }

        const flag = await this.rateplanRepository.delete(command.id);
        if (flag)
            return `Rateplan with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Rateplan with id ${command.id} could not be deleted`);
    }
}
