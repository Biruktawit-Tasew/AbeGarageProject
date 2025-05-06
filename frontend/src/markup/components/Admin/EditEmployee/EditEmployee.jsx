import React, { useState, useEffect } from "react";
// import react icons
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
// for getting URL ID and navigation
import { useParams, useNavigate } from "react-router-dom";
//  Import the updateEmployee function from employee service
import employeeService from "../../../../services/employee.service";
// Import the auth hook
import { useAuth } from "../../../../Contexts/AuthContext";

// Create the EditEmployee component
function EditEmployee() {
  // Get employee ID from URL
  const { id } = useParams();
  // For redirecting after successful update
  const navigate = useNavigate();

  // Get logged-in user's token for authorization
  const { employee } = useAuth();
  const token = employee?.employee_token;

  // Store all form fields with initial empty values
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    isActive: false,
  });

  // Loading state for update button
  const [loading, setLoading] = useState(false);
  // Success message after update
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch employee data when component loads or ID/token changes
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        // Call API to get employee details
        const response = await employeeService.getEmployeeById(id, token);
        const data = await response.json();
        // If successful, update form state with employee data
        if (response.ok && data.data) {
          const employee = data.data;
          setFormData({
            email: employee.employee_email,
            firstName: employee.employee_first_name,
            lastName: employee.employee_last_name,
            phone: employee.employee_phone,
            role: employee.company_role_id,
            isActive: employee.active_employee,
          });
        } else {
          console.error("Failed to load employee data");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchEmployee();
  }, [id, token]);

  // Handler For text/select inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  // Handler For checkbox input change
  const handleCheckboxChange = (e) => {
    setFormData((prev) => ({ ...prev, isActive: e.target.checked }));
  };

  // Handler update for Form submission
  const handleUpdate = async () => {
    setLoading(true); // Show loading state
    try {
      //  Send update request to backend
      const response = await employeeService.updateEmployee(
        id,
        formData,
        token
      );
      const result = await response.json();
      //Check if update succeeded
      if (!response.ok) {
        throw new Error(result.error || "Update failed");
      }
      // Show success and redirect
      setSuccessMessage("Employee updated successfully!");
      setTimeout(() => navigate("/admin/employees"), 2000);
    } catch (error) {
      console.error("Update error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Render Section
  return (
    <div className="form-container edit-section">
      {/* Employee Header */}
      <h2 className="form-title">
        <FaUserAlt size={40} /> Editing Employee:{" "}
        {`${formData.firstName}   ${formData.lastName}`}
      </h2>

      {/* Employee email display */}
      <div className="form-group">
        <h5>
          <MdEmail size={40} />{" "}
          <strong>Employee Email: {formData.email}</strong>
        </h5>
      </div>

      {/* Show  success messages */}
      {successMessage && <h3 className="success-message">{successMessage}</h3>}

      {/* Editable Form Fields */}
      <div className="form-group">
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          placeholder="Last Name"
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Employee phone"
        />
      </div>

      <div className="form-group">
        <select name="role" value={formData.role} onChange={handleInputChange}>
          <option value={1}>Employee</option>
          <option value={2}>Manager</option>
          <option value={3}>Admin</option>
        </select>
      </div>
      {/* Active Status Checkbox */}
      <div className="chec-kbox">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleCheckboxChange}
        />
        <p>Is Active Employee</p>
      </div>
      {/* Update Button */}
      <button onClick={handleUpdate} disabled={loading} className="update-btn">
        {loading ? "Updating..." : "UPDATE"}
      </button>
    </div>
  );
}

export default EditEmployee;
