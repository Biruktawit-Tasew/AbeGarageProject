import React from "react";
// Import the auth hook
import { useAuth } from "../../../Contexts/AuthContext";
// Import the login form component
import LoginForm from "../../components/LoginForm/LoginForm";
// Import the admin menu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
// Import the EmployeesList component
import EmployeesList from "../../components/Admin/EmployeesList/EmployeesList";
// Import Unauthorized page
import Unauthorized from "../../pages/Unauthorized";

function Employees() {
  // Destructure the auth hook
  const { isLogged, isAdmin } = useAuth();

  if (isLogged) {
    if (isAdmin) {
      return (
        <div>
          <div className="container-fluid admin-pages section-main">
            <div className="row Row">
              <div className="col-md-3 admin-left-side">
                <AdminMenu />
              </div>
              <div className="col-md-9 admin-right-side right">
                <EmployeesList />
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
}

export default Employees;
