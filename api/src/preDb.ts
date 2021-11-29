import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { deskState, User } from "./types";

export async function preDb() {
  const db = await open({ filename: "database.db", driver: sqlite3.Database });

  await db.exec(
    "CREATE TABLE IF NOT EXISTS user (name TEXT PRIMARY KEY, password TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS desk (desk_id TEXT PRIMARY KEY, desk_state TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS booking (booking_id TEXT PRIMARY KEY, start_time NUM, end_time NUM, booked_desk TEXT, FOREIGN KEY(booked_desk) REFERENCES desk(desk_id))"
  );

  const allUsers = await db.all<User[]>(
    "SELECT * FROM user WHERE name = (?)",
    "test"
  );
  if (allUsers.length === 0) {
    await db.exec('INSERT INTO user VALUES ("test", "pw")');
    for (let i = 1; i < 12; i++) {
      await db.run(
        "INSERT INTO desk VALUES ((?), (?))",
        `b2.${i}`,
        deskState.free
      );
    }
    await db.exec(
      'INSERT INTO booking VALUES ("bookingb2.1.1", 1636027200, 1636041600, "b2.1")'
    );
  }

  return db;
}
export default preDb;
