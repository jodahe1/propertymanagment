import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteGuestCommand } from "../ports/incoming";
import { TGuestRepository } from "../ports/outgoing/guest.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteGuestCommand)
export class DeleteGuestUseCase implements ICommandHandler<DeleteGuestCommand> {
    constructor(
        private readonly guestRepository: TGuestRepository,
    ) { }

    async execute(command: DeleteGuestCommand): Promise<string> {
        const guest = await this.guestRepository.findById(command.id);
        if (!guest) {
            throw new NotFoundException(`Guest with id ${command.id} not found`);
        }

        const flag = await this.guestRepository.delete(command.id);
        if (flag)
            return `Guest with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Guest with id ${command.id} could not be deleted`);
    }
}
