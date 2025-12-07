import express from "express";
import { vehiclesControllers } from "./vehicles.controller";

const route = express.Router();

route.post("/", vehiclesControllers.createVehicle);

route.get("/", vehiclesControllers.getAllVehicles);

route.get("/:vehicleId", vehiclesControllers.getVehicleBYId);

route.put("/:vehicleId",vehiclesControllers.updateVehicle)

route.delete("/:vehicleId",vehiclesControllers.deleteVehicle)



export const vehiclesRoute = route;
