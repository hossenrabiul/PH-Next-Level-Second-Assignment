"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingController = void 0;
const booking_service_1 = require("./booking.service");
const createBooking = async (req, res) => {
    try {
        const result = await booking_service_1.bookingServices.createBooking(req.body);
        res.status(201).json({
            success: true,
            message: "Booking Created Successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const getAllBookings = async (req, res) => {
    const role = req?.user?.role;
    const id = req?.user?.id;
    try {
        const result = await booking_service_1.bookingServices.getAllBookings(role, id);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No booking found",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: role === "admin" ? "Bookings retrieved successfully" : "Your bookings retrieved successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateBooking = async (req, res) => {
    const id = req.params.bookingId;
    const role = req?.user?.role;
    try {
        const result = await booking_service_1.bookingServices.updateBooking(role, id);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: true,
                message: "No booking found",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: role === "admin" ? "Booking marked as returned. Vehicle is now available" : "Booking cancelled successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
exports.bookingController = {
    createBooking,
    getAllBookings,
    updateBooking,
};
