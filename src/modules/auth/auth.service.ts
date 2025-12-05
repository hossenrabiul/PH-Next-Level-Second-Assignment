import { pool } from "../../config/DB";

const signUp = async (Payload: Record<string, unknown>) => {
  const { name, email, password, phone, role } = Payload;

  const result = await pool.query(
    `
        INSERT INTO users (name, email, password, phone, role) VALUES($1, $2, $3, $4) RETURNING*`,
    [name, email, password, phone, role]
  );

  return result;
};

const signIn = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
    email,
  ]);

  if (result.rows.length === 0) {
    return "Please provide the right credentials";
  }

  const user = result.rows[0];
  if (user.password !== password) {
    return "Please provide the right credentials";
  }
  return user;
};

export const authServices = {
  signIn,
  signUp,
};
