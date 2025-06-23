import { Invoice } from 'src/invoice/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TInvoiceRepository extends BaseRepository<Invoice> {
}
