import { RequestHandler } from "express";
import { Action } from "../broker/action.enum.js";
import { reportAction } from "../broker/report-action.js";
import { ChangeStockDto, CreateStockDto } from "../dto/stock.dto.js";
import { Stock } from "../entities/stock.entity.js";
import { applyValidator } from "../middleware/validator.middleware.js";
import orm from "../mikro-orm.js";
import { StockFilter, StockQuery } from "../types/stock.types.js";

export const createStock: [RequestHandler, RequestHandler] = [
  applyValidator(CreateStockDto),
  async (req, res) => {
    const stock = orm.em.create(Stock, req.body);
    await orm.em.flush();

    res.json(stock);
    reportAction({ data: stock, action: Action.CreateStock });
  },
];

export const getStocks: RequestHandler = async (req, res) => {
  const { plu, shop_id: shop, from, to } = req.query as StockQuery;
  const filter: StockFilter = {};

  if (plu) {
    filter.product = { plu: +plu };
  }

  if (shop) {
    filter.shop = +shop;
  }

  if (from && to) {
    filter.date = { $gte: new Date(from), $lte: new Date(to) };
  }

  const foundStock = await orm.em.find(Stock, filter);

  res.json(foundStock);
  reportAction({ data: foundStock, action: Action.GetStocks });
};

export const changeStock: [RequestHandler, RequestHandler] = [
  applyValidator(ChangeStockDto),
  async (req, res) => {
    const { increase, decrease } = req.body;

    // Do nothing if the values equal 0.
    if (!increase && !decrease) {
      res.sendStatus(200);
      return;
    }

    const foundStock = await orm.em.findOneOrFail(Stock, +req.params.id);

    foundStock.itemsAvailable += increase || -decrease;
    await orm.em.flush();

    res.sendStatus(200);
    reportAction({ data: foundStock, action: Action.ChangeStock });
  },
];
