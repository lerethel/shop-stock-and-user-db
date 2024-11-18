import { Migrator } from "@mikro-orm/migrations";
import { defineConfig } from "@mikro-orm/postgresql";
import { TsMorphMetadataProvider } from "@mikro-orm/reflection";
import { BaseEntity } from "./entities/base.entity.js";
import { Product } from "./entities/product.entity.js";
import { Stock } from "./entities/stock.entity.js";
import { AppException } from "./exceptions/app.exception.js";

export default defineConfig({
  dbName: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: "postgresdb",
  metadataProvider: TsMorphMetadataProvider,
  entities: [BaseEntity, Product, Stock],
  debug: true,
  findOneOrFailHandler(entityName) {
    throw new AppException(404, `${entityName} does not exist`);
  },
  extensions: [Migrator],
});
