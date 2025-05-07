// Import the query function from the db.config.js file
const conn = require("../config/db.config");
// Import the bcryptjs module
const bcryptjs = require("bcryptjs");
//import uuid from the uuid module
const { v4: uuidv4 } = require("uuid");

// A function to get all customers
async function getAllCustomer() {
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id  ORDER BY customer_identifier.customer_id DESC limit 30";
  const rows = await conn.query(query);
  return rows;
}
// A function to get customer by id
async function getSingleCustomer(req, res) {
  const customerId = req.params.id;
  const query =
    "SELECT * FROM customer_identifier INNER JOIN customer_info ON customer_identifier.customer_id = customer_info.customer_id WHERE customer_identifier.customer_id = ?";
  const rows = await conn.query(query, [customerId]);
  return rows;
}
// add a new customer
async function addCustomer(newCustomer) {
  // console.log("meleya",uuidv4());
  const customer_hash = uuidv4();

  // Destructure the newCustomer object
  const {
    customer_email,
    customer_phone_number,
    customer_added_date,
    customer_first_name,
    customer_last_name,
    active_customer_status, // This variable is not used
  } = newCustomer;
  console.log(newCustomer);

  let createdCustomer = ""; // Define createdCustomer outside the try block

  try {
    // Insert the email and phone number into the customer_identifier table
    const query = `
      INSERT INTO customer_identifier (
        customer_email,
        customer_phone_number,
        customer_added_date,
        customer_hash
      ) VALUES (?, ?, ?, ?)
    `;
    const result = await conn.query(query, [
      customer_email,
      customer_phone_number,
      customer_added_date,
      customer_hash,
    ]);

    if (result.affectedRows !== 1) {
      // Consider throwing an error for better error handling
      throw new Error("Failed to insert into customer_identifier");
      // Or, you could return null or a specific error object:
      // return null;
    }

    // Get the customer id from the insert
    const customer_id = result.insertId;
    // console.log("Customer ID:", customer_id);
    // Insert the remaining data into the customer_info table
    const query2 = `
      INSERT INTO customer_info (
        customer_id,
        customer_first_name,
        customer_last_name,active_customer_status
      ) VALUES (?, ?, ?,?)
    `;
    const result2 = await conn.query(query2, [
      customer_id,
      customer_first_name, // Corrected: use customer_first_name
      customer_last_name,
      active_customer_status, // Corrected: use customer_last_name
    ]);

    if (result2.affectedRows !== 1) {
      throw new Error("Failed to insert into customer_info");
    }

    // Construct the customer object to return
    createdCustomer = {
      customer_id: customer_id,
      customer_email: customer_email, //Added these for more complete return
      customer_phone_number: customer_phone_number,
      customer_first_name: customer_first_name,
      customer_last_name: customer_last_name,
    };
  } catch (err) {
    console.error(err); // Use console.error for error logging
  }

  // Return the customer object
  return createdCustomer;
}
// update customer

async function updateCustomer(customerId, updatedcustomer) {
  // get customer id from the request params
  console.log("customerId", customerId);

  const {
    customer_phone_number,
    customer_first_name,
    customer_last_name,
    active_customer_status,
  } = updatedcustomer;
  console.log("meleya", updatedcustomer);

  // Construct the SQL query using placeholders to prevent SQL injection
  const query = `
      UPDATE customer_identifier 
      INNER JOIN customer_info 
        ON customer_identifier.customer_id = customer_info.customer_id
      SET 
        
        customer_identifier.customer_phone_number = ?,
        customer_info.customer_first_name = ?,
        customer_info.customer_last_name = ?,
        customer_info.active_customer_status = ?
        WHERE customer_identifier.customer_id = ?
    `;

  // Execute the query with the provided values as parameters
  const result = await conn.query(query, [
    customer_phone_number,
    customer_first_name,
    customer_last_name,
    active_customer_status,
    customerId, // Use the customerId variable here
    // Use the customerId variable here
  ]);

  // Check if the update was successful
  if (result.affectedRows < 1) {
    // Consider throwing an error for better error handling
    throw new Error("Failed to update customer");
    // Or, you could return null or a specific error object:
    // return null;
  }
  // Construct the updated customer object to return
  const updatedCustomer = {
    customer_id: customerId,
    customer_phone_number: customer_phone_number,
    customer_first_name: customer_first_name,
    customer_last_name: customer_last_name,
    active_customer_status: active_customer_status,
  };
  // Return the updated customer object
  return updatedCustomer;
}
module.exports = {
  getAllCustomer,
  getSingleCustomer,
  addCustomer,
  updateCustomer,
};
