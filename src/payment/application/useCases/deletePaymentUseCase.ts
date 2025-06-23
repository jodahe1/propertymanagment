import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeletePaymentCommand } from "../ports/incoming";
import { TPaymentRepository } from "../ports/outgoing/payment.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeletePaymentCommand)
export class DeletePaymentUseCase implements ICommandHandler<DeletePaymentCommand> {
    constructor(
        private readonly paymentRepository: TPaymentRepository,
    ) { }

    async execute(command: DeletePaymentCommand): Promise<string> {
        const payment = await this.paymentRepository.findById(command.id);
        if (!payment) {
            throw new NotFoundException(`Payment with id ${command.id} not found`);
        }

        const flag = await this.paymentRepository.delete(command.id);
        if (flag)
            return `Payment with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Payment with id ${command.id} could not be deleted`);
    }
}
