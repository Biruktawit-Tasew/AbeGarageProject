// import express module
const express = require("express");
// create router from express module
const router = express.Router();
// Import middleware
const authMiddleware = require("../middlewares/auth.middleware");
// import the employee controller
const employeeController = require("../controllers/employee.controller");

// create a route to handle the add employee request on POST
router.post("/api/employee", employeeController.createEmployee);

// Create a route to handle the get all employees request on GET
router.get(
  "/api/employees",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getAllEmployees
);

// Create a route to handle the get single employee request on GET
router.get(
  "/api/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.getSingleEmployee
);

// Create a route to handle the update employee request on PUT
router.put(
  "/api/employee",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.updateEmployee
);

// Create a route to handle the delete employee request on DELETE
router.delete(
  "/api/employee/:id",
  [authMiddleware.verifyToken, authMiddleware.isAdmin],
  employeeController.deleteEmployee
);

// export the router
module.exports = router;
