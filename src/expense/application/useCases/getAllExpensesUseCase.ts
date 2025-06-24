import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { TExpenseRepository } from "../ports/outgoing/expense.repository";
import { GetAllExpensesQuery } from "../ports/incoming";
import { ExpenseMapper } from "../mappers";
import { ExpenseResponseDto } from "src/expense/presentation/http/dto";
import { PaginatedResponseDto } from "@shared/shared-kernel";

@QueryHandler(GetAllExpensesQuery)
export class GetAllExpensesUseCase implements IQueryHandler<GetAllExpensesQuery> {
    constructor(
        private readonly repository: TExpenseRepository,
    ) { }

    async execute(query: GetAllExpensesQuery): Promise<PaginatedResponseDto<ExpenseResponseDto>> {
        const expenses = await this.repository.findPaginated(query.queryOptions);
        return ExpenseMapper.toPaginatedResponseDto(expenses);
    }
}
