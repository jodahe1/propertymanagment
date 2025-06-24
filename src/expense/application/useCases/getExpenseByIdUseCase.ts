import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetExpenseByIdQuery } from "../ports/incoming";
import { TExpenseRepository } from "../ports/outgoing/expense.repository";
import { ExpenseResponseDto } from "src/expense/presentation/http/dto";
import { ExpenseMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";
import { QueryOptions } from "@shared/shared-kernel";

@QueryHandler(GetExpenseByIdQuery)
export class GetExpenseByIdUseCase implements IQueryHandler<GetExpenseByIdQuery> {
    constructor(
        private readonly repository: TExpenseRepository,
    ) { }

    async execute(query: GetExpenseByIdQuery): Promise<ExpenseResponseDto | null> {
        const expense = await this.repository.findById(query.id);
        if (!expense) {
            throw new NotFoundException(`Expense with id ${query.id} not found`);
        }
        return ExpenseMapper.toResponseDto(expense);
    }
}
