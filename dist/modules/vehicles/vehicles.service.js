"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesServices = void 0;
const DB_1 = require("../../config/DB");
const createVehicle = async (payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    if (daily_rent_price < 0) {
        throw new Error("daily_rent_price must be positive");
    }
    const result = await DB_1.pool.query(`INSERT INTO vehicles (vehicle_name,type,registration_number,daily_rent_price,availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
    ]);
    return result.rows[0];
};
const getAllVehicles = async () => {
    const result = await DB_1.pool.query(`SELECT * FROM vehicles`);
    return result.rows;
};
const getVehicleBYId = async (vehicleId) => {
    const result = await DB_1.pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
        vehicleId,
    ]);
    return result;
};
const updateVehicle = async (vehicleId, payload) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = payload;
    const result = await DB_1.pool.query(`UPDATE vehicles SET vehicle_name=$1, type=$2, registration_number = $3, daily_rent_price = $4, availability_status = $5 WHERE id=$6 RETURNING *`, [
        vehicle_name,
        type,
        registration_number,
        daily_rent_price,
        availability_status,
        vehicleId,
    ]);
    return result;
};
const deleteVehicle = async (vehicleId) => {
    const bookings = await DB_1.pool.query(`
    
    SELECT * FROM bookings WHERE vehicle_id=$1 RETURNING *
    `, [vehicleId]);
    if (bookings.rows.length) {
        for (const booking of bookings.rows) {
            if (booking.status === "active") {
                throw new Error("It owns active bookings");
            }
        }
    }
    const result = await DB_1.pool.query(`
        DELETE FROM vehicles WHERE id=$1 RETURNING *
        `, [vehicleId]);
    return result;
};
exports.vehiclesServices = {
    createVehicle,
    getAllVehicles,
    getVehicleBYId,
    updateVehicle,
    deleteVehicle,
};
