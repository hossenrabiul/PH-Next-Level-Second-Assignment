"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const getAllUsers = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUsers();
        if (result.rows.length == 0) {
            res.status(200).json({
                success: false,
                message: "No user found",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User retrived successfully",
                data: result.rows,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: [],
        });
    }
};
const getSingleUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getSingleUser(req.params.userId);
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: "Could not found any user",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User retrived successfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: [],
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.updateUser(req.params.userId, req.body);
        if (result.rows.length === 0) {
            res.status(200).json({
                success: false,
                message: "Could not update any user",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User updated successfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: [],
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUser(req.params.userId);
        console.log(result.rows[0]);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "NO user found to delete!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "User Deleted successfully",
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
exports.userControllers = {
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser,
};
