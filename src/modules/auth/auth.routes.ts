import express from "express";
import { authControllers } from "./auth.controller";

const route = express.Router();

route.post("/signup", authControllers.signUp);

route.post("/signin", authControllers.signIn);

export const authRoute = route;
