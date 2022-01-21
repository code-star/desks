import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { deskState, User } from "./types";

const NR_OF_DESKS = 42;

export async function prepareDb() {
  const db = await open({ filename: ":memory:", driver: sqlite3.Database });

  await db.exec(
    "CREATE TABLE IF NOT EXISTS user (name TEXT PRIMARY KEY, password TEXT, role TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS desk (desk_id TEXT PRIMARY KEY, desk_state TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS booking (booking_id TEXT PRIMARY KEY, start_time INTEGER, end_time INTEGER, booked_desk TEXT, user_name TEXT, FOREIGN KEY(booked_desk) REFERENCES desk(desk_id), FOREIGN KEY(user_name) REFERENCES user(name))"
  );

  const allUsers = await db.all<User[]>(
    "SELECT * FROM user WHERE name = (?)",
    "test"
  );
  if (allUsers.length === 0) {
    await db.exec('INSERT INTO user VALUES ("test", "pw", "user")');
    for (let i = 1; i < NR_OF_DESKS; i++) {
      if (i < 10) {
        await db.run(
          "INSERT INTO desk VALUES ((?), (?))",
          `b2.0${i}`,
          deskState.free
        );
      } else {
        await db.run(
          "INSERT INTO desk VALUES ((?), (?))",
          `b2.${i}`,
          deskState.free
        );
      }
    }
  }

  return db;
}
export default prepareDb;
