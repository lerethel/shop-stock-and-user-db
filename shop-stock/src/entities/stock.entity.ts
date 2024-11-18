import { Entity, ManyToOne, Opt, Property } from "@mikro-orm/postgresql";
import { BaseEntity } from "./base.entity.js";
import { Product } from "./product.entity.js";

@Entity()
export class Stock extends BaseEntity {
  // MikroORM adds an "_id" suffix to foreign keys.
  @ManyToOne(() => Product)
  product!: Product;

  // MikroORM converts camel case to snake case.
  @Property()
  itemsAvailable!: number;

  @Property()
  itemsOrdered!: number;

  // Since the shop entity isn't described in the assignment, simply store a number.
  @Property()
  shop!: number;

  @Property()
  date: Date & Opt = new Date();
}
