import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteInvoiceCommand } from "../ports/incoming";
import { TInvoiceRepository } from "../ports/outgoing/invoice.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteInvoiceCommand)
export class DeleteInvoiceUseCase implements ICommandHandler<DeleteInvoiceCommand> {
    constructor(
        private readonly invoiceRepository: TInvoiceRepository,
    ) { }

    async execute(command: DeleteInvoiceCommand): Promise<string> {
        const invoice = await this.invoiceRepository.findById(command.id);
        if (!invoice) {
            throw new NotFoundException(`Invoice with id ${command.id} not found`);
        }

        const flag = await this.invoiceRepository.delete(command.id);
        if (flag)
            return `Invoice with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Invoice with id ${command.id} could not be deleted`);
    }
}
