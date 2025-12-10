"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesRoute = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const vehicles_controller_1 = require("./vehicles.controller");
const route = express_1.default.Router();
route.post("/", (0, auth_1.default)("admin"), vehicles_controller_1.vehiclesControllers.createVehicle);
route.get("/", vehicles_controller_1.vehiclesControllers.getAllVehicles);
route.get("/:vehicleId", vehicles_controller_1.vehiclesControllers.getVehicleBYId);
route.put("/:vehicleId", (0, auth_1.default)("admin"), vehicles_controller_1.vehiclesControllers.updateVehicle);
route.delete("/:vehicleId", (0, auth_1.default)("admin"), vehicles_controller_1.vehiclesControllers.deleteVehicle);
exports.vehiclesRoute = route;
