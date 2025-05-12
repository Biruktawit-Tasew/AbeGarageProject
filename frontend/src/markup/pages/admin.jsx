import React from "react";
// Import the AddEmployeeForm component
import adminDashboard from "../../components/Admin/adminDashboard/adminDashboard";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const AddEmployee = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <adminDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
