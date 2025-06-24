import { Expense } from 'src/expense/domain/entities/expense.entity';
import { CreateExpenseDto, UpdateExpenseDto, ExpenseResponseDto } from 'src/expense/presentation/http/dto';
import { CreateExpenseCommand, UpdateExpenseCommand } from '../ports/incoming';
import { PaginatedResponseDto, PaginatedResult, PaginationMapper } from '@shared/shared-kernel';

export class ExpenseMapper {
    static createDtoToCommand(dto: CreateExpenseDto): CreateExpenseCommand {
        return new CreateExpenseCommand(
            dto.hotelId,
            dto.category,
            dto.amount,
            dto.currency,
            dto.description,
            dto.expenseDate,
            dto.receiptUrl,
            dto.isActive,
        );
    }
    
    static updateDtoToCommand(dto: UpdateExpenseDto): UpdateExpenseCommand {
        return new UpdateExpenseCommand(
            dto.id,
            dto.hotelId,
            dto.category,
            dto.amount,
            dto.currency,
            dto.description,
            dto.expenseDate,
            dto.receiptUrl,
            dto.isActive,
        );
    }
    
    static createCommandToDomain(command: CreateExpenseCommand): Expense {
        return new Expense(
            command.hotelId,
            command.category,
            command.amount,
            command.currency,
            command.description,
            command.expenseDate,
            command.receiptUrl,
            null,
            command.isActive,
        );
    }    static updateCommandToDomain(command: UpdateExpenseCommand, expense: Expense): Expense {
        expense.update(
            command.hotelId,
            command.category,
            command.amount,
            command.currency,
            command.description,
            command.expenseDate,
            command.receiptUrl,
            command.isActive,
        );
        return expense;
    }

    static toResponseDto(expense: Expense): ExpenseResponseDto {
        return {
            id: expense.id,
            hotelId: expense.hotelId,
            category: expense.category,
            amount: expense.amount,
            currency: expense.currency,
            description: expense.description,
            expenseDate: expense.expenseDate,
            receiptUrl: expense.receiptUrl,
            isActive: expense.isActive,
            createdAt: expense.createdAt,
            updatedAt: expense.updatedAt,
            createdBy: expense.createdBy,
            updatedBy: expense.updatedBy,
        };
    }
    
    static toPaginatedResponseDto(paginatedData: PaginatedResult<Expense>): PaginatedResponseDto<ExpenseResponseDto> {
        return PaginationMapper.toPaginatedResponseDto(
            paginatedData,
            (item) => this.toResponseDto(item)
        );
    }
}
