import express, { Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.routes";
import { usersRoute } from "./modules/users/users.routes";
const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello to the 2nd assignment!");
});

app.use("/api/v1/auth", authRoute);

app.use("/api/v1/users", usersRoute);

app.listen(500, () => {
  console.log("Server is listening on port 5000");
});
