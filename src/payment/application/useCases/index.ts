import { Provider } from "@nestjs/common";
import { CreatePaymentUseCase } from "./createPaymentUseCase";
import { GetAllPaymentsUseCase } from "./getAllPaymentsUseCase";
import { GetPaymentByIdUseCase } from "./getPaymentByIdUseCase";
import { DeletePaymentUseCase } from "./deletePaymentUseCase";
import { UpdatePaymentUseCase } from "./updatePaymentUseCase";

export const PaymentUseCases: Provider[] = [CreatePaymentUseCase, GetAllPaymentsUseCase, GetPaymentByIdUseCase, DeletePaymentUseCase, UpdatePaymentUseCase];
