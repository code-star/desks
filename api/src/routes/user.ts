import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking, User } from "../types";

export function getUserDeskList(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get("/api/user/list/:userName", async (req: Request, res: Response) => {
    console.log("GET /api/user/list");

    const userDesks = await db.all<Booking[]>(
      "SELECT * FROM booking WHERE user_name = (?)",
      req.params.userName
    );

    if (!userDesks) {
      res.status(404);
      return;
    }
    res.send({
      userDeskList: userDesks,
    });
  });
}

export function getUser(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get("/api/user/:userName", async (req: Request, res: Response) => {
    console.log("GET /api/user");

    const user = await db.get<User>(
      "SELECT * FROM user WHERE name = (?)",
      req.params.userName
    );

    if (!user) {
      res.status(404);
      return;
    }
    res.send({
      user: user,
    });
  });
}

export function patchUser(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/createUser", async (req: Request, res: Response) => {
    const { name, password } = req.body;
    await db.run("INSERT INTO user VALUES ((?),(?))", name, password);
    const user = await db.get<Booking>(
      "SELECT * from user WHERE name =(?)",
      name
    );
    if (!user) {
      res.status(404);
      return;
    }
    res.send({ user });
  });
}
