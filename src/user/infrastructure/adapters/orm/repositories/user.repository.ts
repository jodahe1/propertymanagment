import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TUserRepository } from "src/user/application/ports/outgoing/user.repository";
import { User } from "src/user/domain/entities";
import { UserPersistenceMapper } from "../mappers/user.mapper";
import { UserPersistenceEntity } from "../persistence-entities/user.persistence.entity";

@Injectable()
export class UserRepository extends MikroOrmBaseRepository<User> implements TUserRepository {
    constructor(
        @InjectRepository(UserPersistenceEntity)
        private readonly repo: EntityRepository<UserPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: UserPersistenceEntity): User {
        return UserPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: User): UserPersistenceEntity {
        return UserPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: UserPersistenceEntity, updates: User): void {
        if (updates.full_name) entity.full_name = updates.full_name;
        if (updates.email) entity.email = updates.email;
        if (updates.phone_number !== undefined) entity.phone_number = updates.phone_number;
        if (updates.password) entity.password = updates.password;
        if (updates.role) entity.role = updates.role;
        if (updates.is_verified !== undefined) entity.is_verified = updates.is_verified;
        if (updates.profile_picture !== undefined) entity.profile_picture = updates.profile_picture;
        if (updates.last_login_at !== undefined) entity.last_login_at = updates.last_login_at;
        if (updates.permissions !== undefined) entity.permissions = updates.permissions;
    }
}
