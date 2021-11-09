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
let db:any;
app.use(express.static('public'));
app.use(cors(corsOptions))
//{deskid: req.params.deskId}
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
interface Desk{deskId:string; deskState:boolean}

app.get("/api/desk/:deskId", async (req: Request, res: Response) => {
  const desks = await db.all(
    "SELECT * FROM desk");
    console.log(desks);
  // if (typeof deskStateJson === "undefined") {
  //   res.status(404).send("deze desk bestaat niet");
  //   return;
  // }
  // res.send({
  //   deskid: req.params.deskId,
  //   deskState:
  //     typeof deskStateJson === "undefined" ? "undefined" : deskStateJson,
  // });
});


app.patch("/api/desk/:deskId", (req: Request, res: Response) => {
  console.log(req.body);
  res.send({
    deskid: req.params.deskId,
    deskState: req.body.deskState,
  });
})

app.listen(port, async() => {
  db = await preDb();
  console.log(`Example app listening at http://localhost:${port}`);
});
