import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateInvoiceCommand } from "../ports/incoming";
import { TInvoiceRepository } from "../ports/outgoing/invoice.repository";
import { InvoiceResponseDto } from "src/invoice/presentation/http/dto";
import { InvoiceMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateInvoiceCommand)
export class UpdateInvoiceUseCase implements ICommandHandler<UpdateInvoiceCommand> {
    constructor(
        private readonly invoiceRepository: TInvoiceRepository,
    ) { }
    
    async execute(command: UpdateInvoiceCommand): Promise<InvoiceResponseDto> {
        const invoice = await this.invoiceRepository.findById(command.id);
        if (!invoice) {
            throw new NotFoundException(`Invoice with id ${command.id} not found`);
        }
          const updatedInvoice = await this.invoiceRepository.update(command.id, InvoiceMapper.updateCommandToDomain(command, invoice));
        return InvoiceMapper.toResponseDto(updatedInvoice);
    }
}
