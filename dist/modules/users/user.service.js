"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const DB_1 = require("../../config/DB");
const getAllUsers = async () => {
    const result = await DB_1.pool.query(`SELECT id, name, email, phone, role FROM users`);
    return result;
};
const getSingleUser = async (userId) => {
    const result = await DB_1.pool.query(`SELECT name, email, phone, role FROM users WHERE id=$1`, [userId]);
    return result;
};
const updateUser = async (userId, Payload) => {
    const { name, email, phone, role } = Payload;
    const result = await DB_1.pool.query(`UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`, [name, email, phone, role, userId]);
    return result;
};
const deleteUser = async (userId) => {
    const bookings = await DB_1.pool.query(`
    
    SELECT * FROM bookings WHERE customer_id=$1
    `, [userId]);
    if (bookings.rows.length) {
        for (const booking of bookings.rows) {
            if (booking.status === "active") {
                throw new Error("You have active bookings");
            }
        }
    }
    const result = await DB_1.pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
        userId,
    ]);
    return result;
};
exports.userServices = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
