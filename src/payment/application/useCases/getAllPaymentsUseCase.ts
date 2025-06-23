import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TPaymentRepository } from "../ports/outgoing/payment.repository";
import { GetAllPaymentsQuery } from "../ports/incoming";
import { PaymentMapper } from "../mappers";
import { PaymentResponseDto } from "src/payment/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllPaymentsQuery)
export class GetAllPaymentsUseCase implements IQueryHandler<GetAllPaymentsQuery> {
    constructor(
        private readonly repository: TPaymentRepository,
    ) { }

    async execute(query: GetAllPaymentsQuery): Promise<PaginatedResponseDto<PaymentResponseDto>> {
        const payments = await this.repository.findPaginated(query.queryOptions);
        return PaymentMapper.toPaginatedResponseDto(payments);
    }
}
