import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateInvoiceCommand } from "../ports/incoming";
import { TInvoiceRepository } from "../ports/outgoing/invoice.repository";
import { InvoiceResponseDto } from "src/invoice/presentation/http/dto";
import { InvoiceMapper } from "../mappers";

@CommandHandler(CreateInvoiceCommand)
export class CreateInvoiceUseCase implements ICommandHandler<CreateInvoiceCommand> {
  constructor(
    private readonly invoiceRepository: TInvoiceRepository,
  ) { }

  async execute(command: CreateInvoiceCommand): Promise<InvoiceResponseDto> {
    const createdInvoice = await this.invoiceRepository.create(InvoiceMapper.createCommandToDomain(command));
    return InvoiceMapper.toResponseDto(createdInvoice);
  }
}
