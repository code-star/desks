const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");

const app = express();
const port = 3001;
const deskState = { 1: false, 2: false, 3: true, 4: true, 5: false };

const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.static("public"));
app.use(cors(corsOptions));
//{deskid: req.params.deskId}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/api/desk/:deskId", (req, res) => {
  const deskStateJson = deskState[req.params.deskId];
  if (typeof deskStateJson === "undefined") {
    res.status(404).send("deze desk bestaat niet");
    return;
  }
  res.send({
    deskid: req.params.deskId,
    deskState:
      typeof deskStateJson === "undefined" ? "undifined" : deskStateJson,
  });
});
app.patch("/api/desk/:deskId", (req, res) => {
  //deskState[req.params.deskId] = !deskState[req.params.deskId];
  deskState[req.body.deskId] = req.body.deskState;
  //ik denk dat ik hier dan die deskState van de body van de patch  moet verwerken, maar snap niet hoe
  console.log(req.body);
  res.send({
    deskid: req.params.deskId,
    deskState: deskState[req.params.deskId],
  });
});

app.get("/api/desks", async (req, res) => {
  const db = await open({
    filename: "./localStore/db",
    driver: sqlite3.Database,
  });

  await db.exec("CREATE TABLE IF NOT EXISTS tbl (col TEXT)");
  await db.run("INSERT INTO tbl (col) VALUES (?)", Date.now());

  const result = await db.all("SELECT * FROM tbl");
  res.send(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
