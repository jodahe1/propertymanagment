import { User } from 'src/user/domain/entities';
import { UserPersistenceEntity } from '../persistence-entities/user.persistence.entity';
import { EntityManager } from '@mikro-orm/core';
import { UserRole } from 'src/user/domain/valueObjects';

export class UserPersistenceMapper {
    static toDomain(entity: UserPersistenceEntity): User {
        return new User(
            entity.full_name,
            entity.email,
            entity.password,
            entity.role as UserRole,
            entity.phone_number,
            entity.is_verified,
            entity.profile_picture,
            entity.last_login_at,
            entity.permissions,
            entity.isActive,
            [],
            entity.id,
        );
    }

    static toEntity(domain: User, em: EntityManager): UserPersistenceEntity {
        const entity = new UserPersistenceEntity();
        entity.id = domain.id;
        entity.full_name = domain.full_name;
        entity.email = domain.email;
        entity.phone_number = domain.phone_number;
        entity.password = domain.password;
        entity.role = domain.role;
        entity.is_verified = domain.is_verified;
        entity.profile_picture = domain.profile_picture;
        entity.last_login_at = domain.last_login_at;
        entity.permissions = domain.permissions;
        entity.isActive = domain.isActive;
        return entity;
    }
}
