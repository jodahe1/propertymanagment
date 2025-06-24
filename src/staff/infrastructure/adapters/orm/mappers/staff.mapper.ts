import { Staff } from 'src/staff/domain/entities';
import { StaffPersistenceEntity } from '../persistence-entities/staff.persistence.entity';
import { EntityManager } from '@mikro-orm/core';

export class StaffPersistenceMapper {
    static toDomain(entity: StaffPersistenceEntity): Staff {
        return new Staff(
            entity.hotelId,
            entity.userId,
            entity.position,
            entity.employmentStatus,
            entity.hireDate,
            entity.salary,
            entity.contactNumber,
            entity.id,
        );
    }

    static toEntity(domain: Staff, em: EntityManager): StaffPersistenceEntity {
        const entity = new StaffPersistenceEntity();
        entity.id = domain.id;
        entity.hotelId = domain.hotelId;
        entity.userId = domain.userId;
        entity.position = domain.position;
        entity.employmentStatus = domain.employmentStatus;
        entity.hireDate = domain.hireDate;
        entity.salary = domain.salary;
        entity.contactNumber = domain.contactNumber;
        return entity;
    }
}
