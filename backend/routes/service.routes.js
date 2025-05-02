const express = require("express");
const router = express.Router();
const serviceController = require("../controllers/service.controller");

// Route to get all services
router.get("/services", serviceController.getAllServices);

// Route to get a single service by ID
router.get("/service/:id", serviceController.getSingleService);

// Route to create a new service
router.post("/service", serviceController.createService);

// Route to update a service
router.put("/service/:id", serviceController.updateService);

module.exports = router;
