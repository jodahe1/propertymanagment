import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TStaffRepository } from "src/staff/application/ports/outgoing/staff.repository";
import { Staff } from "src/staff/domain/entities";
import { StaffPersistenceMapper } from "../mappers/staff.mapper";
import { StaffPersistenceEntity } from "../persistence-entities/staff.persistence.entity";

@Injectable()
export class StaffRepository extends MikroOrmBaseRepository<Staff> implements TStaffRepository {
    constructor(
        @InjectRepository(StaffPersistenceEntity)
        private readonly repo: EntityRepository<StaffPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: StaffPersistenceEntity): Staff {
        return StaffPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Staff): StaffPersistenceEntity {
        return StaffPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: StaffPersistenceEntity, updates: Staff): void {
        if (updates.hotelId) entity.hotelId = updates.hotelId;
        if (updates.userId) entity.userId = updates.userId;
        if (updates.position) entity.position = updates.position;
        if (updates.employmentStatus) entity.employmentStatus = updates.employmentStatus;
        if (updates.hireDate) entity.hireDate = updates.hireDate;
        if (updates.salary !== undefined) entity.salary = updates.salary;
        if (updates.contactNumber !== undefined) entity.contactNumber = updates.contactNumber;
    }
}
