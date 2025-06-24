import { Expense } from 'src/expense/domain/entities';
import { ExpensePersistenceEntity } from '../persistence-entities/expense.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class ExpensePersistenceMapper {
    static toDomain(entity: ExpensePersistenceEntity): Expense {
        return new Expense(
            entity.hotelId,
            entity.category,
            entity.amount,
            entity.currency,
            entity.description,
            entity.expenseDate,
            entity.receiptUrl,
            entity.id,
        );
    }

    static toEntity(domain: Expense, em: EntityManager): ExpensePersistenceEntity {
        const entity = new ExpensePersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.category = domain.category;
        entity.amount = domain.amount;
        entity.currency = domain.currency;
        entity.description = domain.description;
        entity.expenseDate = domain.expenseDate;
        entity.receiptUrl = domain.receiptUrl;
        return entity;
    }
}
