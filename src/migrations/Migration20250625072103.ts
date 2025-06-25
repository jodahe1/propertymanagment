import { Migration } from '@mikro-orm/migrations';

export class Migration20250625072103 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "Room" ("id" uuid not null default gen_random_uuid(), "is_active" boolean not null default true, "created_at" timestamptz null, "updated_at" timestamptz not null, "created_by" varchar(255) null, "updated_by" varchar(255) null, "hotel_id" uuid not null, "room_type_id" uuid not null, "room_number" varchar(255) not null, "floor_number" int null, "availability_status" varchar(255) not null, "current_price" int not null, "notes" text null, constraint "Room_pkey" primary key ("id"));`);
    this.addSql(`create index "Room_is_active_index" on "Room" ("is_active");`);

    this.addSql(`alter table "Room" add constraint "Room_hotel_id_foreign" foreign key ("hotel_id") references "Hotel" ("id") on update cascade;`);
    this.addSql(`alter table "Room" add constraint "Room_room_type_id_foreign" foreign key ("room_type_id") references "RoomType" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "Room" cascade;`);
  }

}
