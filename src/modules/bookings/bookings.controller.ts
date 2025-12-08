import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);
    res.status(201).json({
      success: true,
      message: "Booking Created Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllBookings = async (req: Request, res: Response) => {
  const role = req?.user?.role;
  const id = req?.user?.id;
  
  try {
    const result = await bookingServices.getAllBookings(role, id);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No booking found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: role === "admin" ? "Bookings retrieved successfully" : "Your bookings retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req : Request, res : Response )=>{
  const id = req.params.bookingId;
  const role = req?.user?.role;

  try {
    const result = await bookingServices.updateBooking(role, id as string)
    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No booking found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: role === "admin" ? "Booking marked as returned. Vehicle is now available" : "Booking cancelled successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }

}
export const bookingController = {
  createBooking,
  getAllBookings,
  updateBooking,
};
