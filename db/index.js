const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors');
const { OPEN_READWRITE } = require("sqlite3");

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./myDb.db');

const app = express();
const port = 3001;
const deskState = { 1: false, 2: false, 3: true, 4: true, 5: false };

const corsOptions = {
  origin: 'http://localhost:3000'
}
app.use(express.static('public'));
app.use(cors(corsOptions))
//{deskid: req.params.deskId}
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/init", (req, res) => {
  db.serialize(function () {
    db.run("CREATE TABLE lorem (info TEXT)");

    var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
    for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
    }
    stmt.finalize();

    res.send("done");
  });
})

app.get("/api/toggle", (req, res) => {
  const result = {};
  db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
    console.log(row.id + ": " + row.info);
    result[row.id] = row.info;

  }, () => {
    console.log(result);
    res.send(JSON.stringify(result))
  });
})

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
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
