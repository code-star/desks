import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

const UNIX_HALF_HOUR = 1800;
//calls function every 5 seconds
export function intervalId(
  db: Database<sqlite3.Database, sqlite3.Statement>
): void {
  setInterval(async () => {
    const bookings = await db.all<Booking[]>("SELECT * FROM booking");
    const bookingsNow: Booking[] = bookings.filter((booking: Booking) => {
      return isBetween(
        booking.start_time,
        Date.now() / 1000 - 3 + UNIX_HALF_HOUR,
        Date.now() / 1000 + 3 + UNIX_HALF_HOUR
      );
    });
    const bookingsOver: Booking[] = bookings.filter((booking: Booking) => {
      return isBetween(
        booking.start_time,
        Date.now() / 1000 - 3 - UNIX_HALF_HOUR,
        Date.now() / 1000 + 3 - UNIX_HALF_HOUR
      );
    });
    bookingsNow.map((bookingNow) => {
      console.log(`half hour before booking desk ${bookingNow.booked_desk}`);
      //sign frontend 'Half an our before your booking of desk x'
    });
    bookingsOver.map((bookingOver) => {
      console.log(
        `you are too late for your booking of ${bookingOver.booked_desk}`
      );
      //sign frontend
    });
  }, 5000);
}

function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
