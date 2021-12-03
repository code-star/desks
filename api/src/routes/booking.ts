import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

export function patchBooking(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/book", async (req: Request, res: Response) => {
    await db.run(
      "INSERT INTO booking VALUES ((?),(?),(?),(?))",
      req.body.bookingId,
      req.body.startTime,
      req.body.endTime,
      req.body.deskId
    );
    const booking = await db.get<Booking>(
      "SELECT * from booking WHERE booking_id =(?)",
      req.body.bookingId
    );
    if (!booking) {
      res.status(404);
      return;
    }
    res.send({
      bookingId: booking.bookingId,
      startTime: booking.startTime,
      endTime: booking.endTime,
      deskId: booking.deskId,
    });
  });
}
