import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "../types";

const UNIX_HALF_HOUR = 60;
export const notifications = new Map();
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
    const halfHourNotifications = bookingsNow.map((bookingNow) => {
      console.log(`half hour before booking desk ${bookingNow.booked_desk}`);
      return {
        id: `${bookingNow.booking_id}_HalfHourBefore`,
        message: `half hour before booking desk ${bookingNow.booked_desk}`,
        user: bookingNow.user_name,
      };
    });
    const tooLateNotifications = bookingsOver.map((bookingOver) => {
      console.log(
        `you are too late for your booking of ${bookingOver.booked_desk}`
      );
      return {
        id: `${bookingOver.booking_id}_HalfHourOver`,
        message: `you are too late for your booking of ${bookingOver.booked_desk}`,
        user: bookingOver.user_name,
      };
    });
    const newNotifications = [
      ...halfHourNotifications,
      ...tooLateNotifications,
    ];
    newNotifications.forEach((notification) => {
      notifications.set(notification.id, notification);
    });
    console.log(notifications.entries());
  }, 5000);
}

function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
