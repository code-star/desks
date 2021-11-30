import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

export function patchBooking(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/book", async (req: Request, res: Response) => {
    console.log(req.body);
    await db.run(
      "INSERT INTO booking VALUES ((?),(?),(?),(?))",
      req.body.bookingId,
      req.body.startTime,
      req.body.endTime,
      req.body.deskId
    );
    res.send({
      finished: true,
    });
  });
}
