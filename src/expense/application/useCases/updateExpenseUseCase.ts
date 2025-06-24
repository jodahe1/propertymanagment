import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateExpenseCommand } from "../ports/incoming";
import { TExpenseRepository } from "../ports/outgoing/expense.repository";
import { ExpenseResponseDto } from "src/expense/presentation/http/dto";
import { ExpenseMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateExpenseCommand)
export class UpdateExpenseUseCase implements ICommandHandler<UpdateExpenseCommand> {
    constructor(
        private readonly expenseRepository: TExpenseRepository,
    ) { }
    
    async execute(command: UpdateExpenseCommand): Promise<ExpenseResponseDto> {
        const expense = await this.expenseRepository.findById(command.id);
        if (!expense) {
            throw new NotFoundException(`Expense with id ${command.id} not found`);
        }
          const updatedExpense = await this.expenseRepository.update(command.id, ExpenseMapper.updateCommandToDomain(command, expense));
        return ExpenseMapper.toResponseDto(updatedExpense);
    }
}
