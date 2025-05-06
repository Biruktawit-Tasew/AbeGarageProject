import React from "react";
import { useEffect, useState } from "react";
import customerService from "../../../services/customer.service";
import { useParams } from "react-router-dom";

function EditCustomerForm() {
  // call the customer service to get customer by id
  const [customers, setCustomers] = useState([]);
  const [customer_email, setEmail] = useState("");
  const [customer_first_name, setFname] = useState("");
  const [customer_last_name, setLname] = useState("");
  const [customer_phone_number, setPhone] = useState("");
  const [active_customer_status, setactive_customer_status] = useState(1);

  const request = useParams();
  console.log(request.customerId);
  const [emailError, setEmailError] = useState("");
  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await customerService.getCustomerById(
        request.customerId
      );
      const data = await response.json();
      console.log(data.customer[0]);
      setCustomers(data.customer[0]);
      setEmail(data.customer[0].customer_email);
      setFname(data.customer[0].customer_first_name);
      setLname(data.customer[0].customer_last_name);
      setPhone(data.customer[0].customer_phone_number);
      setactive_customer_status(data.customer[0].active_customer_status);
    };
    fetchCustomers();
  }, []);
  // log th customer data on the console
  console.log(customers);
  // define the handleSubmit function
  let fullname =
    customers.customer_first_name + " " + customers.customer_last_name;
  // collect the customer data
  const customerData = {
    customer_phone_number: customer_phone_number,
    customer_first_name: customer_first_name,
    customer_last_name: customer_last_name,
    active_customer_status: active_customer_status,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true; // Flag
    // validate firstname and lastname
    if (customer_first_name === "") {
      setEmailError("First name is required");
      return;
    }
    if (customer_last_name === "") {
      setEmailError("Last name is required");
      return;
    }
    if (customer_phone_number === "") {
      setEmailError("Phone number is required");
      return;
    }
    if (customer_phone_number.length < 10) {
      setEmailError("Phone number must be at least 10 digits");
      return;
    }
    if (customer_phone_number.length > 15) {
      setEmailError("Phone number must be at most 15 digits");
      return;
    }
    // If the form is not valid, do not submit
    if (!valid) {
      return;
    }
    // pass the customer data to the updateCustomer function
    const updatedCustomer = customerService.updateCustomer(
      customers.customer_id,
      customerData
    );
    updatedCustomer
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success == "true") {
          alert("Customer updated successfully");
          // reset the form
          setFname("");
          setLname("");
          setPhone("");

          // redirect to the customer list page
          window.location.href = "/admin/customers";
        } else {
          alert("Error updating customer");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error updating customer");
      });
  };
  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title d-flex  align-items-start flex-column ">
          <h2>
            Edit: <span>{fullname}</span>
          </h2>
        </div>
        <div className="row clearfix">
          <div className="mb-4 ">
            <h4 className="" style={{ fontWeight: "800" }}>
              Customer email: {customer_email}
            </h4>
          </div>

          <div className="form-column col-lg-7">
            <div className="inner-column">
              <div className="contact-form">
                <form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer fname"
                        value={customer_first_name}
                        onChange={(event) => setFname(event.target.value)}
                        placeholder="First Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer-lname"
                        value={customer_last_name}
                        onChange={(event) => setLname(event.target.value)}
                        placeholder="Last Name"
                      />
                    </div>

                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        name="customer_"
                        value={customer_phone_number}
                        onChange={(event) => setPhone(event.target.value)}
                        placeholder="Phone Number"
                      />
                    </div>

                    <div className="form-group col-md-12 d-flex  ">
                      <input
                        className=" mr-3"
                        style={{
                          transform: "scale(2.5)",
                          accentColor: "green",
                        }}
                        type="checkbox"
                        checked={active_customer_status == 1}
                        name="customer_"
                        // value={active_customer_status}
                        onChange={(event) =>
                          setactive_customer_status(
                            event.target.checked ? 1 : 0
                          )
                        }
                      />
                      {active_customer_status == 1 ? (
                        <span>Is active customer</span>
                      ) : (
                        <span>Is not active customer</span>
                      )}
                    </div>

                    <div className="form-group col-md-12">
                      <button
                        className="theme-btn btn-style-one"
                        type="submit"
                        data-loading-text="Please wait..."
                      >
                        <span>Update </span>
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

export default EditCustomerForm;
