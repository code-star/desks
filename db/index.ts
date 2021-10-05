import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import sqlite3x, { OPEN_READWRITE } from "sqlite3";
import { Database, open } from "sqlite";

const sqlite3 = sqlite3x.verbose();
let db: Database<sqlite3x.Database, sqlite3x.Statement>;

const app = express();
const port = 3001;
const deskState: Record<number, boolean> = {
  1: false,
  2: false,
  3: true,
  4: true,
  5: false,
};

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.static("public"));
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

interface DeskRow {
  deskId: number;
  deskState: string;
}

app.get("/api/desk/:deskId", async (req, res) => {
  const deskId = parseInt(req.params.deskId, 10);
  // const deskStateJson = deskState[deskId];
  // if (typeof deskStateJson === "undefined") {
  //   res.status(404).send("deze desk bestaat niet");
  //   return;
  // }
  const [{ deskState: deskState_ }] = await db.all<DeskRow[]>(
    "SELECT * FROM tbl WHERE deskId = (?)",
    deskId
  );
  res.send({
    deskid: deskId,
    deskState:
      typeof deskState_ === "undefined" ? "undifined" : deskState_,
  });
});

app.patch("/api/desk/:deskId", (req, res) => {
  const deskId = parseInt(req.params.deskId, 10);
  //deskState[req.params.deskId] = !deskState[req.params.deskId];
  deskState[req.body.deskId] = req.body.deskState;
  //ik denk dat ik hier dan die deskState van de body van de patch  moet verwerken, maar snap niet hoe
  console.log(req.body);
  res.send({
    deskid: deskId,
    deskState: deskState[deskId],
  });
});

const prepareDb = async () => {
  db = await open({
    filename: "./db/myDb.db",
    driver: sqlite3.Database,
  });

  await db.exec(
    "CREATE TABLE IF NOT EXISTS tbl (deskId INTEGER PRIMARY KEY, deskState TEXT)"
  );

  const currentRows = await db.all("SELECT * FROM tbl");

  if (!currentRows || !currentRows.length) {
    console.log("DB is empty, create rows");
    for (let i = 1; i < 20; i++) {
      await db.run(
        "INSERT INTO tbl (deskId, deskState) VALUES (?, ?)",
        i,
        i % 2 === 0 ? "reserved" : "free"
      );
    }
  }

  const deskStates = await db.all("SELECT * FROM tbl");
  console.log("deskStates=", deskStates);
};

app.listen(port, async () => {
  console.log(`Example app listening at http://localhost:${port}`);

  await prepareDb();
});
