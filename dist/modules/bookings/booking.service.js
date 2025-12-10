"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingServices = void 0;
const DB_1 = require("../../config/DB");
const user_service_1 = require("../users/user.service");
const vehicles_service_1 = require("../vehicles/vehicles.service");
const createBooking = async (payload) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    const user = await user_service_1.userServices.getSingleUser(customer_id);
    const vehicle = await vehicles_service_1.vehiclesServices.getVehicleBYId(vehicle_id);
    if (user.rows.length === 0) {
        throw new Error("Invalid User");
    }
    if (vehicle.rows.length === 0) {
        throw new Error("Vehicle does not exist");
    }
    if (vehicle.rows[0].availability_status === "booked") {
        throw new Error("Vehicle is booked already");
    }
    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);
    if (startDate > endDate) {
        throw new Error("rent_end_date Must be greater than rent_start_date");
    }
    const totalDays = endDate.getDate() - startDate.getDate();
    const totalPrice = vehicle.rows[0].daily_rent_price * totalDays;
    if (totalPrice < 0) {
        throw new Error("TotalPrice must be positive");
    }
    const result = await DB_1.pool.query(`
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `, [
        customer_id,
        vehicle_id,
        rent_start_date,
        rent_end_date,
        totalPrice,
        "active",
    ]);
    result.rows[0].vehicle = {
        vehicle_name: vehicle.rows[0].vehicle_name,
        daily_rent_price: vehicle.rows[0].daily_rent_price,
    };
    await DB_1.pool.query(`
    UPDATE vehicles SET availability_status=$1 WHERE id=$2
    `, ["booked", vehicle.rows[0].id]);
    return result.rows[0];
};
const getAllBookings = async (role, id) => {
    if (role === "admin") {
        const result = await DB_1.pool.query(`SELECT * FROM bookings`);
        if (result.rows.length) {
            // Customer
            for (const booking of result.rows) {
                const customer = await DB_1.pool.query(`SELECT name, email FROM users WHERE id = $1`, [booking.customer_id]);
                booking.customer = {
                    name: customer.rows[0].name,
                    email: customer.rows[0].email,
                };
            }
            // Vehicle
            for (const booking of result.rows) {
                const vehicle = await DB_1.pool.query(`SELECT vehicle_name, registration_number FROM vehicles WHERE id = $1`, [booking.vehicle_id]);
                booking.vehicle = {
                    vehicle_name: vehicle.rows[0].vehicle_name,
                    registration_number: vehicle.rows[0].registration_number,
                };
            }
        }
        return result;
    }
    else {
        const result = await DB_1.pool.query(`SELECT * FROM bookings WHERE customer_id=$1`, [id]);
        if (result.rows.length) {
            // Vehicle
            for (const booking of result.rows) {
                const vehicle = await DB_1.pool.query(`SELECT vehicle_name, registration_number, type FROM vehicles WHERE id = $1`, [booking.vehicle_id]);
                booking.vehicle = {
                    vehicle_name: vehicle.rows[0].vehicle_name,
                    registration_number: vehicle.rows[0].registration_number,
                    type: vehicle.rows[0].type,
                };
            }
        }
        return result;
    }
};
const updateBooking = async (role, bookingId) => {
    if (role === "admin") {
        const result = await DB_1.pool.query(`
    UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
    `, ["returned", bookingId]);
        if (result.rows.length) {
            const vehicle = await DB_1.pool.query(`
      UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status
      `, ["available", result.rows[0].vehicle_id]);
            result.rows[0].vehicle = {
                availability_status: vehicle.rows[0].availability_status,
            };
        }
        return result;
    }
    else {
        const result = await DB_1.pool.query(`
    UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *
    `, ["cancelled", bookingId]);
        if (result.rows.length) {
            const vehicle = await DB_1.pool.query(`
      UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status
      `, ["available", result.rows[0].vehicle_id]);
        }
        return result;
    }
};
exports.bookingServices = {
    createBooking,
    getAllBookings,
    updateBooking,
};
