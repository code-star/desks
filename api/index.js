const sqlite3 = require("sqlite3");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3001;
const deskState = { 1: false, 2: false, 3: true, 4: true, 5: false };

// DB selection
const db = new sqlite3.Database("./desksReservation.db");

// try to create table when doesnt exist
db.run("CREATE TABLE IF NOT EXISTS reservations(id TEXT PRIMARY KEY, status TEXT)");

//print all rows for console log purposes
console.log('============== Read database All Rows');
db.each(
  "SELECT * FROM reservations",
  function (err, row) {
    if (err) {
      console.log("No database found");
    }
    console.log(row);
  }
);

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(express.static("public"));
app.use(cors(corsOptions));
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
  deskState[req.body.deskId] = req.body.deskState;

  // on new request, Insert or Update into DB
  db.run(
    "INSERT INTO reservations(id,status) VALUES(?,?) ON CONFLICT(id) DO UPDATE SET status="+req.body.deskState,
    [req.params.deskId, req.body.deskState],
    function (err) {
      if (err) {
        return console.log("ERROR === ", err.message);
      }
      console.log("Desk reservation has been updated");
    }
  );

  // display all rows for console log purposes
  db.each(
    "SELECT * FROM reservations",
    function (err, row) {
      if (err) {
        console.log("No database found");
      }
      console.log(row);
    }
  );

  res.send({
    deskid: req.params.deskId,
    deskState: deskState[req.params.deskId],
  });

});

app.listen(port, () => {
  console.log(
    `Example backend app with database listening at http://localhost:${port}`
  );
});
