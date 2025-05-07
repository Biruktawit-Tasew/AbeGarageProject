// import the customer service
const { get } = require("../routes");
const customerService = require("../services/customer.service");

// Create the getAllCustomer controller
async function getAllCustomer(req, res, next) {
  // Call the getAllCustomer method from the customer service
  const customer = await customerService.getAllCustomer();
  console.log(customer);
  if (!customer) {
    res.status(400).json({
      error: "Failed to get all customer!",
    });
  } else {
    res.status(200).json({
      limit: "10",
      customers: customer.map((customer) => ({
        customer_id: customer.customer_id,
        customer_email: customer.customer_email,
        customer_phone_number: customer.customer_phone_number,
        customer_first_name: customer.customer_first_name,
        customer_last_name: customer.customer_last_name,
        customer_hash: customer.customer_hash,
        active_customer_status: customer.active_customer_status,
        customer_added_date: customer.customer_added_date,
      })),
    });
  }
}
// Create the getSingleCustomer controller
async function getSingleCustomer(req, res, next) {
  // Call the getSingleCustomer method from the customer service
  const customer = await customerService.getSingleCustomer(req, res);
  console.log(customer);
  if (customer.length === 0) {
    return res.status(404).json({ message: "Customer not found" });
  }
  if (!customer) {
    res.status(400).json({
      error: "Failed to get single customer!",
    });
  } else {
    res.status(200).json({
      customer: customer.map((customer) => ({
        customer_id: customer.customer_id,
        customer_email: customer.customer_email,
        customer_phone_number: customer.customer_phone_number,
        customer_first_name: customer.customer_first_name,
        customer_last_name: customer.customer_last_name,
        customer_hash: customer.customer_hash,
        active_customer_status: customer.active_customer_status,
        customer_added_date: customer.customer_added_date,
      })),
    });
  }
}
// add customer controller
async function addCustomer(req, res, next) {
  // Call the addCustomer method from the customer service
  const customer = await customerService.addCustomer(req.body);
  console.log(customer);
  if (!customer) {
    res.status(400).json({
      error: "Failed to add customer!",
    });
  } else {
    res.status(200).json({
      success: "true",
      // data: customer,
    });
  }
}
// update customer controller
async function updateCustomer(req, res, next) {
  //get the customer id from the request params
  const customerId = req.params.id;
  // Call the updateCustomer method from the customer service
  const customer = await customerService.updateCustomer(customerId, req.body);
  console.log(customer);
  if (!customer) {
    res.status(400).json({
      error: "Failed to update customer!",
    });
  } else {
    res.status(200).json({
      success: "true",
      // data: customer,
    });
  }
}
module.exports = {
  getAllCustomer,
  getSingleCustomer,
  addCustomer,
  updateCustomer,
};
