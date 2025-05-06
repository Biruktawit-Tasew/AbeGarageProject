//import { useState } from 'react';
import React, { useState } from "react";
// Import the customer service
import customerService from "../../../../services/customer.service";

function AddCustomerForm() {
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFname] = useState("");
  const [customer_last_name, setLname] = useState("");
  const [customer_phone_number, setPhone] = useState("");
  const [active_customer_status, setactive_customer_status] = useState(1);
  const [emailError, setEmailError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [serverError, setServerError] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle client side validations here
    let valid = true; // Flag
    // first name validation
    if (!customer_first_name) {
      setFnameError("Please enter your first name");
      valid = false;
    } else if (customer_first_name.length < 3) {
      setFnameError("First name must be at least 3 characters long");
      valid = false;
    } else {
      setFnameError("");
    }
    // last name validation
    if (!customer_last_name) {
      setLnameError("Please enter your last name");
      valid = false;
    } else if (customer_last_name.length < 3) {
      setLnameError("Last name must be at least 3 characters long");
      valid = false;
    } else {
      setLnameError("");
    }
    // email validation
    if (!customer_email) {
      setEmailError("Please enter your email address first");
      valid = false;
    } else if (!customer_email.includes("@")) {
      setEmailError("Invalid email format");
    } else {
      const regex = /^\S+@\S+\.\S+$/;
      if (!regex.test(customer_email)) {
        setEmailError("Invalid email format");
        valid = false;
      } else {
        setEmailError("");
      }
    }
    // phone number validation
    if (!customer_phone_number) {
      setPhoneError("Please enter your phone number");
      valid = false;
    } else if (customer_phone_number.length < 10) {
      setPhoneError("Phone number must be at least 10 characters long");
      valid = false;
    } else {
      setPhoneError("");
    }

    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    function getCurrentDateFormatted() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed, so add 1
      const day = String(today.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const currentDate = getCurrentDateFormatted();
    console.log(currentDate); // Output: 2025-04-30 (based on the current date)

    const customer_added_date = currentDate;
    const formData = {
      customer_email,
      customer_first_name,
      customer_last_name,
      customer_phone_number,
      active_customer_status,
      customer_added_date,
    };
    // If the form is not valid, do not submit
    const newCustomer = customerService.createCustomer(formData);
    newCustomer
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == "true") {
          // Show a success message
          setServerError("Customer added successfully");
          // Reset the form
          setEmail("");
          setFname("");
          setLname("");
          setPhone("");
          
        } else {
          // Show an error message
          setServerError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setServerError("An error occurred while adding the customer");
      });
  };
  return (
    <section className="contact-section">
      <div className="auto-container d-flex flex-column justify-content-center align-items-start">
        <div className="contact-title">
          <h2>Add New Customer</h2>
        </div>
        {serverError && (
          <div>
            {serverError}
          </div>
        )}
        
        <div className="row clearfix">
          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="email"
                        name="customer_email"
                        value={customer_email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="Email"
                      />
                    </div>
                    {emailError && (
                      <div className="validation-error" role="alert">
                        {emailError}
                      </div>
                    )}
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer fname"
                        value={customer_first_name}
                        onChange={(event) => setFname(event.target.value)}
                        placeholder="First Name"
                      />
                    </div>
                    {fnameError && (
                      <div className="validation-error" role="alert">
                        {fnameError}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer-lname"
                        value={customer_last_name}
                        onChange={(event) => setLname(event.target.value)}
                        placeholder="Last Name"
                      />
                    </div>
                    {lnameError && (
                      <div className="validation-error" role="alert">
                        {lnameError}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_"
                        value={customer_phone_number}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Phone Number"
                      />
                    </div>
                    {phoneError && (
                      <div className="validation-error" role="alert">
                        {phoneError}
                      </div>
                    )}

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Add Customer</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddCustomerForm

