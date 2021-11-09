import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3001;

const deskState:boolean[] = [false, false, true,  true,  false ];

const corsOptions = {
  origin: 'http://localhost:3000'
}

var db = new sqlite3.Database("database.db");

db.exec('CREATE TABLE user (name TEXT, password TEXT)')
db.exec('INSERT INTO user VALUES ("test", "pw")')
db.exec('CREATE TABLE desk (desk_id TEXT, deskstate TEXT)')
db.exec('INSERT INTO desk VALUES ("b2.1", "free")')
db.exec('INSERT INTO desk VALUES ("b2.2", "free")')
db.exec('CREATE TABLE booking (booking_id TEXT, start_time TEXT, end_time TEXT, date TEXT)')
db.exec('INSERT INTO booking VALUES ("bookingb2.1.1", "13:00", "17:00", "4-11-2021")')

app.use(express.static('public'));
app.use(cors(corsOptions))
//{deskid: req.params.deskId}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get("/api/desk/:deskId", (req, res) => {
  const deskStateJson = deskState[1];//req.params.deskId
  if (typeof deskStateJson === "undefined") {
    res.status(404).send("deze desk bestaat niet");
    return;
  }
  res.send({
    deskid: req.params.deskId,
    deskState:
      typeof deskStateJson === "undefined" ? "undefined" : deskStateJson,
  });
});
app.patch("/api/desk/:deskId", (req, res) => {
  //deskState[req.params.deskId] = !deskState[req.params.deskId];
  deskState[req.body.deskId] = req.body.deskState;
  //ik denk dat ik hier dan die deskState van de body van de patch  moet verwerken, maar snap niet hoe
  console.log(req.body);
  res.send({
    deskid: req.params.deskId,
    deskState: deskState[1],//req.params.deskId
  });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
