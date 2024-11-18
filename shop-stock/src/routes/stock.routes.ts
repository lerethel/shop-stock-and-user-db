import express from "express";
import {
  changeStock,
  createStock,
  getStocks,
} from "../controllers/stock.controller.js";

const router = express.Router();

router.route("/stock").post(createStock).get(getStocks);
router.patch("/stock/:id", changeStock);

export default router;
