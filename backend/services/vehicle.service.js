const db = require("../config/db.config");

// Check if a vehicle exists
async function checkIfVehicleExists(vehicle_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  const rows = await db.query(query, [vehicle_id]);
  return rows.length > 0;
}

// Add a new vehicle
async function addVehicle(vehicleData) {
  const query = `
        INSERT INTO customer_vehicle_info 
        (customer_id, vehicle_year, vehicle_make, vehicle_model, vehicle_type, vehicle_mileage, vehicle_tag, vehicle_serial, vehicle_color)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  const rows = await db.query(query, Object.values(vehicleData));
  return rows.insertId;
}

// Get vehicle by ID
async function getVehicleById(vehicle_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?";
  return await db.query(query, [vehicle_id]);
}

// Update vehicle details

async function updateVehicle(vehicleData) {
  let query = "UPDATE customer_vehicle_info SET ";
  let fields = [];
  let values = [];

  if (vehicleData.vehicle_year !== undefined) {
    fields.push("vehicle_year = ?");
    values.push(vehicleData.vehicle_year);
  }
  if (vehicleData.vehicle_make !== undefined) {
    fields.push("vehicle_make = ?");
    values.push(vehicleData.vehicle_make);
  }
  if (vehicleData.vehicle_model !== undefined) {
    fields.push("vehicle_model = ?");
    values.push(vehicleData.vehicle_model);
  }
  if (vehicleData.vehicle_type !== undefined) {
    fields.push("vehicle_type = ?");
    values.push(vehicleData.vehicle_type);
  }
  if (vehicleData.vehicle_mileage !== undefined) {
    fields.push("vehicle_mileage = ?");
    values.push(vehicleData.vehicle_mileage);
  }
  if (vehicleData.vehicle_tag !== undefined) {
    fields.push("vehicle_tag = ?");
    values.push(vehicleData.vehicle_tag);
  }
  if (vehicleData.vehicle_serial !== undefined) {
    fields.push("vehicle_serial = ?");
    values.push(vehicleData.vehicle_serial);
  }
  if (vehicleData.vehicle_color !== undefined) {
    fields.push("vehicle_color = ?");
    values.push(vehicleData.vehicle_color);
  }

  if (fields.length === 0) {
    return false; // No valid fields to update
  }

  query += fields.join(", ") + " WHERE vehicle_id = ?";
  values.push(vehicleData.vehicle_id);

  console.log("Executing Query:", query, values); // Debugging

  const result = await db.query(query, values);
  return result.affectedRows > 0;
}

// Get all vehicles for a customer

async function getVehiclesByCustomer(customer_id) {
  const query = "SELECT * FROM customer_vehicle_info WHERE customer_id = ?";
  return await db.query(query, [customer_id]);
}

module.exports = {
  checkIfVehicleExists,
  addVehicle,
  getVehicleById,
  updateVehicle,
  getVehiclesByCustomer,
};
