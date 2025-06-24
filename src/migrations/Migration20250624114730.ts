import { Migration } from '@mikro-orm/migrations';

export class Migration20250624114730 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "User" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) null, "password" varchar(255) not null, "role" varchar(255) not null, "is_verified" boolean null, "profile_picture" varchar(255) null, "last_login_at" timestamptz null, "permissions" jsonb null, constraint "User_pkey" primary key ("id"));`);
    this.addSql(`create index "User_is_active_index" on "User" ("is_active");`);

    this.addSql(`create table "Hotel" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "user_id" uuid not null, "name" varchar(255) not null, "description" text null, "address" varchar(255) not null, "city" varchar(255) not null, "country" varchar(255) not null, "zip_code" varchar(255) null, "latitude" numeric(10,0) null, "longitude" numeric(10,0) null, "contact_email" varchar(255) null, "contact_phone" varchar(255) null, "star_rating" int null, "status" varchar(255) not null, "timezone" varchar(255) null, "images" jsonb null, "amenities" jsonb null, "check_in_instructions" text null, "legal_information" varchar(255) null, constraint "Hotel_pkey" primary key ("id"));`);
    this.addSql(`create index "Hotel_is_active_index" on "Hotel" ("is_active");`);

    this.addSql(`create table "RoomType" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "hotel_id" uuid not null, "name" varchar(255) not null, "description" text null, "max_guests" int not null, "max_adults" int not null, "max_children" int not null, "bed_type" varchar(255) not null, "amenities" jsonb null, "base_price" int not null, "size_sqm" numeric(10,0) null, "quantity" int not null, "extra_bed_capacity" int null, constraint "RoomType_pkey" primary key ("id"));`);
    this.addSql(`create index "RoomType_is_active_index" on "RoomType" ("is_active");`);

    this.addSql(`alter table "Hotel" add constraint "Hotel_user_id_foreign" foreign key ("user_id") references "User" ("id") on update cascade;`);

    this.addSql(`alter table "RoomType" add constraint "RoomType_hotel_id_foreign" foreign key ("hotel_id") references "Hotel" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "Hotel" drop constraint "Hotel_user_id_foreign";`);

    this.addSql(`alter table "RoomType" drop constraint "RoomType_hotel_id_foreign";`);

    this.addSql(`drop table if exists "User" cascade;`);

    this.addSql(`drop table if exists "Hotel" cascade;`);

    this.addSql(`drop table if exists "RoomType" cascade;`);
  }

}
