import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the EditEmployeeForm component
import EditEmployee from "../../components/Admin/EditEmployee/EditEmployee";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import Unauthorized Page
import Unauthorized from "../../pages/Unauthorized";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  // Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();
  const { id } = useParams();
  console.log("Employee ID:", id);
  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side">
                <EditEmployee />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Unauthorized />
        </div>
      );
    }
  } else {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
};

export default UpdateEmployee;
