import { Payment } from 'src/payment/domain/entities/payment.entity';
import { CreatePaymentDto, UpdatePaymentDto, PaymentResponseDto } from 'src/payment/presentation/http/dto';
import { CreatePaymentCommand, UpdatePaymentCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class PaymentMapper {
    static createDtoToCommand(dto: CreatePaymentDto): CreatePaymentCommand {
        return new CreatePaymentCommand(
            dto.bookingId,
            dto.amount,
            dto.currency,
            dto.paymentMethod,
            dto.status,
            dto.transactionReference,
            dto.paidAt,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdatePaymentDto): UpdatePaymentCommand {
        return new UpdatePaymentCommand(
            dto.id,
            dto.bookingId,
            dto.amount,
            dto.currency,
            dto.paymentMethod,
            dto.status,
            dto.transactionReference,
            dto.paidAt,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreatePaymentCommand): Payment {
        return new Payment(
            command.bookingId,
            command.amount,
            command.currency,
            command.paymentMethod,
            command.status,
            command.transactionReference,
            command.paidAt,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdatePaymentCommand, payment: Payment): Payment {
        payment.update(
            command.bookingId,
            command.amount,
            command.currency,
            command.paymentMethod,
            command.status,
            command.transactionReference,
            command.paidAt,
            command.isActive,
        );
        return payment;
    }

    static toResponseDto(payment: Payment): PaymentResponseDto {
        return {
            id: payment.id,
            bookingId: payment.bookingId,
            amount: payment.amount,
            currency: payment.currency,
            paymentMethod: payment.paymentMethod,
            status: payment.status,
            transactionReference: payment.transactionReference,
            paidAt: payment.paidAt,
            isActive: payment.isActive,
            createdAt: payment.createdAt,
            updatedAt: payment.updatedAt,
            createdBy: payment.createdBy,
            updatedBy: payment.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Payment>): PaginatedResponseDto<PaymentResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
