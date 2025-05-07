// Import the employee service
const employeeService = require("../services/employee.service");
// Create the add employee controller
async function createEmployee(req, res, next) {
  // console.log(req.headers);

  // Check if employee email already exists in the database
  const employeeExists = await employeeService.checkIfEmployeeExists(
    req.body.employee_email
  );
  // If employee exists, send a response to the client
  if (employeeExists) {
    res.status(400).json({
      error: "This email address is already associated with another employee!",
    });
  } else {
    try {
      const employeeData = req.body;
      // Create the employee
      const employee = await employeeService.createEmployee(employeeData);
      if (!employee) {
        res.status(400).json({
          error: "Failed to add the employee!",
        });
      } else {
        res.status(200).json({
          status: "true",
        });
      }
    } catch (error) {
      console.log(err);
      res.status(400).json({
        error: "Something went wrong!",
      });
    }
  }
}
// Create the getAllEmployees controller
async function getAllEmployees(req, res, next) {
  // Call the getAllEmployees method from the employee service
  const employees = await employeeService.getAllEmployees();
  // console.log(employees);
  if (!employees) {
    res.status(400).json({
      error: "Failed to get all employees!",
    });
  } else {
    res.status(200).json({
      status: "success",
      data: employees,
    });
  }
}

// Create the getSingleEmployee controller
const getSingleEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    // Call the getSingleEmployee method from the employee service
    const employee = await employeeService.getSingleEmployee(employeeId);
    if (!employee) {
      res.status(404).json({
        error: "Employee not found!",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: employee,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
};

// Create the updateEmployee controller
const updateEmployee = async (req, res) => {
  try {
    // Debug: log the incoming request body
    console.log("Incoming update data:", req.body);

    // Ensure we're passing the complete req.body
    const updated = await employeeService.updateEmployee(req.body);

    if (!updated) {
      return res.status(400).json({
        error: "No database rows were updated",
      });
    }

    res.status(200).json({ status: "Update successful" });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({
      error: "Database operation failed",
      details: error.message,
    });
  }
};

// Create the deleteEmployee controller
const deleteEmployee = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    // Call the deleteEmployee method from the employee service
    const deletedEmployee = await employeeService.deleteEmployee(employeeId);
    if (!deletedEmployee) {
      res.status(400).json({
        error: "Failed to delete employee!",
      });
    } else {
      res.status(200).json({
        status: "Employee deleted successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: "Something went wrong!",
    });
  }
};

// Export the createEmployee controller
module.exports = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
