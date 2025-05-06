// Import the necessary components
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
// import react icons
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";
// Import the date-fns library to properly format the date on the table
import { format } from "date-fns";
// Import the getAllEmployees function
import employeeService from "../../../../services/employee.service";
// Import the pagination CSS
import { Link } from "react-router-dom";

// Create the EmployeesList component
const EmployeesList = () => {
  // Create all the states we need to store the data
  // Create the employees state to store the employees data
  const [employees, setEmployees] = useState([]);
  // A state to serve as a flag to show the error message
  const [apiError, setApiError] = useState(false);
  // A state to store the error message
  const [apiErrorMessage, setApiErrorMessage] = useState(null);
  // To get the logged in employee token
  const { employee } = useAuth();
  let token = null; // To store the token
  if (employee) {
    token = employee.employee_token;
  }

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  // Number of employees to display per page
  const employeesPerPage = 6;

  // Calculate the current employees to display
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );
  const totalPages = Math.ceil(employees.length / employeesPerPage); // Total pages

  useEffect(() => {
    // Call the getAllEmployees function from employee service
    const allEmployees = employeeService.getAllEmployees(token);
    allEmployees
      .then((res) => {
        if (!res.ok) {
          // console.log(res.status);
          setApiError(true);
          if (res.status === 401) {
            setApiErrorMessage("Please login again");
          } else if (res.status === 403) {
            setApiErrorMessage("You are not authorized to view this page");
          } else {
            setApiErrorMessage("Please try again later");
          }
        }
        return res.json();
      })
      .then((response) => {
        console.log(response);
        if (response.data && response.data.length !== 0) {
          setEmployees(response.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Function to handle edit click
  const handleEditClick = (employeeId) => {
    // Navigate to edit page with employee ID
    window.location.href = `/admin/employee/edit/${employeeId}`;
  };

  // Function to handle delete confirmation
  const handleDeleteClick = (employeeId) => {
    if (window.confirm("Are you sure to delete this employee?")) {
      // Call delete API
      employeeService
        .deleteEmployee(employeeId, token)
        .then((res) => {
          if (res.ok) {
            alert("Delete successfully");
            // Refresh employee list
            setEmployees(
              employees.filter((emp) => emp.employee_id !== employeeId)
            );
          } else {
            throw new Error("Delete failed");
          }
        })
        .catch((err) => {
          console.error("Delete error:", err);
          alert("Error deleting employee");
        });
    }
  };

  return (
    <>
      {apiError ? (
        <section className="contact-section">
          <div className="auto-container">
            <div className="contact-title">
              <h2>{apiErrorMessage}</h2>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="contact-section employees">
            <div className="auto-container table-container">
              <div className="contact-title employees-title">
                <h2>Employees</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Active</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Added Date</th>
                    <th>Role</th>
                    <th>Edit/Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((employee) => (
                    <tr key={employee.employee_id}>
                      <td>{employee.active_employee ? "Yes" : "No"}</td>
                      <td>{employee.employee_first_name}</td>
                      <td>{employee.employee_last_name}</td>
                      <td>{employee.employee_email}</td>
                      <td>{employee.employee_phone}</td>
                      <td>
                        {format(
                          new Date(employee.added_date),
                          "MM - dd - yyyy | kk:mm"
                        )}
                      </td>
                      <td>{employee.company_role_name}</td>
                      <td>
                        <div className="edit-delete-icons">
                          <FaEdit
                            onClick={() =>
                              handleEditClick(employee.employee_id)
                            }
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          />
                          |{" "}
                          <MdDelete
                            onClick={() =>
                              handleDeleteClick(employee.employee_id)
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

// Export the EmployeesList component
export default EmployeesList;
