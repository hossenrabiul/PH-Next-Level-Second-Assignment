import express from "express";
import { userControllers } from "./user.controller";

const route = express.Router();

route.get("/", userControllers.getAllUsers);

route.get("/:userId", userControllers.getSingleUser);

route.put("/:userId", userControllers.updateUser);

route.delete("/:userId", userControllers.deleteUser);

export const usersRoute = route;
