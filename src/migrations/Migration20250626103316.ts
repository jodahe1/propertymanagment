import { Migration } from '@mikro-orm/migrations';

export class Migration20250626103316 extends Migration {
  override async up(): Promise<void> {
    // REMOVED: this.addSql(`alter table "Room" drop constraint "Room_room_type_id_foreign";`); // This line caused the error

    this.addSql(
      `create table "room_types" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "hotel_id" uuid not null, "name" varchar(255) not null, "description" text null, "max_guests" int not null, "max_adults" int not null, "max_children" int not null, "bed_type" varchar(255) not null, "amenities" jsonb null, "base_price" int not null, "size_sqm" numeric(10,0) null, "quantity" int not null, "extra_bed_capacity" int null, constraint "room_types_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "room_types_is_active_index" on "room_types" ("is_active");`,
    );

    this.addSql(
      `create table "room_type_availabilities" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "roomTypeId" uuid not null, "date" date not null, "available_quantity" int not null, "price_modifier" int null, "min_stay_nights" int null, "max_stay_nights" int null, "blocked_reason" varchar(255) not null, constraint "room_type_availabilities_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "room_type_availabilities_is_active_index" on "room_type_availabilities" ("is_active");`,
    );

    this.addSql(
      `alter table "room_types" add constraint "room_types_hotel_id_foreign" foreign key ("hotel_id") references "Hotel" ("id") on update cascade;`,
    );

    this.addSql(
      `alter table "room_type_availabilities" add constraint "room_type_availabilities_roomTypeId_foreign" foreign key ("roomTypeId") references "room_types" ("id") on update cascade;`,
    );

    this.addSql(`drop table if exists "RoomType" cascade;`);

    // REMOVED: this.addSql(`alter table "Room" drop constraint "Room_room_type_id_foreign";`); // This line also caused the error

    // ADDED THIS LINE: Delete rows from "Room" that have room_type_id not present in "room_types"
    this.addSql(
      `DELETE FROM "Room" WHERE "room_type_id" IS NOT NULL AND "room_type_id" NOT IN (SELECT "id" FROM "room_types");`,
    );

    this.addSql(
      `alter table "Room" add constraint "Room_room_type_id_foreign" foreign key ("room_type_id") references "room_types" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "room_type_availabilities" drop constraint "room_type_availabilities_roomTypeId_foreign";`,
    );

    // REMOVED: this.addSql(`alter table "Room" drop constraint "Room_room_type_id_foreign";`); // This line caused the error

    this.addSql(
      `create table "RoomType" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "hotel_id" uuid not null, "name" varchar(255) not null, "description" text null, "max_guests" int not null, "max_adults" int not null, "max_children" int not null, "bed_type" varchar(255) not null, "amenities" jsonb null, "base_price" int not null, "size_sqm" numeric(10,0) null, "quantity" int not null, "extra_bed_capacity" int null, constraint "RoomType_pkey" primary key ("id"));`,
    );
    this.addSql(
      `create index "RoomType_is_active_index" on "RoomType" ("is_active");`,
    );

    this.addSql(
      `alter table "RoomType" add constraint "RoomType_hotel_id_foreign" foreign key ("hotel_id") references "Hotel" ("id") on update cascade;`,
    );

    this.addSql(`drop table if exists "room_types" cascade;`);

    this.addSql(`drop table if exists "room_type_availabilities" cascade;`);

    this.addSql(
      `alter table "Room" add constraint "Room_room_type_id_foreign" foreign key ("room_type_id") references "RoomType" ("id") on update cascade;`,
    );
  }
}
