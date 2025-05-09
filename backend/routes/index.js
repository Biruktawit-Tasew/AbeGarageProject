// Import the express module
const express = require("express");
// Call the router method from express to create the router
const router = express.Router();
// Import the install router
const installRouter = require("./install.routes");
// Import the employee routes
const employeeRoutes = require("./employee.routes");

// Import the login routes
const loginRoutes = require("./login.routes");
// Import the vechile routes
const vehicleRoutes = require("./vehicle.routes");
// Import Service Routes
const serviceRoutes = require("./service.routes");

// Import the login routes
//import the customer routes
const customerRouter = require("./customer.routes");
// Add the install router to the main router
router.use(installRouter);
// Add the employee routes to the main router
//order routes
const orderRoutes = require("./order.routes");

// Add the vehicle routes to the main router
router.use(vehicleRoutes);
// Add the order routes to the main router
router.use(orderRoutes);
// Add the Service Routes to the main router
router.use("/api", serviceRoutes);
// Add the login routes to the main router
router.use(loginRoutes);
// Add the employee routes to the main router
router.use(employeeRoutes);

// Add the customer routes to the main router
router.use(customerRouter);
// Export the router
module.exports = router;
