// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the employee controller
const customerController = require("../controllers/customer.controller");
// Import middleware
// const authMiddleware = require("../middlewares/auth.middleware");

// Create a route to handle the get all customer request on get
router.get("/api/customers", customerController.getAllCustomer);
// create a route to handle the get single customer request on get
router.get("/api/customer/:id", customerController.getSingleCustomer);
// Create a route to handle the add customer request on post
router.post("/api/customer", customerController.addCustomer);
// Create a route to handle the update customer request on put
router.put("/api/customer/:id", customerController.updateCustomer);
// Export the router
module.exports = router;
