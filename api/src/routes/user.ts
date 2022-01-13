import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

export function getUserDeskList(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get("/api/user/list/:userName", async (req: Request, res: Response) => {
    console.log("GET /api/user/list");
    console.log(req.params.userName);

    const userDesks = await db.all<Booking[]>(
      "SELECT * FROM booking WHERE user_name = (?)",
      req.params.userName
    );

    if (!userDesks) {
      res.status(404);
      return;
    }
    res.send({
      userDeskList: userDesks,
    });
  });
}
