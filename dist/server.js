"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const DB_1 = require("./config/DB");
const auth_routes_1 = require("./modules/auth/auth.routes");
const vehicles_routes_1 = require("./modules/vehicles/vehicles.routes");
const users_routes_1 = require("./modules/users/users.routes");
const bookings_routes_1 = require("./modules/bookings/bookings.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello to the 2nd assignment!");
});
// Create database table
(0, DB_1.initDB)();
app.use("/api/v1/auth", auth_routes_1.authRoute);
app.use("/api/v1/users", users_routes_1.usersRoute);
app.use("/api/v1/vehicles", vehicles_routes_1.vehiclesRoute);
app.use("/api/v1/bookings", bookings_routes_1.bookingsRoute);
app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});
