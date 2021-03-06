import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import prepareDb from "./prepareDb";
import { Database } from "sqlite";
import { getDesk, patchDesk, getDeskList } from "./routes/desk";
import { patchBooking, getBookings } from "./routes/booking";
import {
  checkUser,
  getUserDeskList,
  patchUser,
  getUserNotificationList,
} from "./routes/user";
import { setNotifications } from "./notifcation";
import { autoCheckout } from "./autoCheckout";

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: ["http://localhost:3000", "https://code-star.github.io"],
};

let db: Database<sqlite3.Database, sqlite3.Statement>;
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
  db = await prepareDb();
  setNotifications(db);
  autoCheckout(db);
  getDeskList(app, db);
  getDesk(app, db);
  patchDesk(app, db);
  patchBooking(app, db);
  getBookings(app, db);
  getUserDeskList(app, db);
  getUserNotificationList(app);
  checkUser(app, db);
  patchUser(app, db);
  console.log(`Desk server listening at http://localhost:${port}`);
});
