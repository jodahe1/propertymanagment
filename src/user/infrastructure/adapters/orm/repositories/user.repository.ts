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
        if (updates.fullName) entity.fullName = updates.fullName;
        if (updates.email) entity.email = updates.email;
        if (updates.phoneNumber !== undefined) entity.phoneNumber = updates.phoneNumber;
        if (updates.password) entity.password = updates.password;
        if (updates.role) entity.role = updates.role;
        if (updates.isVerified !== undefined) entity.isVerified = updates.isVerified;
        if (updates.profilePicture !== undefined) entity.profilePicture = updates.profilePicture;
        if (updates.lastLoginAt !== undefined) entity.lastLoginAt = updates.lastLoginAt;
    }
}
