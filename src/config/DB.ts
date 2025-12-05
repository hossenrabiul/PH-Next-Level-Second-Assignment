import { Pool } from "pg";
import config from ".";
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXIST users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        email VARCHAR(200) NOT NULL,
        password TEXT NOT NULL,
        phone NOT NULL,
        role TEXT NOT NULL CHECK(role IN ('admin', 'customer))
        )
    `);
};
