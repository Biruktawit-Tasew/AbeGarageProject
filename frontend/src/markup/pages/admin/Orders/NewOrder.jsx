import React from "react";

// import the auth hook context
import { useAuth } from "../../../../Context/AuthContext";

// import the login component
import LoginForm from "../../../components/LoginForm/LoginForm";

// import the admin menu component
import AdminMenu from "../../../components/Admin/AdminMenu/AdminMenu";;

import NewOrder1 from "../../../components/Admin/Orders/NewOrder/NewOrder1";

function NewOrder() {
  const { isLogged, isAdmin } = useAuth();

  // console.log(useAuth())

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
                <NewOrder1 />
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1 style={{ padding: "100px" }}>
            You don't have the Permission to access the page you request!
          </h1>
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

export default NewOrder;
