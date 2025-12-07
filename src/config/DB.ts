import { Pool } from "pg";
import config from ".";
export const pool = new Pool({
  connectionString: `${config.connection_str}`,
});

export const initDB = async () => {
  await pool.query(`
        CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(200) NOT NULL UNIQUE,
        password TEXT NOT NULL,
        phone VARCHAR(200) NOT NULL,
        role TEXT NOT NULL
        )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS vehicles(
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(200) NOT NULL,
    type VARCHAR(100) NOT NULL,
    registration_number VARCHAR(200) NOT NULL UNIQUE,
    daily_rent_price INT NOT NULL,
    availability_status VARCHAR(100) NOT NULL
    )
    `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date VARCHAR(200) NOT NULL,
    rent_end_date VARCHAR(200) NOT NULL,
    total_price INT NOT NULL,
    status VARCHAR(100) NOT NULL
    )
    `)
  
};
