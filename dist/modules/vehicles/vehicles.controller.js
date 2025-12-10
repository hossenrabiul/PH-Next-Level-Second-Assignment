"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesControllers = void 0;
const vehicles_service_1 = require("./vehicles.service");
const createVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: [],
        });
    }
};
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.getAllVehicles();
        if (result.length == 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles Found!",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
                data: result,
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
const getVehicleBYId = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.getVehicleBYId(req.params.vehicleId);
        if (result.rows.length == 0) {
            res.status(200).json({
                success: true,
                message: "No vehicles Found!",
                data: [],
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicles retrieved successfully",
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
const updateVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.updateVehicle(req.params.vehicleId, req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
            data: [],
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicles_service_1.vehiclesServices.deleteVehicle(req.params.vehicleId);
        if (result.rows.length == 0) {
            res.status(404).json({
                success: false,
                message: "No vehicles Found to Delete!",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicles deleted successfully",
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
exports.vehiclesControllers = {
    createVehicle,
    getAllVehicles,
    getVehicleBYId,
    updateVehicle,
    deleteVehicle,
};
