import React, {useEffect, useState} from 'react'
// import customer service file

// Import the AdminMenu component
import AdminMenu from '../../components/Admin/AdminMenu/AdminMenu';
import EditCustomerForm from "../../components/EditCustomer/EditCustomerForm"

// import { useParams } from 'react-router-dom';


function EditCustomer() {
   
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
}

export default EditCustomer;
