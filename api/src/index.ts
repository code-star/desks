import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import preDb from './preDb'; 

const app = express();
const port = 3001;

const corsOptions = {
  origin: 'http://localhost:3000'
}

enum deskState{
  free,
  checkedIn,
  reserved,
  undefined
}

let db:any;
app.use(express.static('public'));
app.use(cors(corsOptions))
//{deskid: req.params.deskId}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
interface Desk{deskId:string; deskState:boolean}

app.get("/api/desk/:deskId", async (req: Request, res: Response) => {
  const desk = await db.get(
    "SELECT * FROM desk WHERE desk_id = (?)",req.params.deskId);
    console.log(desk);
    console.log(desk.desk_id);
    
  if (desk.deskstate === "undefined") {
     res.status(404).send("deze desk bestaat niet");
     return;
   }
   res.send({
     deskid: desk.desk_id,
     deskState:
      desk.deskstate === "undefined" ? "undefined" : desk.deskstate,
  });
});

app.patch("/api/desk/:deskId", async (req: Request, res: Response) => {
  const deskPre = await db.get(
    "SELECT * FROM desk WHERE desk_id = (?)",req.params.deskId);
  await db.get("UPDATE desk SET deskstate = (?) WHERE desk_id = (?)", deskPre.deskstate === deskState.free ? deskState.checkedIn : deskState.free, req.params.deskId);
  const desk = await db.get(
    "SELECT * FROM desk WHERE desk_id = (?)",req.params.deskId);
  res.send({
    deskid: desk.desk_id,
    deskState: desk.deskstate,
  });
})

app.listen(port, async() => {
  db = await preDb();
  console.log(`Example app listening at http://localhost:${port}`);
});
