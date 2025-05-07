import React from "react";

// import the auth hook context
import { useAuth } from "../../../../Context/AuthContext";

// import the login component
import LoginForm from "../../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";;

import OrderDetail from "../../../components/Admin/Orders/OrderDetail/OrderDetail";

function OrderDetails() {
  const { isLogged, isAdmin } = useAuth();

  return (
    <div>
      <div className="container-fluid admin-pages">
        <div className="row">
          {isLogged ? (
            <div className="col-md-3 admin-left-side">
              <AdminMenu />
            </div>
          ) : null}

          <div
            className={`${
              isLogged ? "col-md-9" : "col-md-12"
            } admin-right-side`}>
            <OrderDetail />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
