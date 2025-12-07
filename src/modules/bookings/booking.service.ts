import { pool } from "../../config/DB";
import { userServices } from "../users/user.service";
import { vehiclesServices } from "../vehicles/vehicles.service";

const createBooking = async (payload: Record<string, unknown>) => {
  const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;

  const user = await userServices.getSingleUser(customer_id as string);
  const vehicle = await vehiclesServices.getVehicleBYId(vehicle_id as string);

  if (user.rows.length === 0) {
    throw new Error("Invalid User");
  }
  if (vehicle.rows.length === 0) {
    throw new Error("Vehicle does not exist");
  }
  if (vehicle.rows[0].availability_status === "booked") {
    throw new Error("Vehicle is booked already");
  }
  const startDate = new Date(rent_start_date as string);
  const endDate = new Date(rent_end_date as string);

  if (startDate > endDate) {
    throw new Error("rent_end_date Must be greater than rent_start_date");
  }

  const totalDays = endDate.getDate() - startDate.getDate();
  const totalPrice = vehicle.rows[0].daily_rent_price * totalDays;
  const result = await pool.query(
    `
        INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
        `,
    [
      customer_id,
      vehicle_id,
      rent_start_date,
      rent_end_date,
      totalPrice,
      "active",
    ]
  );

  result.rows[0].vehicle = {
    vehicle_name: vehicle.rows[0].vehicle_name,
    daily_rent_price: vehicle.rows[0].daily_rent_price,
  };

  const vehicleDetails = {
    vehicle_name: vehicle.rows[0].vehicle_name,
    type: vehicle.rows[0].type,
    registration_number: vehicle.rows[0].registration_number,
    daily_rent_price: vehicle.rows[0].daily_rent_price,
    availability_status: "booked",
  };
  await vehiclesServices.updateVehicle(vehicle.rows[0].id, vehicleDetails);

  return result.rows[0];
  // return {data : result.rows[0] , vehicle : {vehicle_name : vehicle.rows[0].vehicle_name, daily_rent_price : vehicle.rows[0].daily_rent_price}};
};

const getAllBookings = async ()=>{
    const result = await pool.query(`SELECT * FROM bookings`)
    return result;
}

export const bookingServices = {
  createBooking,
  getAllBookings,
};

// "customer_id": 1,
//   "vehicle_id": 2,
//   "rent_start_date": "2024-01-15",
//   "rent_end_date": "2024-01-20"
