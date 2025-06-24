import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeleteExpenseCommand } from "../ports/incoming";
import { TExpenseRepository } from "../ports/outgoing/expense.repository";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@CommandHandler(DeleteExpenseCommand)
export class DeleteExpenseUseCase implements ICommandHandler<DeleteExpenseCommand> {
    constructor(
        private readonly expenseRepository: TExpenseRepository,
    ) { }

    async execute(command: DeleteExpenseCommand): Promise<string> {
        const expense = await this.expenseRepository.findById(command.id);
        if (!expense) {
            throw new NotFoundException(`Expense with id ${command.id} not found`);
        }

        const flag = await this.expenseRepository.delete(command.id);
        if (flag)
            return `Expense with id ${command.id} deleted successfully`;
        else
            throw new InternalServerErrorException(`Expense with id ${command.id} could not be deleted`);
    }
}
