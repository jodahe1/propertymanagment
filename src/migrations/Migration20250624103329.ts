import { Migration } from '@mikro-orm/migrations';

export class Migration20250624103329 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "User" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "full_name" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) null, "password" varchar(255) not null, "role" varchar(255) not null, "is_verified" boolean null, "profile_picture" varchar(255) null, "last_login_at" timestamptz null, "permissions" jsonb null, constraint "User_pkey" primary key ("id"));`);
    this.addSql(`create index "User_is_active_index" on "User" ("is_active");`);

    this.addSql(`create table "Hotel" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "user_id" uuid not null, "name" varchar(255) not null, "description" text null, "address" varchar(255) not null, "city" varchar(255) not null, "country" varchar(255) not null, "zip_code" varchar(255) null, "latitude" numeric(10,0) null, "longitude" numeric(10,0) null, "contact_email" varchar(255) null, "contact_phone" varchar(255) null, "star_rating" int null, "status" varchar(255) not null, "timezone" varchar(255) null, "images" jsonb null, "amenities" jsonb null, "check_in_instructions" text null, "legal_information" varchar(255) null, constraint "Hotel_pkey" primary key ("id"));`);
    this.addSql(`create index "Hotel_is_active_index" on "Hotel" ("is_active");`);

    this.addSql(`alter table "Hotel" add constraint "Hotel_user_id_foreign" foreign key ("user_id") references "User" ("id") on update cascade;`);

    this.addSql(`drop table if exists "guests" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "Hotel" drop constraint "Hotel_user_id_foreign";`);

    this.addSql(`create table "guests" ("id" uuid not null default gen_random_uuid(), "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(50) not null, "address" varchar(500) not null, "address2" varchar(500) null, "country" varchar(100) not null, "country_num" int4 not null, "city" varchar(100) not null, "state" varchar(100) null, "postcode" varchar(20) not null, "gender" varchar(255) not null, "id_document_type" varchar(255) not null, "id_number" varchar(255) not null, "id_issue_date" date not null, "id_expiry_date" date not null, "nationality" int4 not null, "date_of_birth" date not null, "marketing_opt_in" bool not null default false, "created_at" timestamptz(6) not null default now(), "updated_at" timestamptz(6) null, "deleted_at" timestamptz(6) null, constraint "guests_pkey" primary key ("id"));`);
    this.addSql(`alter table "guests" add constraint "guests_email_unique" unique ("email");`);

    this.addSql(`drop table if exists "User" cascade;`);

    this.addSql(`drop table if exists "Hotel" cascade;`);
  }

}
