import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

//get all bookings from the database
export function getBookings(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get("/api/bookinglist", async (_, res: Response) => {
    console.log("GET /api/bookinglist");

    const bookings = await db.all<Booking[]>("SELECT * FROM booking");
    if (!bookings) {
      res.status(404);
      return;
    }
    res.send({
      bookingList: bookings,
    });
  });
}

//set a booking to the database
export function patchBooking(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/book", async (req: Request, res: Response) => {
    const { booking_id, start_time, end_time, booked_desk, user_name } =
      req.body;
    await db.run(
      "INSERT INTO booking VALUES ((?),(?),(?),(?),(?))",
      booking_id,
      start_time,
      end_time,
      booked_desk,
      user_name
    );
    const booking = await db.get<Booking>(
      "SELECT * from booking WHERE booking_id =(?)",
      booking_id
    );
    if (!booking) {
      res.status(404);
      return;
    }
    res.send({ booking });
  });
}
