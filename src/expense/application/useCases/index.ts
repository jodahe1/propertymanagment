import { Provider } from "@nestjs/common";
import { CreateExpenseUseCase } from "./createExpenseUseCase";
import { GetAllExpensesUseCase } from "./getAllExpensesUseCase";
import { GetExpenseByIdUseCase } from "./getExpenseByIdUseCase";
import { DeleteExpenseUseCase } from "./deleteExpenseUseCase";
import { UpdateExpenseUseCase } from "./updateExpenseUseCase";

export const ExpenseUseCases: Provider[] = [CreateExpenseUseCase, GetAllExpensesUseCase, GetExpenseByIdUseCase, DeleteExpenseUseCase, UpdateExpenseUseCase];
