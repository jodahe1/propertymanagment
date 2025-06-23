import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { PaymentPersistenceEntity } from './persistence-entities/payment.persistence.entity';
import { TPaymentRepository } from 'src/payment/application/ports/outgoing/payment.repository';
import { PaymentRepository } from './repositories/payment.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([PaymentPersistenceEntity]),
  ],
  providers: [
    {
      provide: TPaymentRepository,
      useClass: PaymentRepository,
    },
  ],
  exports: [TPaymentRepository],
})
export class MikroOrmPersistenceModule {}
