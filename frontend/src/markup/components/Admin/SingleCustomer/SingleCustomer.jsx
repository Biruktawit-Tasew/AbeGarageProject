import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleCustomer.css";
import customerService from "../../../services/customer.service";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { Link } from "react-router-dom";

const SingleCustomer = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);

  //   useEffect(() => {
  //     fetch(`http://localhost:2026/api/customers/25`)
  //       .then((res) => res.json())
  //       .then((data) => setCustomer(data))
  //       .catch((err) => console.error("Failed to fetch customer:", err));
  //   }, [customerId]);

  const request = useParams();
  console.log(request.customerId);

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await customerService.getCustomerById(
        request.customerId
      );
      const data = await response.json();
      console.log(data.customer[0]);
      setCustomer(data.customer[0]);
      setEmail(data.customer[0].customer_email);
      setFname(data.customer[0].customer_first_name);
      setLname(data.customer[0].customer_last_name);
      setPhone(data.customer[0].customer_phone_number);
    };
    fetchCustomers();
  }, []);
  if (!customer) {
    return (
      <div classNameName="p-6 text-gray-600">Loading customer data...</div>
    );
  }

  const fullName = `${customer.customer_first_name} ${customer.customer_last_name}`;

  return (
    <section classNameName="single-customer">
      <div className="container">
        <div className="sidebar">
          <div className="circle">Info</div>
          <div className="line"></div>
          <div className="circle">Cars</div>
          <div className="line"></div>
          <div className="circle">Orders</div>
        </div>

        <div className="content  d-flex align-items-start flex-column w-100">
          <div className="info d-flex align-items-start flex-column w-100">
            <h2>Customer: {fullName}</h2>
            <p>
              <span className="label">Email:</span> {customer.customer_email}
            </p>
            <p>
              <span className="label ">Phone Number:</span>{" "}
              {customer.customer_phone_number}
            </p>
            <p>
              <span className="label ">Active Customer:</span>{" "}
              {customer.customer_active ? "Yes" : "No"}
            </p>
            <p className="bg-light">
              <span className="label">Edit customer info:</span>{" "}
              <Link to={`/admin/edit-customer/${customer.customer_id}`}>
                <EditSquareIcon
                  sx={{ color: "red", backgroundColor: "white" }}
                />{" "}
              </Link>
            </p>
          </div>

          <div className="vehicles w-100 d-flex flex-column align-items-start">
            <h2>Vehicles of {customer.customer_first_name} </h2>
            <div className="vehicle-box placeholder d-flex flex-column align-items-start  w-100">
              No vehicle found
            </div>
            <button className="add-button d-flex align-items-start ">
              ADD NEW VEHICLE
            </button>
          </div>

          <div className="orders d-flex flex-column align-items-start w-100">
            <h2>Orders of {customer.customer_first_name}</h2>
            <div className="order-box placeholder d-flex flex-column align-items-start w-100">
              Orders will be displayed here
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCustomer;
