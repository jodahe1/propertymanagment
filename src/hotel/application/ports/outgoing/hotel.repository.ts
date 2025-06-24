import { Hotel } from 'src/hotel/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class THotelRepository extends BaseRepository<Hotel> {
}
