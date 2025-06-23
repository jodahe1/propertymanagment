import { User } from 'src/user/domain/entities';
import { BaseRepository } from "@shared/shared-kernel";

export abstract class TUserRepository extends BaseRepository<User> {
}
