import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

const UNIX_HALF_HOUR = 1800;
//calls function every 30 seconds
export function intervalId(
  db: Database<sqlite3.Database, sqlite3.Statement>
): void {
  setInterval(async () => {
    const bookings = await db.all<Booking[]>("SELECT * FROM booking");
    const bookingNow: Booking | undefined = bookings.find(
      (booking: Booking) => {
        return isBetween(
          booking.start_time,
          Date.now() / 1000 - 3 + UNIX_HALF_HOUR,
          Date.now() / 1000 + 3 + UNIX_HALF_HOUR
        );
      }
    );
    const bookingOver: Booking | undefined = bookings.find(
      (booking: Booking) => {
        return isBetween(
          booking.start_time,
          Date.now() / 1000 - 3 - UNIX_HALF_HOUR,
          Date.now() / 1000 + 3 - UNIX_HALF_HOUR
        );
      }
    );
    if (bookingNow) {
      console.log(`half hour before booking desk ${bookingNow.booked_desk}`);
      //sign frontend 'Half an our before your booking of desk x'
    }
    if (bookingOver) {
      console.log(
        `you are too late for your booking of ${bookingOver.booked_desk}`
      );
      //sign frontend
    }
  }, 5000);
}

function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
