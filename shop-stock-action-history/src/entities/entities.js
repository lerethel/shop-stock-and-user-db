import db from "../db.js";

if (!(await db.schema.hasTable("product"))) {
  await db.schema.createTable("product", (table) => {
    table.increments("id").primary();
    table.integer("plu").notNullable();
    table.string("name").notNullable();
  });

  console.log("Table 'product' has been created");
}

if (!(await db.schema.hasTable("stock"))) {
  await db.schema.createTable("stock", (table) => {
    table.increments("id").primary();
    table.integer("product_id").references("product.id").notNullable();
    table.integer("items_available").notNullable();
    table.integer("items_ordered").notNullable();
    table.integer("shop_id").notNullable();
    table.timestamp("date").notNullable();
  });

  console.log("Table 'stock' has been created");
}

if (!(await db.schema.hasTable("report"))) {
  await db.schema.createTable("report", (table) => {
    table.increments("id").primary();
    table.integer("product_id").references("product.id");
    table.integer("stock_id").references("stock.id");
    table.timestamp("date").defaultTo(db.fn.now()).notNullable();
    table.string("action").notNullable();
  });

  console.log("Table 'report' has been created");
}
