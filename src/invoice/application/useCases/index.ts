import { Provider } from "@nestjs/common";
import { CreateInvoiceUseCase } from "./createInvoiceUseCase";
import { GetAllInvoicesUseCase } from "./getAllInvoicesUseCase";
import { GetInvoiceByIdUseCase } from "./getInvoiceByIdUseCase";
import { DeleteInvoiceUseCase } from "./deleteInvoiceUseCase";
import { UpdateInvoiceUseCase } from "./updateInvoiceUseCase";

export const InvoiceUseCases: Provider[] = [CreateInvoiceUseCase, GetAllInvoicesUseCase, GetInvoiceByIdUseCase, DeleteInvoiceUseCase, UpdateInvoiceUseCase];
