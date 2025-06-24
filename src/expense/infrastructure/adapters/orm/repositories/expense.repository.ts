import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TExpenseRepository } from "src/expense/application/ports/outgoing/expense.repository";
import { Expense } from "src/expense/domain/entities";
import { ExpensePersistenceMapper } from "../mappers/expense.mapper";
import { ExpensePersistenceEntity } from "../persistence-entities/expense.persistence.entity";

@Injectable()
export class ExpenseRepository extends MikroOrmBaseRepository<Expense> implements TExpenseRepository {
    constructor(
        @InjectRepository(ExpensePersistenceEntity)
        private readonly repo: EntityRepository<ExpensePersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: ExpensePersistenceEntity): Expense {
        return ExpensePersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Expense): ExpensePersistenceEntity {
        return ExpensePersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: ExpensePersistenceEntity, updates: Expense): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.category) entity.category = updates.category;
        if (updates.amount) entity.amount = updates.amount;
        if (updates.currency) entity.currency = updates.currency;
        if (updates.description !== undefined) entity.description = updates.description;
        if (updates.expenseDate) entity.expenseDate = updates.expenseDate;
        if (updates.receiptUrl !== undefined) entity.receiptUrl = updates.receiptUrl;
    }
}
