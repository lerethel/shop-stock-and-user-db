import db from "../db.js";

export const consumerHandlers = {
  async createProduct(entity, action) {
    await storeProduct(entity);
    await createReport({ product_id: entity.id, action });
  },

  async createStock(entity, action) {
    await storeStock(entity);
    await createReport({ stock_id: entity.id, action });
  },

  async changeStock(entity, action) {
    const copy = { ...entity };
    // Assign a new id to the modified entity to avoid conflicts.
    copy.id = (await db("stock").max("id").first()).max + 1;
    await this.createStock(copy, action);
  },

  async getProducts(entities, action) {
    entities.forEach(
      async ({ id }) => await createReport({ product_id: id, action })
    );
  },

  async getStocks(entities, action) {
    entities.forEach(
      async ({ id }) => await createReport({ stock_id: id, action })
    );
  },
};

const createReport = async ({ product_id, stock_id, action }) =>
  await db("report").insert({ product_id, stock_id, action });

const storeProduct = async ({ id, plu, name }) =>
  await db("product").insert({ id, plu, name });

const storeStock = async ({
  id,
  product: product_id,
  itemsAvailable: items_available,
  itemsOrdered: items_ordered,
  shop: shop_id,
  date,
}) => {
  await db("stock").insert({
    id,
    product_id,
    items_available,
    items_ordered,
    shop_id,
    date,
  });
};
