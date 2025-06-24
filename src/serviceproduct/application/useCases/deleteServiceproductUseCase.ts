import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteServiceproductCommand } from "../ports/incoming";
import { TServiceproductRepository } from "../ports/outgoing/serviceproduct.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteServiceproductCommand)
export class DeleteServiceproductUseCase implements ICommandHandler<DeleteServiceproductCommand> {
    constructor(
        private readonly serviceproductRepository: TServiceproductRepository,
    ) { }

    async execute(command: DeleteServiceproductCommand): Promise<string> {
        const serviceproduct = await this.serviceproductRepository.findById(command.id);
        if (!serviceproduct) {
            throw new NotFoundException(`Serviceproduct with id ${command.id} not found`);
        }

        const flag = await this.serviceproductRepository.delete(command.id);
        if (flag)
            return `Serviceproduct with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Serviceproduct with id ${command.id} could not be deleted`);
    }
}
