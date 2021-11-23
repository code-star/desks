import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import preDb from "./preDb";
import { Database } from "sqlite";
import { getDesk, patchDesk } from "./routes/desk";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
};

console.log("test build");

let db: Database<sqlite3.Database, sqlite3.Statement>;
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
  db = await preDb();
  getDesk(app, db);
  patchDesk(app, db);
  console.log(`Example app listening at http://localhost:${port}`);
});
