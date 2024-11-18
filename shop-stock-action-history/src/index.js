import express from "express";
import { getReports } from "./controller.js";

// Initialize the broker and database.
import "./broker/consumer.js";
import "./entities/entities.js";

const app = express();

app.use(express.json());

app.get("/report", getReports);

app.use((req, res) => void res.sendStatus(404));

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.sendStatus(500);
});

app.listen(3500, () => console.log("Server is listening on port 3500"));
