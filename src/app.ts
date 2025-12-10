import express, { Request, Response } from "express";
import { initDB } from "./config/DB";
import { authRoute } from "./modules/auth/auth.routes";
import { vehiclesRoute } from "./modules/vehicles/vehicles.routes";
import { usersRoute } from "./modules/users/users.routes";
import { bookingsRoute } from "./modules/bookings/bookings.routes";

export const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello to the 2nd assignment!");
});

// Create database table
initDB();

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/users", usersRoute);

app.use("/api/v1/vehicles", vehiclesRoute);

app.use("/api/v1/bookings", bookingsRoute);


