import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateExpenseCommand } from "../ports/incoming";
import { TExpenseRepository } from "../ports/outgoing/expense.repository";
import { ExpenseResponseDto } from "src/expense/presentation/http/dto";
import { ExpenseMapper } from "../mappers";

@CommandHandler(CreateExpenseCommand)
export class CreateExpenseUseCase implements ICommandHandler<CreateExpenseCommand> {
  constructor(
    private readonly expenseRepository: TExpenseRepository,
  ) { }

  async execute(command: CreateExpenseCommand): Promise<ExpenseResponseDto> {
    const createdExpense = await this.expenseRepository.create(ExpenseMapper.createCommandToDomain(command));
    return ExpenseMapper.toResponseDto(createdExpense);
  }
}
