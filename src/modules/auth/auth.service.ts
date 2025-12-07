import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";
import { pool } from "../../config/DB";
const signUp = async (Payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = Payload;
  const hashPass = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `
    INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4, $5) RETURNING *`,
    [name, email, hashPass, phone, role]
  );

  delete result.rows[0].password;

  return result;
};

const signIn = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);
  
  if (result.rows.length === 0) {
    throw new Error("Invalid Credentials");
  }
  
  const user = result.rows[0];
  const matchPass = await bcrypt.compare(password as string, user.password);
  console.log(matchPass)
  if (!matchPass) {
    throw new Error("Invalid Credentials");
  }
 
  const payload = { name: user.name, email: user.email, role: user.role };
  const secret_key = config.jwt_sectet_key as string;
  const token = jwt.sign(payload, secret_key, { expiresIn: "7d" });
  console.log(token);
  delete user.password;
  return { token, user };
};

export const authServices = {
  signIn,
  signUp,
};
