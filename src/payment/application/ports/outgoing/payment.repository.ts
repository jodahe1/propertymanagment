import { Payment } from 'src/payment/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TPaymentRepository extends BaseRepository<Payment> {
}
