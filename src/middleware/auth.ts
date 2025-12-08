import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { pool } from "../config/DB";

const auth = (...roles: ("admin" | "user")[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
   
    try {
      const authHeader = req.headers.authorization;
      if(!authHeader || !authHeader.startsWith("Bearer")){
        throw new Error("Unauthorized")
      }
      const token = authHeader.split(" ")[1]
      // console.log(token)
      if (!token) {
        throw new Error("You are not authorized");
      }
      const decoded = jwt.verify(
        token,
        config.jwt_sectet_key as string
      ) as JwtPayload;
      
      const user = await pool.query(
        `
                SELECT * FROM users WHERE email=$1
                `,
        [decoded.email]
      );

    
      req.user = decoded
      if (user.rows.length === 0) {
        throw new Error("No user found");
      }

      if (roles.length && !roles.includes(user.rows[0].role)) {
        throw new Error("You are not alllowed");
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;
