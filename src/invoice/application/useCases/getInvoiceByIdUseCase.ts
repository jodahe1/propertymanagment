import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetInvoiceByIdQuery } from "../ports/incoming";
import { TInvoiceRepository } from "../ports/outgoing/invoice.repository";
import { InvoiceResponseDto } from "src/invoice/presentation/http/dto";
import { InvoiceMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetInvoiceByIdQuery)
export class GetInvoiceByIdUseCase implements IQueryHandler<GetInvoiceByIdQuery> {
    constructor(
        private readonly repository: TInvoiceRepository,
    ) { }

    async execute(query: GetInvoiceByIdQuery): Promise<InvoiceResponseDto | null> {
        const invoice = await this.repository.findById(query.id);
        if (!invoice) {
            throw new NotFoundException(`Invoice with id ${query.id} not found`);
        }
        return InvoiceMapper.toResponseDto(invoice);
    }
}
