import { CqrsModule } from '@nestjs/cqrs';
import { PaymentUseCases } from './application/useCases';
import { PaymentController } from './presentation/http/payment.controller';
import { Module } from '@nestjs/common';
import { PaymentInfrastructureModule } from './infrastructure/payment-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        PaymentInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [PaymentController],
    providers: [...PaymentUseCases],
})
export class PaymentModule {}
