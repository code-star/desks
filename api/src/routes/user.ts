import { Request, Response, Express } from "express";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { Booking, User } from "../types";
import { notifications } from "../notifcation";

//Get list with all bookings of a specified user from database
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
//get list of notifications for a specific user
export function getUserNotificationList(app: Express) {
  app.get(
    "/api/user/notification/:userName",
    async (req: Request, res: Response) => {
      console.log("GET /api/user/notification/");
      const userNotifications = Array.from(notifications.values()).filter(
        (notification) => {
          return notification.user === req.params.userName;
        }
      );
      userNotifications.forEach((notification) => {
        notifications.delete(notification.id);
      });
      res.send({
        notifications: userNotifications,
      });
    }
  );
}

//check if given username and password match a user from the database
export function checkUser(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.get(
    "/api/user/:userName/:password",
    async (req: Request, res: Response) => {
      console.log("GET /api/user");

      const user = await db.get<User>(
        "SELECT * FROM user WHERE name = (?)",
        req.params.userName
      );

      if (!user || user.password != req.params.password) {
        res.status(404);
        res.send({
          isValid: false,
        });
        return;
      }
      res.send({
        isValid: true,
        userName: user.name,
        role: user.role,
      });
    }
  );
}

//add user in database
export function patchUser(
  app: Express,
  db: Database<sqlite3.Database, sqlite3.Statement>
) {
  app.patch("/api/createUser", async (req: Request, res: Response) => {
    const { name, password, role } = req.body;
    await db.run("INSERT INTO user VALUES ((?),(?),(?))", name, password, role);
    const user = await db.get<Booking>(
      "SELECT * from user WHERE name =(?)",
      name
    );
    if (!user) {
      res.status(404);
      res.send({ isUserCreated: false });
      return;
    }
    res.send({ isUserCreated: true });
  });
}
