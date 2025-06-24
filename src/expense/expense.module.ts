import { CqrsModule } from '@nestjs/cqrs';
import { ExpenseUseCases } from './application/useCases';
import { ExpenseController } from './presentation/http/expense.controller';
import { Module } from '@nestjs/common';
import { ExpenseInfrastructureModule } from './infrastructure/expense-infrastructure.module';

@Module({
    imports: [
        CqrsModule,
        ExpenseInfrastructureModule.register({
            storage_driver: 'orm', // 'orm' | 'in-memory'
        }),
    ],
    controllers: [ExpenseController],
    providers: [...ExpenseUseCases],
})
export class ExpenseModule {}
