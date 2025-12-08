import { Router } from "express";
import auth from "../../middleware/auth";
import { bookingController } from "./bookings.controller";

const route = Router();

route.post("/", auth("admin", "user"), bookingController.createBooking);

route.get("/", auth("admin", "user"), bookingController.getAllBookings);

route.put(
  "/:bookingId",
  auth("admin", "user"),
  bookingController.updateBooking
);
export const bookingsRoute = route;
