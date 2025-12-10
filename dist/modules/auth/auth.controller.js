"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const signUp = async (req, res) => {
    // console.log(req.body);
    try {
        const result = await auth_service_1.authServices.signUp(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authServices.signIn(email, password);
        res.status(200).json({
            success: true,
            message: "Login successful",
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
exports.authControllers = {
    signIn,
    signUp,
};
