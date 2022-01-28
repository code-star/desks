import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking } from "./types";

const UNIX_HALF_HOUR = 1800;
export const notifications = new Map();
//calls function every 5 seconds
export function setNotifications(
  db: Database<sqlite3.Database, sqlite3.Statement>
): void {
  setInterval(async () => {
    const bookings = await db.all<Booking[]>("SELECT * FROM booking");
    //get all the bookings that are half an hour from now
    const bookingsNow: Booking[] = bookings.filter((booking: Booking) => {
      //time cant be exactly the same, check if its between 6 sec (with 5 sec interval)
      return isBetween(
        booking.start_time,
        Date.now() / 1000 - 3 + UNIX_HALF_HOUR,
        Date.now() / 1000 + 3 + UNIX_HALF_HOUR
      );
    });
    //get all the bookings that were half an hour ago
    const bookingsOver: Booking[] = bookings.filter((booking: Booking) => {
      //time cant be exactly the same, check if its between 6 sec (with 5 sec interval)
      return isBetween(
        booking.start_time,
        Date.now() / 1000 - 3 - UNIX_HALF_HOUR,
        Date.now() / 1000 + 3 - UNIX_HALF_HOUR
      );
    });
    //add notification object for every bookingsNow and bookingsOver and add them to one array
    const halfHourNotifications = bookingsNow.map((bookingNow) => {
      return {
        id: `${bookingNow.booking_id}_HalfHourBefore`,
        message: `half hour before booking desk ${bookingNow.booked_desk}`,
        user: bookingNow.user_name,
      };
    });
    const tooLateNotifications = bookingsOver.map((bookingOver) => {
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
  }, 5000);
}

function isBetween(value: number, min: number, max: number) {
  return value >= min && value <= max;
}
