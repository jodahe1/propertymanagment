import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TInvoiceRepository } from "../ports/outgoing/invoice.repository";
import { GetAllInvoicesQuery } from "../ports/incoming";
import { InvoiceMapper } from "../mappers";
import { InvoiceResponseDto } from "src/invoice/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllInvoicesQuery)
export class GetAllInvoicesUseCase implements IQueryHandler<GetAllInvoicesQuery> {
    constructor(
        private readonly repository: TInvoiceRepository,
    ) { }

    async execute(query: GetAllInvoicesQuery): Promise<PaginatedResponseDto<InvoiceResponseDto>> {
        const invoices = await this.repository.findPaginated(query.queryOptions);
        return InvoiceMapper.toPaginatedResponseDto(invoices);
    }
}
