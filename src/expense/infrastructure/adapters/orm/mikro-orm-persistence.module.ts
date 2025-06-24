import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExpensePersistenceEntity } from './persistence-entities/expense.persistence.entity';
import { TExpenseRepository } from 'src/expense/application/ports/outgoing/expense.repository';
import { ExpenseRepository } from './repositories/expense.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([ExpensePersistenceEntity]),
  ],
  providers: [
    {
      provide: TExpenseRepository,
      useClass: ExpenseRepository,
    },
  ],
  exports: [TExpenseRepository],
})
export class MikroOrmPersistenceModule {}
