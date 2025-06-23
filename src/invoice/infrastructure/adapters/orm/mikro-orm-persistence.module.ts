import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { InvoicePersistenceEntity } from './persistence-entities/invoice.persistence.entity';
import { TInvoiceRepository } from 'src/invoice/application/ports/outgoing/invoice.repository';
import { InvoiceRepository } from './repositories/invoice.repository';


@Module({
  imports: [
    MikroOrmModule.forFeature([InvoicePersistenceEntity]),
  ],
  providers: [
    {
      provide: TInvoiceRepository,
      useClass: InvoiceRepository,
    },
  ],
  exports: [TInvoiceRepository],
})
export class MikroOrmPersistenceModule {}
