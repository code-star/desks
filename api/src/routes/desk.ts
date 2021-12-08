import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { DeskType, deskState } from "../types";

export function getDesk(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
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
}

export function getDeskList(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get("/api/desk/list", async (req: Request, res: Response) => {
    const desk = await db.all<DeskType[]>("SELECT * FROM desk");
    req.param;

    if (!desk) {
      res.status(404);
      return;
    }
    res.send({
      deskList: desk,
    });
  });
}

export function patchDesk(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/desk/:deskId", async (req: Request, res: Response) => {
    const initialDesk = await db.get<DeskType>(
      "SELECT * FROM desk WHERE desk_id = (?)",
      req.params.deskId
    );
    if (!initialDesk) {
      res.status(404).send("no initial desk");
      return;
    }
    const newDeskState =
      initialDesk.desk_state === deskState.checkedIn
        ? deskState.free
        : deskState.checkedIn;
    try {
      await db.run(
        "UPDATE desk SET desk_state = (?) WHERE desk_id = (?)",
        newDeskState,
        req.params.deskId
      );
    } catch (err) {
      res.status(404).send(err);
      return;
    }   
    const desk = await db.get<DeskType>(
      "SELECT * FROM desk WHERE desk_id = (?)",
      req.params.deskId
    );
    if (!desk) {
      res.status(404).send("no result desk");
      return;
    }
    res.send({
      deskid: desk.desk_id,
      deskState: desk.desk_state,
    });
  });
}
