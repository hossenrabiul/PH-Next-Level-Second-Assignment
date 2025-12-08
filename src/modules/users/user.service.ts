import { pool } from "../../config/DB";

const getAllUsers = async () => {
  const result = await pool.query(
    `SELECT id, name, email, phone, role FROM users`
  );
  return result;
};

const getSingleUser = async (userId: string) => {
  const result = await pool.query(
    `SELECT name, email, phone, role FROM users WHERE id=$1`,
    [userId]
  );
  return result;
};

const updateUser = async (userId: string, Payload: Record<string, unknown>) => {
  const { name, email, phone, role } = Payload;
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, userId]
  );
  return result;
};

const deleteUser = async (userId: string) => {
  const bookings = await pool.query(
    `
    
    SELECT * FROM bookings WHERE customer_id=$1
    `,
    [userId]
  );

  if (bookings.rows.length) {
     for(const booking of bookings.rows){
      if(booking.status === "active"){
        throw new Error("You have active bookings");
      }
    }
  }
  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    userId,
  ]);
  return result;
};

export const userServices = {
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
};
