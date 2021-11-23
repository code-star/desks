import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3 from "sqlite3";
import preDb from "./preDb";
import { deskState, DeskType } from "./types";
import { Database } from "sqlite";

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

app.get("/api/desk/:deskId", async (req: Request, res: Response) => {
  const desk = await db.get<DeskType>(
    "SELECT * FROM desk WHERE desk_id = (?)",
    req.params.deskId
  );

  if (!desk) {
    res.send({
      deskState: deskState.unavailable,
    });
    return;
  }
  res.send({
    deskid: desk.desk_id,
    deskState: desk.desk_state,
  });
});

app.patch("/api/desk/:deskId", async (req: Request, res: Response) => {
  const initialDesk = await db.get<DeskType>(
    "SELECT * FROM desk WHERE desk_id = (?)",
    req.params.deskId
  );
  if (!initialDesk) {
    res.status(404);
    return;
  }
  const newDeskState =
    initialDesk.desk_state === deskState.checkedIn
      ? deskState.free
      : deskState.checkedIn;
  await db.run(
    "UPDATE desk SET desk_state = (?) WHERE desk_id = (?)",
    newDeskState,
    req.params.deskId
  );
  const desk = await db.get<DeskType>(
    "SELECT * FROM desk WHERE desk_id = (?)",
    req.params.deskId
  );
  if (!desk) {
    res.status(404);
    return;
  }
  res.send({
    deskid: desk.desk_id,
    deskState: desk.desk_state,
  });
});

app.listen(port, async () => {
  db = await preDb();
  console.log(`Example app listening at http://localhost:${port}`);
});
