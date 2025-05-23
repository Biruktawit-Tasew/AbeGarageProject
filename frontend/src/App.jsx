// Import react
import React from "react";
// Import the Routes and Route components from react-router
import { Routes, Route } from "react-router";
// Import the page components
import Home from "./markup/pages/Home";
import Login from "./markup/pages/Login";
import AddEmployee from "./markup/pages/admin/AddEmployee";
import UpdateEmployee from "./markup/pages/admin/UpdateEmployee";
// import Unauthorized from "./markup/pages/Unauthorized";
// Import the Orders and Customers components
import Orders from "./markup/pages/admin/Orders/Orders";
import Customers from "./markup/pages/admin/Customers";
import AddCustomer from "./markup/pages/admin/AddCustomer";
import EditCustomer from "./markup/pages/admin/EditCustomer";
// Import the Employees component
import Employees from "./markup/pages/admin/Employees";
// Import Service for the admin page
import Services from "./markup/pages/admin/Services";
// Import 404 component;

import NotFound from "./markup/pages/404";
// Import the css files
import "./assets/template_assets/css/bootstrap.css";
import "./assets/template_assets/css/style.css";
import "./assets/template_assets/css/responsive.css";
import "./assets/template_assets/css/color.css";

// Import the custom css file
import "./assets/styles/custom.css";

// Import the Header component
import Header from "./markup/components/Header/Header";
// Import the Footer component
import Footer from "./markup/components/Footer/Footer";

// Import the PrivateAuthRoute component
import PrivateAuthRoute from "./markup/components/Auth/PrivateAuthRoute";
import Admin from "./markup/pages/admin/Admin";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/unauthorized" element={<Unauthorized />} /> */}
        {/* // Add the Orders Route  */}
        <Route
          path="/admin/orders"
          element={
            <PrivateAuthRoute roles={[1, 2, 3]}>
              <Orders />
            </PrivateAuthRoute>
          }
        />
        {/* // Add the Customers Route  */}
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/admin/customers"
          element={
            <PrivateAuthRoute roles={[2, 3]}>
              <Customers />
            </PrivateAuthRoute>
          }
        />

        <Route
          path="/admin/add-customer"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddCustomer />
            </PrivateAuthRoute>
          }
        />
        <Route
          path="/admin/edit-customer/:customerId"
          element={
            <PrivateAuthRoute roles={[3]}>
              <EditCustomer />
            </PrivateAuthRoute>
          }
        />
        {/* Add service Route for public  */}
        {/* <Route path="/services" element={<Service />} /> */}
        {/* Add service Route for the Admin  */}
        <Route path="/admin/services" element={<Services />} />
        {/* // Add the Employees Route  */}
        <Route path="/admin/employees" element={<Employees />} />
        <Route
          path="/admin/add-employee"
          element={
            <PrivateAuthRoute roles={[3]}>
              <AddEmployee />
            </PrivateAuthRoute>
          }
        />
        <Route path="/admin/employee/edit/:id" element={<UpdateEmployee />} />
        {/*         
          Customers (/admin/customers) - managers and admins
          Orders (/admin/orders) - Can be accessed by all employees
          Add employee (/admin/add-employee) - admins only 
            - Admin: 3 
            - Manager: 2 
            - Employee: 1 
        */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
