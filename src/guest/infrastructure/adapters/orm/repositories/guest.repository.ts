import { EntityManager, EntityRepository } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { Injectable } from "@nestjs/common";
import { MikroOrmBaseRepository } from "@shared/shared-kernel";
import { TGuestRepository } from "src/guest/application/ports/outgoing/guest.repository";
import { Guest } from "src/guest/domain/entities";
import { GuestPersistenceMapper } from "../mappers/guest.mapper";
import { GuestPersistenceEntity } from "../persistence-entities/guest.persistence.entity";

@Injectable()
export class GuestRepository extends MikroOrmBaseRepository<Guest> implements TGuestRepository {
    constructor(
        @InjectRepository(GuestPersistenceEntity)
        private readonly repo: EntityRepository<GuestPersistenceEntity>,
        private readonly entityManager: EntityManager,
    ) {
        super(repo, entityManager);
    }

    protected toDomain(entity: GuestPersistenceEntity): Guest {
        return GuestPersistenceMapper.toDomain(entity);
    }
    protected toEntity(domain: Guest): GuestPersistenceEntity {
        return GuestPersistenceMapper.toEntity(domain, this.entityManager);
    }
    protected updateEntity(entity: GuestPersistenceEntity, updates: Guest): void {
        if (updates.first_name) entity.first_name = updates.first_name;
        if (updates.last_name) entity.last_name = updates.last_name;
        if (updates.email) entity.email = updates.email;
        if (updates.phone) entity.phone = updates.phone;
        if (updates.address) entity.address = updates.address;
        if (updates.country) entity.country = updates.country;
        if (updates.country_num) entity.country_num = updates.country_num;
        if (updates.city) entity.city = updates.city;
        if (updates.postcode) entity.postcode = updates.postcode;
        if (updates.gender) entity.gender = updates.gender;
        if (updates.id_document_type) entity.id_document_type = updates.id_document_type;
        if (updates.id_number) entity.id_number = updates.id_number;
        if (updates.id_issue_date) entity.id_issue_date = updates.id_issue_date;
        if (updates.id_expiry_date) entity.id_expiry_date = updates.id_expiry_date;
        if (updates.nationality) entity.nationality = updates.nationality;
        if (updates.date_of_birth) entity.date_of_birth = updates.date_of_birth;
        if (updates.marketing_opt_in) entity.marketing_opt_in = updates.marketing_opt_in;
        if (updates.registered_by_user_id) entity.registered_by_user_id = updates.registered_by_user_id;
        if (updates.address2 !== undefined) entity.address2 = updates.address2;
        if (updates.state !== undefined) entity.state = updates.state;
        if (updates.is_organization) entity.is_organization = updates.is_organization;
        if (updates.organization_name !== undefined) entity.organization_name = updates.organization_name;
    }
}
