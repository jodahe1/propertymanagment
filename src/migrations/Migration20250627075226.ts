import { Migration } from '@mikro-orm/migrations';

export class Migration20250627075226 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "Guest" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "phone" varchar(255) not null, "address" varchar(255) not null, "country" varchar(255) not null, "country_num" int not null, "city" varchar(255) not null, "postcode" varchar(255) not null, "gender" varchar(255) not null, "id_document_type" varchar(255) not null, "id_number" varchar(255) not null, "id_issue_date" timestamptz not null, "id_expiry_date" timestamptz not null, "nationality" int not null, "date_of_birth" timestamptz not null, "marketing_opt_in" boolean not null, "registered_by_user_id" uuid not null, "address2" varchar(255) null, "state" varchar(255) null, "is_organization" boolean not null, "organization_name" varchar(255) null, constraint "Guest_pkey" primary key ("id"));`);
    this.addSql(`create index "Guest_is_active_index" on "Guest" ("is_active");`);

    this.addSql(`alter table "Guest" add constraint "Guest_registered_by_user_id_foreign" foreign key ("registered_by_user_id") references "User" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "Guest" cascade;`);
  }

}
