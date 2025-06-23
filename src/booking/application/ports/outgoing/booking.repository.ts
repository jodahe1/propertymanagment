import { Booking } from 'src/booking/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TBookingRepository extends BaseRepository<Booking> {
}
