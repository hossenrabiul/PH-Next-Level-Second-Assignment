import express from "express";
import auth from "../../middleware/auth";
import { vehiclesControllers } from "./vehicles.controller";

const route = express.Router();

route.post("/", auth("admin"), vehiclesControllers.createVehicle);

route.get("/", vehiclesControllers.getAllVehicles);

route.get("/:vehicleId", vehiclesControllers.getVehicleBYId);

route.put("/:vehicleId",auth("admin"), vehiclesControllers.updateVehicle);

route.delete("/:vehicleId",auth("admin"), vehiclesControllers.deleteVehicle);

export const vehiclesRoute = route;
