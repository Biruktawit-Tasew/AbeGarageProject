// Access environment variable for API URL
const api_url = import.meta.env.VITE_API_URL;

// A function to send post request to create a new employee
const createEmployee = async (formData, loggedInEmployeeToken) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${loggedInEmployeeToken}`,
    },
    body: JSON.stringify(formData),
  };
  console.log(requestOptions);
  const response = await fetch(`${api_url}/api/employee`, requestOptions);
  return response;
};

// A function to get employee by ID
const getEmployeeById = async (employeeId, token) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${api_url}/api/employee/${employeeId}`,
    requestOptions
  );
  return response;
};

// A function to send PUT request to update an employee
const updateEmployee = async (employeeId, formData, token) => {
  // Transform frontend data to match backend expectations
  const requestData = {
    employee_id: parseInt(employeeId),
    employee_email: formData.email,
    employee_first_name: formData.firstName,
    employee_last_name: formData.lastName,
    employee_phone: formData.phone,
    company_role_id: parseInt(formData.role),
    active_employee: formData.isActive ? 1 : 0,
  };
  //Make API request
  const response = await fetch(`${api_url}/api/employee`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestData), // send as json
  });
  return response;
};

// A function to send get request to get all employees
const getAllEmployees = async (token) => {
  // console.log(token);
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "x-access-token": token,
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(`${api_url}/api/employees`, requestOptions);
  return response;
};

// A function to delete an employee
const deleteEmployee = async (employeeId, token) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await fetch(
    `${api_url}/api/employee/${employeeId}`,
    requestOptions
  );
  return response;
};

// Export all the functions
const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  getEmployeeById,
  deleteEmployee,
};
export default employeeService;
