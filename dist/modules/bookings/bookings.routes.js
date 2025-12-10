"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRoute = void 0;
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const bookings_controller_1 = require("./bookings.controller");
const route = (0, express_1.Router)();
route.post("/", (0, auth_1.default)("admin", "user"), bookings_controller_1.bookingController.createBooking);
route.get("/", (0, auth_1.default)("admin", "user"), bookings_controller_1.bookingController.getAllBookings);
route.put("/:bookingId", (0, auth_1.default)("admin", "user"), bookings_controller_1.bookingController.updateBooking);
exports.bookingsRoute = route;
