import express, { Request, Response } from "express";
import routes from "./routes";

import { config } from "dotenv";
config();

import "./config/DbConfig";

const app = express();
const PORT = 3333;

app.use(express.json());
app.use(routes);

app.get("/", (request: Request, response: Response) => {
  const data = [{ name: "vitor" }, { profissao: "engenheiro" }];
  return response.json(data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
