import { RequestHandler } from "express";
import { Action } from "../broker/action.enum.js";
import { reportAction } from "../broker/report-action.js";
import { CreateProductDto } from "../dto/product.dto.js";
import { Product } from "../entities/product.entity.js";
import { applyValidator } from "../middleware/validator.middleware.js";
import orm from "../mikro-orm.js";
import { ProductFilter, ProductQuery } from "../types/product.types.js";

export const createProduct: [RequestHandler, RequestHandler] = [
  applyValidator(CreateProductDto),
  async (req, res) => {
    const product = orm.em.create(Product, req.body);
    await orm.em.flush();

    res.json(product);
    reportAction({ data: product, action: Action.CreateProduct });
  },
];

export const getProducts: RequestHandler = async (req, res) => {
  const { plu, name } = req.query as ProductQuery;
  const filter: ProductFilter = {};

  if (plu) {
    filter.plu = +plu;
  }

  if (name) {
    filter.name = name;
  }

  const foundProducts = await orm.em.find(Product, filter);

  res.json(foundProducts);
  reportAction({ data: foundProducts, action: Action.GetProducts });
};
