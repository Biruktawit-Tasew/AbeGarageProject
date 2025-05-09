import React from "react";
import CustomerTable from "../../components/Admin/Customer/CustomerTable";
// import EditCustomer from "../../components/Admin/EditCustomer/EditCustomer";
import AdminMenu from "../../components/Admin/AdminMenu/AdminMenu";
const Customers = () => {
  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <AdminMenu />
          </div>
          <div className="col-md-9 admin-right-side">
            <CustomerTable />
           
          </div>
        </div>
      </div>
    </div>
  );
}

export default Customers; 