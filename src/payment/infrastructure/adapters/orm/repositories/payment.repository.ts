import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TPaymentRepository } from "src/payment/application/ports/outgoing/payment.repository";
import { Payment } from "src/payment/domain/entities";
import { PaymentPersistenceMapper } from "../mappers/payment.mapper";
import { PaymentPersistenceEntity } from "../persistence-entities/payment.persistence.entity";

@Injectable()
export class PaymentRepository extends MikroOrmBaseRepository<Payment> implements TPaymentRepository {
    constructor(
        @InjectRepository(PaymentPersistenceEntity)
        private readonly repo: EntityRepository<PaymentPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: PaymentPersistenceEntity): Payment {
        return PaymentPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Payment): PaymentPersistenceEntity {
        return PaymentPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: PaymentPersistenceEntity, updates: Payment): void {
        if (updates.bookingId) entity.bookingId = updates.bookingId;
        if (updates.amount) entity.amount = updates.amount;
        if (updates.currency) entity.currency = updates.currency;
        if (updates.paymentMethod) entity.paymentMethod = updates.paymentMethod;
        if (updates.status) entity.status = updates.status;
        if (updates.transactionReference !== undefined) entity.transactionReference = updates.transactionReference;
        if (updates.paidAt) entity.paidAt = updates.paidAt;
    }
}
