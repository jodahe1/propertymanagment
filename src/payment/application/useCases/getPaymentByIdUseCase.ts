import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetPaymentByIdQuery } from "../ports/incoming";
import { TPaymentRepository } from "../ports/outgoing/payment.repository";
import { PaymentResponseDto } from "src/payment/presentation/http/dto";
import { PaymentMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetPaymentByIdQuery)
export class GetPaymentByIdUseCase implements IQueryHandler<GetPaymentByIdQuery> {
    constructor(
        private readonly repository: TPaymentRepository,
    ) { }

    async execute(query: GetPaymentByIdQuery): Promise<PaymentResponseDto | null> {
        const payment = await this.repository.findById(query.id);
        if (!payment) {
            throw new NotFoundException(`Payment with id ${query.id} not found`);
        }
        return PaymentMapper.toResponseDto(payment);
    }
}
