import db from "./db.js";

export const getReports = async (req, res) => {
  const qb = db("report")
    .select(db.raw("row_to_json(product.*) as product"))
    .select(db.raw("row_to_json(stock.*) as stock"))

    .select("report.date")
    .select("report.action")

    .leftJoin("product", "product.id", "report.product_id")
    .leftJoin("stock", "stock.id", "report.stock_id");

  const { page, limit, shop_id, plu, from, to, action } = req.query;

  if (shop_id) {
    qb.where("stock.shop_id", "=", +shop_id);
  }

  if (plu) {
    qb.where("product.plu", "=", +plu);
  }

  if (from && to) {
    qb.whereBetween("report.date", [new Date(from), new Date(to)]);
  }

  if (action) {
    qb.whereILike("report.action", action);
  }

  // Run the query.
  // Don't paginate the results just yet to count the total number of pages.
  const unslicedReports = await qb.orderBy("report.date");

  const pageAsNumber = +page || 1;
  const limitAsNumber = +limit || 50;

  const totalPages = Math.ceil(unslicedReports.length / limitAsNumber);

  const startIndex = (pageAsNumber - 1) * limitAsNumber;
  const endIndex = startIndex + limitAsNumber;

  // Get the requested part of the result list.
  const reports = unslicedReports.slice(startIndex, endIndex);
  const reportsOnPage = reports.length;

  res.json({ data: reports, totalPages, reportsOnPage });
};
