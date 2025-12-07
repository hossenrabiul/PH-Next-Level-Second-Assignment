import { Router } from "express";
import { bookingController } from "./bookings.controller";

const route = Router()

route.post("/", bookingController.createBooking)

route.get("/", bookingController.getAllBookings)
export const bookingsRoute = route