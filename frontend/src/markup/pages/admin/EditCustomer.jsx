import React from "react";
// Import the AddEmployeeForm component
import EditCustomerForm from "../../components/EditCustomer/EditCustomerForm";
// Import the AdminMenu component
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";

const EditCustomer = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <EditCustomerForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
