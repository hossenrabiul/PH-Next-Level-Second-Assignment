"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const DB_1 = require("../config/DB");
const auth = (...roles) => {
    return async (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer")) {
                throw new Error("Unauthorized");
            }
            const token = authHeader.split(" ")[1];
            // console.log(token)
            if (!token) {
                throw new Error("You are not authorized");
            }
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_sectet_key);
            const user = await DB_1.pool.query(`
                SELECT * FROM users WHERE email=$1
                `, [decoded.email]);
            req.user = decoded;
            if (user.rows.length === 0) {
                throw new Error("No user found");
            }
            if (roles.length && !roles.includes(user.rows[0].role)) {
                throw new Error("You are not alllowed");
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: err.message,
            });
        }
    };
};
exports.default = auth;
