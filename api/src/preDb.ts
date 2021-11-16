import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function preDb() {

  const db = await open({ filename: "database.db", driver: sqlite3.Database });

  await db.exec(
    "CREATE TABLE IF NOT EXISTS user (name TEXT PRIMARY KEY, password TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS desk (desk_id TEXT PRIMARY KEY, desk_state TEXT)"
  );
  await db.exec(
    "CREATE TABLE IF NOT EXISTS booking (booking_id TEXT PRIMARY KEY, start_time TEXT, end_time TEXT, date TEXT)"
  );

  interface User {
    name: string;
    password: string;
  }
  const allUsers = await db.all<User[]>(
    "SELECT * FROM user WHERE name = (?)",
    "test"
  );
  console.log(allUsers);
  if (allUsers.length === 0) {
    await db.exec('INSERT INTO user VALUES ("test", "pw")');
    for (let i = 1; i < 12; i++) {
      await db.run('INSERT INTO desk VALUES ((?), "free")', `b2.${i}`);
    }
    await db.exec(
      'INSERT INTO booking VALUES ("bookingb2.1.1", "13:00", "17:00", "4-11-2021")'
    );
  }

  return db;
}
export default preDb;
