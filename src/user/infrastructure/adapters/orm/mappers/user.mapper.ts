import { User } from 'src/user/domain/entities';
import { UserPersistenceEntity } from '../persistence-entities/user.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class UserPersistenceMapper {
    static toDomain(entity: UserPersistenceEntity): User {
        return new User(
            entity.fullName,
            entity.email,
            entity.phoneNumber,
            entity.password,
            entity.role,
            entity.isVerified,
            entity.profilePicture,
            entity.lastLoginAt,
            entity.id,
        );
    }

    static toEntity(domain: User, em: EntityManager): UserPersistenceEntity {
        const entity = new UserPersistenceEntity();
        entity.id = domain.id;
        entity.fullName = domain.fullName;
        entity.email = domain.email;
        entity.phoneNumber = domain.phoneNumber;
        entity.password = domain.password;
        entity.role = domain.role;
        entity.isVerified = domain.isVerified;
        entity.profilePicture = domain.profilePicture;
        entity.lastLoginAt = domain.lastLoginAt;
        return entity;
    }
}
