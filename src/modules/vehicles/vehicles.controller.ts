import { Request, Response } from "express";
import { vehiclesServices } from "./vehicles.service";

const createVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getAllVehicles();

    if (result.length == 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles Found!",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const getVehicleBYId = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.getVehicleBYId(
      req.params.vehicleId as string
    );

    if (result.rows.length == 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles Found!",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully",
        data: result.rows[0],
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.updateVehicle(
      req.params.vehicleId!,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      data: [],
    });
  }
};

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehiclesServices.deleteVehicle(req.params.vehicleId!);
    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "No vehicles Found to Delete!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehiclesControllers = {
  createVehicle,
  getAllVehicles,
  getVehicleBYId,
  updateVehicle,
  deleteVehicle,
};
