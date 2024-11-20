import db from "../db.js";

export const consumerHandlers = {
  async createProduct(entity, action) {
    const newId = await storeProduct(entity);
    await createReport({ product_id: newId, action });
  },

  async createStock(entity, action) {
    const newId = await storeStock(entity);
    await createReport({ stock_id: newId, action });
  },

  async changeStock(entity, action) {
    await this.createStock(entity, action);
  },

  async getProducts(entities, action) {
    entities.forEach(async ({ id: originalId }) => {
      const newId = await getNewId("product", originalId);
      await createReport({ product_id: newId, action });
    });
  },

  async getStocks(entities, action) {
    entities.forEach(async ({ id: originalId }) => {
      const newId = await getNewId("stock", originalId);
      await createReport({ stock_id: newId, action });
    });
  },
};

const getNewId = async (table, originalId) =>
  (await db(table).select("id").where("original_id", "=", originalId))[0].id;

const insertAndGetNewId = async (table, data) =>
  (await db(table).insert(data, "id"))[0].id;

const createReport = async ({ product_id, stock_id, action }) =>
  await db("report").insert({ product_id, stock_id, action });

const storeProduct = async ({ id: original_id, plu, name }) =>
  await insertAndGetNewId("product", { original_id, plu, name });

const storeStock = async ({
  id: original_id,
  product: product_id,
  itemsAvailable: items_available,
  itemsOrdered: items_ordered,
  shop: shop_id,
  date,
}) =>
  await insertAndGetNewId("stock", {
    original_id,
    product_id,
    items_available,
    items_ordered,
    shop_id,
    date,
  });
