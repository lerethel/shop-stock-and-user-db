import { RequestContext } from "@mikro-orm/postgresql";
import express, { ErrorRequestHandler } from "express";
import { AppException } from "./exceptions/app.exception.js";
import orm from "./mikro-orm.js";
import productRoutes from "./routes/product.routes.js";
import stockRoutes from "./routes/stock.routes.js";

const app = express();

app.use(express.json());
app.use((req, res, next) => RequestContext.create(orm.em, next));

app.use(productRoutes);
app.use(stockRoutes);

app.use((req, res) => void res.sendStatus(404));

app.use(<ErrorRequestHandler>((error: Error, req, res, next) => {
  if (error instanceof AppException) {
    res.status(error.status).send(error.message);
    return;
  }

  console.error(error.stack);
  res.sendStatus(500);
}));

app.listen(3000, () => console.log("Server is listening on port 3000"));
