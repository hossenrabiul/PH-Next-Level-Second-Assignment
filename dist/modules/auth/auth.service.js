"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const DB_1 = require("../../config/DB");
const signUp = async (Payload) => {
    const { name, email, password, phone, role } = Payload;
    const hashPass = await bcryptjs_1.default.hash(password, 10);
    const result = await DB_1.pool.query(`
    INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`, [name, email, hashPass, phone, role]);
    delete result.rows[0].password;
    return result;
};
const signIn = async (email, password) => {
    const result = await DB_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    if (result.rows.length === 0) {
        throw new Error("Invalid Credentials");
    }
    const user = result.rows[0];
    const matchPass = await bcryptjs_1.default.compare(password, user.password);
    console.log(matchPass);
    if (!matchPass) {
        throw new Error("Invalid Credentials");
    }
    const payload = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
    };
    const secret_key = config_1.default.jwt_sectet_key;
    const token = jsonwebtoken_1.default.sign(payload, secret_key, { expiresIn: "7d" });
    console.log(token);
    delete user.password;
    return { token, user };
};
exports.authServices = {
    signIn,
    signUp,
};
