import { CqrsModule } from '@nestjs/cqrs';
import { InvoiceUseCases } from './application/useCases';
import { InvoiceController } from './presentation/http/invoice.controller';
import { Module } from '@nestjs/common';
import { InvoiceInfrastructureModule } from './infrastructure/invoice-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        InvoiceInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [InvoiceController],
    providers: [...InvoiceUseCases],
})
export class InvoiceModule {}
