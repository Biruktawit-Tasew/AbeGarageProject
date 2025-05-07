// Import the query function from the db.config.js file
const db = require("../config/db.config");
// Import the bcrypt module
const bcrypt = require("bcrypt");
// A function to check if employee exists in the database
async function checkIfEmployeeExists(email) {
  const query = "SELECT * FROM employee WHERE employee_email = ? ";
  const rows = await db.query(query, [email]);
  console.log(rows);
  if (rows.length > 0) {
    return true;
  }
  return false;
}

// A function to create a new employee
async function createEmployee(employee) {
  let createdEmployee = {};
  try {
    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);
    // Insert the email in to the employee table
    const query =
      "INSERT INTO employee (employee_email, active_employee) VALUES (?, ?)";
    const rows = await db.query(query, [
      employee.employee_email,
      employee.active_employee,
    ]);
    console.log(rows);
    if (rows.affectedRows !== 1) {
      return false;
    }
    // Get the employee id from the insert
    const employee_id = rows.insertId;
    // Insert the remaining data in to the employee_info, employee_pass, and employee_role tables
    const query2 =
      "INSERT INTO employee_info (employee_id, employee_first_name, employee_last_name, employee_phone) VALUES (?, ?, ?, ?)";
    const rows2 = await db.query(query2, [
      employee_id,
      employee.employee_first_name,
      employee.employee_last_name,
      employee.employee_phone,
    ]);
    const query3 =
      "INSERT INTO employee_pass (employee_id, employee_password_hashed) VALUES (?, ?)";
    const rows3 = await db.query(query3, [employee_id, hashedPassword]);
    const query4 =
      "INSERT INTO employee_role (employee_id, company_role_id) VALUES (?, ?)";
    const rows4 = await db.query(query4, [
      employee_id,
      employee.company_role_id,
    ]);
    // construct to the employee object to return
    createdEmployee = {
      employee_id: employee_id,
    };
  } catch (err) {
    console.log(err);
  }
  // Return the employee object
  return createdEmployee;
}

// A function to get employee by email
async function getEmployeeByEmail(employee_email) {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_pass ON employee.employee_id = employee_pass.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id WHERE employee.employee_email = ?";
  const rows = await db.query(query, [employee_email]);
  return rows;
}

// A function to get all employees
async function getAllEmployees() {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id ORDER BY employee.employee_id DESC limit 10";
  const rows = await db.query(query);
  return rows;
}

// A function to get single employee by ID
const getSingleEmployee = async (employeeId) => {
  const query =
    "SELECT * FROM employee INNER JOIN employee_info ON employee.employee_id = employee_info.employee_id INNER JOIN employee_role ON employee.employee_id = employee_role.employee_id INNER JOIN company_roles ON employee_role.company_role_id = company_roles.company_role_id WHERE employee.employee_id = ?";
  const rows = await db.query(query, [employeeId]);
  if (rows.length > 0) {
    return rows[0];
  }
  return false;
};

// A function to update employee
const updateEmployee = async (employeeData) => {
  try {
    console.log("Updating employee:", employeeData); // Add logging

    // Update employee basic info
    const query1 =
      "UPDATE employee SET active_employee = ? WHERE employee_id = ?";
    await db.query(query1, [
      employeeData.active_employee,
      employeeData.employee_id,
    ]);

    // Update employee info
    const query2 =
      "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?";
    await db.query(query2, [
      employeeData.employee_first_name,
      employeeData.employee_last_name,
      employeeData.employee_phone,
      employeeData.employee_id,
    ]);

    // Update employee role
    const query3 =
      "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?";
    await db.query(query3, [
      employeeData.company_role_id,
      employeeData.employee_id,
    ]);

    return true;
  } catch (error) {
    console.error("Database error:", error);
    return false;
  }
};

// A function to delete employee
const deleteEmployee = async (employeeId) => {
  try {
    // Note: In a real application, we might want to soft delete instead of hard delete
    // Also, we might need to delete from multiple tables or handle foreign key constraints

    // First, delete from employee_pass
    await db.query("DELETE FROM employee_pass WHERE employee_id = ?", [
      employeeId,
    ]);

    // Then delete from employee_role
    await db.query("DELETE FROM employee_role WHERE employee_id = ?", [
      employeeId,
    ]);

    // Then delete from employee_info
    await db.query("DELETE FROM employee_info WHERE employee_id = ?", [
      employeeId,
    ]);

    // Finally delete from employee
    const result = await db.query(
      "DELETE FROM employee WHERE employee_id = ?",
      [employeeId]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// Export the functions for use in the controller
module.exports = {
  checkIfEmployeeExists,
  createEmployee,
  getEmployeeByEmail,
  getAllEmployees,
  getSingleEmployee,
  updateEmployee,
  deleteEmployee,
};
