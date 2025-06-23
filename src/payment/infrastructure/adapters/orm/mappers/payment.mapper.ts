import { Payment } from 'src/payment/domain/entities';
import { PaymentPersistenceEntity } from '../persistence-entities/payment.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class PaymentPersistenceMapper {
    static toDomain(entity: PaymentPersistenceEntity): Payment {
        return new Payment(
            entity.bookingId,
            entity.amount,
            entity.currency,
            entity.paymentMethod,
            entity.status,
            entity.transactionReference,
            entity.paidAt,
            entity.id,
        );
    }

    static toEntity(domain: Payment, em: EntityManager): PaymentPersistenceEntity {
        const entity = new PaymentPersistenceEntity();
        entity.id = domain.id;
        entity.bookingId = domain.bookingId;
        entity.amount = domain.amount;
        entity.currency = domain.currency;
        entity.paymentMethod = domain.paymentMethod;
        entity.status = domain.status;
        entity.transactionReference = domain.transactionReference;
        entity.paidAt = domain.paidAt;
        return entity;
    }
}
