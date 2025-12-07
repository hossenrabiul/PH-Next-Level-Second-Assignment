import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsers();
    if (result.rows.length == 0) {
      res.status(200).json({
        success: false,
        message: "No user found",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrived successfully",
        data: result.rows,
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

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getSingleUser(req.params.userId!);

    if (result.rows.length == 0) {
      res.status(404).json({
        success: false,
        message: "Could not found any user",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrived successfully",
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUser(req.params.userId!, req.body);
    if (result.rows.length === 0) {
      res.status(200).json({
        success: false,
        message: "Could not update any user",
        data: [],
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
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

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);
    console.log(result.rows[0]);
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "NO user found to delete!",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User Deleted successfully",
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
