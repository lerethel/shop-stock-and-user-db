import { Migration } from '@mikro-orm/migrations';

export class Migration20241115223941 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "age" int not null, "sex" text check ("sex" in ('Male', 'Female')) not null, "problems" boolean not null);`,
    );
    this.addSql(`create index "user_problems_index" on "user" ("problems");`);
  }
}
