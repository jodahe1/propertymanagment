import { Expense } from 'src/expense/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TExpenseRepository extends BaseRepository<Expense> {
}
