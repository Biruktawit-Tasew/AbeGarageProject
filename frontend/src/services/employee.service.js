// Access environment variable for API URL
//const api_url = import.meta.env.VITE_API_URL;
const api_url = "http://localhost:8000"
// A function to send post request to create a new employee
import axios from "../axiosConfig";

// A function to send post request to create a new employee
async function createEmployee(formData, loggedInEmployeeToken) {
  // define your headers
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.post("/api/employee", formData, { headers });

  return data;
}

// A function to send get request to get all employees
async function getAllEmployees(token) {
  const headers = {
    "x-access-token": token,
  };

  const data = await axios.get("/api/employees", { headers });

  return data;
}

// A function to employee update request
async function updateEmployee(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };

  const data = await axios.put("/api/employee/update", formData, { headers });

  // console.log(data);

  return data;
}

// a function to get single employee
async function singleEmployee(formData, loggedInEmployeeToken) {
  const headers = {
    "x-access-token": loggedInEmployeeToken,
  };
  // console.log(formData);
  const data = await axios.get(`/api/employee/single/${formData}`, { headers });

  // console.log(data);

  return data;
}

const employeeService = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  singleEmployee,
};

export default employeeService;
