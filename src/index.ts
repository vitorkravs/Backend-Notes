import express, { Request, Response } from "express";
import routes from "./routes";

import { config } from "dotenv";
config();

import "./config/DbConfig";

const app = express();
const PORT = 3333;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Permitir solicitações
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
