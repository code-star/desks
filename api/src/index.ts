import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import prepareDb from "./prepareDb";
import { Database } from "sqlite";
import { getDesk, patchDesk, getDeskList } from "./routes/desk";
import { patchBooking, getBookingList } from "./routes/booking";
//import { generatePDF } from "./qrCode";

const app = express();
const port = 3001;

const corsOptions = {
  origin: "http://localhost:3000",
};

let db: Database<sqlite3.Database, sqlite3.Statement>;
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
  db = await prepareDb();
  getDeskList(app, db);
  getDesk(app, db);
  patchDesk(app, db);
  patchBooking(app, db);
  getBookingList(app, db);
  console.log(`Example app listening at http://localhost:${port}`);
});
