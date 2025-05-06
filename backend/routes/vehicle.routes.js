const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Route to add a new vehicle
router.post(
  "/api/vehicle",
  [authMiddleware.verifyToken],
  vehicleController.addVehicle
);

// Route to get a single vehicle
router.get(
  "/api/vehicle/:id",
  [authMiddleware.verifyToken],
  vehicleController.getVehicleById
);

// Route to update a vehicle
router.put(
  "/api/vehicle",
  [authMiddleware.verifyToken],
  vehicleController.updateVehicle
);

// Route to get all vehicles for a customer
router.get(
  "/api/vehicles/:customer_id",
  [authMiddleware.verifyToken],
  vehicleController.getVehiclesByCustomer
);

module.exports = router;
