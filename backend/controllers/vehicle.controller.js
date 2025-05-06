const vehicleService = require("../services/vehicle.service");

// Add a vehicle
async function addVehicle(req, res) {
  try {
    const vehicleData = req.body;
    const vehicleId = await vehicleService.addVehicle(vehicleData);
    res.status(200).json({ success: "true", vehicle_id: vehicleId });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to add the vehicle!" });
  }
}

// Get vehicle by ID
async function getVehicleById(req, res) {
  try {
    const vehicleId = req.params.id;
    const vehicle = await vehicleService.getVehicleById(vehicleId);
    if (!vehicle.length) {
      res.status(404).json({ error: "Vehicle not found!" });
    } else {
      res.status(200).json({ status: "success", data: vehicle[0] });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Something went wrong!" });
  }
}

// Update a vehicle
async function updateVehicle(req, res) {
  try {
    const vehicleData = req.body;
    const vehicleExists = await vehicleService.checkIfVehicleExists(
      vehicleData.vehicle_id
    );

    if (!vehicleExists) {
      res.status(404).json({ error: "Vehicle not found!" });
    } else {
      await vehicleService.updateVehicle(vehicleData);
      res.status(200).json({ success: "true" });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to update vehicle!" });
  }
}

// Get vehicles by customer
async function getVehiclesByCustomer(req, res) {
  try {
    const customerId = req.params.customer_id;
    const vehicles = await vehicleService.getVehiclesByCustomer(customerId);
    res.status(200).json({ success: "true", data: vehicles });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Failed to fetch vehicles!" });
  }
}

module.exports = {
  addVehicle,
  getVehicleById,
  updateVehicle,
  getVehiclesByCustomer,
};
