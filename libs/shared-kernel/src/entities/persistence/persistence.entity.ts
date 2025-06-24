import { Index, PrimaryKey, Property } from "@mikro-orm/core";

export class PersistenceEntity {
    @PrimaryKey({ type: 'uuid' })
    id: string;

    @Index()
    @Property()
    isActive: boolean = true;

    @Property({ nullable: true })
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({ nullable: true })
    createdBy?: string;

    @Property({ nullable: true })
    updatedBy?: string;
}