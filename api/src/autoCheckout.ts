import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "./types";

export const notifications = new Map();
//calls function every minute
export function autoCheckout(
  db: Database<sqlite3.Database, sqlite3.Statement>
): void {
  setInterval(async () => {
    const bookings = await db.all<Booking[]>("SELECT * FROM booking");
    //set deskstate to free (checkout desk) when the booking ends
    bookings.map(async (booking) => {
      if (
        isBetween(
          booking.end_time,
          Date.now() / 1000 - 31,
          Date.now() / 1000 + 31
        )
      ) {
        await db.run(
          "UPDATE desk SET desk_state = 'free' WHERE desk_id = (?)",
          booking.booked_desk
        );
      }
    });
  }, 60000);
  //calls function every hour
  setInterval(async () => {
    const date: Date = new Date(Date.now());
    //set state of all desks to free (checkout desk) if its midnight
    if (date.getHours() === 0) {
      await db.run("UPDATE desk SET desk_state = 'free'");
    }
  }, 3600000);
}
function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
