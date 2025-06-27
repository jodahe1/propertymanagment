import { Guest } from 'src/guest/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TGuestRepository extends BaseRepository<Guest> {
}
