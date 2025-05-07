const api_url = "http://localhost:8000";

async function createCustomer(formData) {
  console.log(formData);
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(`${api_url}/api/customer`, requestOptions);
  console.log(response);
  return response;
}
async function getCustomerById(customerId) {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(
    `${api_url}/api/customer/${customerId}`,
    requestOptions
  );
  return response;
}
async function getAllCustomers() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(`${api_url}/api/customers`, requestOptions);
  return response;
}
async function updateCustomer(customerId, formData) {
  console.log(formData);
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };
  const response = await fetch(
    `${api_url}/api/customer/${customerId}`,
    requestOptions
  );
  console.log(response);
  return response;
}

// export all functions
export default {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
};
