import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const route = express.Router();

route.get("/",auth("admin"), userControllers.getAllUsers);

route.get("/:userId",auth("admin","user"), userControllers.getSingleUser);

route.put("/:userId",auth("admin","user"), userControllers.updateUser);

route.delete("/:userId",auth("admin"), userControllers.deleteUser);

export const usersRoute = route;
