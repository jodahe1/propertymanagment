import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreatePaymentCommand } from "../ports/incoming";
import { TPaymentRepository } from "../ports/outgoing/payment.repository";
import { PaymentResponseDto } from "src/payment/presentation/http/dto";
import { PaymentMapper } from "../mappers";

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentUseCase implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    private readonly paymentRepository: TPaymentRepository,
  ) { }

  async execute(command: CreatePaymentCommand): Promise<PaymentResponseDto> {
    const createdPayment = await this.paymentRepository.create(PaymentMapper.createCommandToDomain(command));
    return PaymentMapper.toResponseDto(createdPayment);
  }
}
