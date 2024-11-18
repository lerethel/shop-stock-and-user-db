import { Migration } from '@mikro-orm/migrations';

export class Migration20241118103505 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "product" ("id" serial primary key, "plu" int not null, "name" varchar(255) not null);`);

    this.addSql(`create table "stock" ("id" serial primary key, "product_id" int not null, "items_available" int not null, "items_ordered" int not null, "shop" int not null, "date" timestamptz not null);`);

    this.addSql(`alter table "stock" add constraint "stock_product_id_foreign" foreign key ("product_id") references "product" ("id") on update cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "stock" drop constraint "stock_product_id_foreign";`);

    this.addSql(`drop table if exists "product" cascade;`);

    this.addSql(`drop table if exists "stock" cascade;`);
  }

}
