import { validate } from "class-validator";
import { RequestHandler } from "express";
import { DtoConstructor } from "../types/common.types.js";

export const applyValidator =
  <T>(DtoClass: DtoConstructor<T>): RequestHandler =>
  async (req, res, next) => {
    const errors = await validate(new DtoClass(req.body));

    if (errors.length) {
      res.status(400).json(errors);
      return;
    }

    next();
  };
