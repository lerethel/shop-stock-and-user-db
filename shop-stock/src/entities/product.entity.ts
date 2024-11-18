import { Entity, Property } from "@mikro-orm/postgresql";
import { BaseEntity } from "./base.entity.js";

@Entity()
export class Product extends BaseEntity {
  @Property()
  plu!: number;

  @Property()
  name!: string;
}
