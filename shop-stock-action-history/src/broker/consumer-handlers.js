import db from "../db.js";

export const consumerHandlers = {
  async createProduct(entity, action) {
    await db.transaction(async (trx) => {
      const newId = await storeProduct(trx, entity);
      await createReport(trx, { product_id: newId, action });
    });
  },

  async createStock(entity, action) {
    await db.transaction(async (trx) => {
      const newId = await storeStock(trx, entity);
      await createReport(trx, { stock_id: newId, action });
    });
  },

  async changeStock(entity, action) {
    await this.createStock(entity, action);
  },

  async getProducts(entities, action) {
    await db.transaction(async (trx) => {
      for (const { id: originalId } of entities) {
        const newId = await getNewId(trx, "product", originalId);
        await createReport(trx, { product_id: newId, action });
      }
    });
  },

  async getStocks(entities, action) {
    await db.transaction(async (trx) => {
      for (const { id: originalId } of entities) {
        const newId = await getNewId(trx, "stock", originalId);
        await createReport(trx, { stock_id: newId, action });
      }
    });
  },
};

const getNewId = async (context, table, originalId) =>
  (await context(table).select("id").where("original_id", "=", originalId))[0]
    .id;

const insertAndGetNewId = async (context, table, data) =>
  (await context(table).insert(data, "id"))[0].id;

const createReport = async (context, { product_id, stock_id, action }) =>
  await context("report").insert({ product_id, stock_id, action });

const storeProduct = async (context, { id: original_id, plu, name }) =>
  await insertAndGetNewId(context, "product", { original_id, plu, name });

const storeStock = async (
  context,
  {
    id: original_id,
    product: product_id,
    itemsAvailable: items_available,
    itemsOrdered: items_ordered,
    shop: shop_id,
    date,
  }
) =>
  await insertAndGetNewId(context, "stock", {
    original_id,
    product_id,
    items_available,
    items_ordered,
    shop_id,
    date,
  });
