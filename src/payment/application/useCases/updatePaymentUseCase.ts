import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePaymentCommand } from "../ports/incoming";
import { TPaymentRepository } from "../ports/outgoing/payment.repository";
import { PaymentResponseDto } from "src/payment/presentation/http/dto";
import { PaymentMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdatePaymentCommand)
export class UpdatePaymentUseCase implements ICommandHandler<UpdatePaymentCommand> {
    constructor(
        private readonly paymentRepository: TPaymentRepository,
    ) { }
    
    async execute(command: UpdatePaymentCommand): Promise<PaymentResponseDto> {
        const payment = await this.paymentRepository.findById(command.id);
        if (!payment) {
            throw new NotFoundException(`Payment with id ${command.id} not found`);
        }
          const updatedPayment = await this.paymentRepository.update(command.id, PaymentMapper.updateCommandToDomain(command, payment));
        return PaymentMapper.toResponseDto(updatedPayment);
    }
}
