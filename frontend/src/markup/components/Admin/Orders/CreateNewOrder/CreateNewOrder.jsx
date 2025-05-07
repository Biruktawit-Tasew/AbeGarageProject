import React, { useState, useEffect, useRef } from "react";

import { useParams, useNavigate, Link, Navigate } from "react-router-dom";

// import the services
import customerService from "../../../../../services/customer.services";
import vehicleService from "../../../../../services/vehicle.services";
import SERVICE from "../../../../../services/service.services";
import Order from "../../../../../services/order.services";

import { FaEdit, FaGlideG } from "react-icons/fa";

// import the useAuth hook
import { useAuth } from "../../../../../Context/AuthContext";

function CreateNewOrder() {
  const navigate = useNavigate();
  const [customer1, setCustomer1] = useState("");
  const [vehicle1, setVehicle1] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [additional_request, setAdditionalRequest] = useState("--");
  const [order_total_price, setTotalServicePrice] = useState("");
  const [notes_for_internal_use, setnotes_for_internal_use] = useState("--");
  const [notes_for_customer, setnotes_for_customer] = useState("-");
  const [order_description, setorder_description] = useState("--");
  const [estimated_completion_date, setestimated_completion_date] =
    useState("--");
  const [completion_date, setcompletion_date] = useState(null);
  const [order_completed, setorder_completed] = useState(0);

  const [serverMsg, setServerMsg] = useState("");

  // get the customer id
  const customer_id = customer1.customer_id;

  // target
  const setAdditionalRequestDom = useRef();
  const totalServicePriceDom = useRef();
  const notes_for_internal_useDom = useRef();
  const notes_for_customerDom = useRef();
  const order_descriptionDom = useRef();
  const estimated_completion_dateDom = useRef();
  const serviceDoms = useRef([]);

  // Additional request tracker
  function additionalRequestTracker() {
    setAdditionalRequest(setAdditionalRequestDom.current.value);
  }

  // total Price tracker
  function totalServicePriceTracker() {
    setTotalServicePrice(totalServicePriceDom.current.value);
  }

  // total Price tracker
  function notes_for_internal_useTracker() {
    setnotes_for_internal_use(notes_for_internal_useDom.current.value);
  }

  // total Price tracker
  function notes_for_customerTracker() {
    setnotes_for_customer(notes_for_customerDom.current.value);
  }

  // total Price tracker
  function order_descriptionTracker() {
    setorder_description(order_descriptionDom.current.value);
  }

  // total Price tracker
  function estimated_completion_dateTracker() {
    setestimated_completion_date(estimated_completion_dateDom.current.value);
  }

  // console.log(estimated_completion_date);

  // console.log(selectedServices, "fff");
  // console.log(customer_id);

  // const order_services = [{ service_id: selectedServices }];
  // console.log(order_services);

  const { customer_hash, vehicle_id } = useParams();

  // // Function to handle service checkbox selection
  // function handleServiceSelect(serviceId, isChecked) {
  //   if (isChecked) {
  //     setSelectedServices([...selectedServices, serviceId]);
  //     // console.log(...selectedServices, "trueee");
  //   } else {
  //     setSelectedServices(
  //       selectedServices.filter((id) => (
  //         console.log(id),

  //         console.log(serviceId),

  //         id !== serviceId
  //       ))
  //     );
  //     // console.log(selectedServices, "flaseee");
  //   }
  // }

  // Function to handle checkbox selection

  const handleServiceSelect = (serviceId, isChecked) => {
    if (isChecked) {
      setSelectedServices([...selectedServices, serviceId]);
    } else {
      setSelectedServices(
        selectedServices.filter(
          (id) =>
            // (console.log(id)), 1,2

            // (console.log(serviceId)), 2

            id !== serviceId
        )
      );
    }
  };
  // console.log(selectedServices)

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();

  const employee_id = employee.employee_id;

  // console.log(employee.employee_id);

  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  //afunction to fetch customer data
  const fetchData1 = async () => {
    // console.log(formData);
    try {
      const data = await customerService?.singleCustomer(
        customer_hash,
        loggedInEmployeeToken
      );

      setCustomer1(data.data.singleCustomer[0]);

      // console.log(checkboxDOM.current.checked);
    } catch (error) {
      console.log(error);
    }
  };

  //afunction to fetch single vehicle data
  const fetchData2 = async () => {
    // console.log(formData);
    try {
      const data = await vehicleService.getSingleVehicle(
        customer_hash,
        vehicle_id,
        loggedInEmployeeToken
      );

      // console.log(data.data.SingleVehicle[0]);
      setVehicle1(data.data.SingleVehicle[0]);

      // console.log(checkboxDOM.current.checked);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch all service data
  async function fetchData3() {
    try {
      const data = await SERVICE.getAllServices(loggedInEmployeeToken);

      // console.log(data.data.services);
      setServices(data.data.services);

      // setVehicleError("");
    } catch (error) {
      console.log(error);
    }
  }

  // call the fetchData in useEffect
  useEffect(() => {
    fetchData1();
    fetchData2();
    fetchData3();
  }, []);

  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const formData = {
      employee_id,
      customer_id,
      vehicle_id,
      order_total_price,
      additional_request,
      notes_for_internal_use,
      notes_for_customer,
      order_description,
      estimated_completion_date,
      completion_date,
      order_completed,
      order_services: selectedServices.map((serviceId) => ({
        service_id: serviceId,
      })),
    };

    // console.log(formData);

    try {
      const data = await Order.addOrder(formData, loggedInEmployeeToken);

      setServerMsg("");

      console.log(data.response, "kjhgf");

      // console.log("ooooooooooooooooooooooobject");

      if (data.statusText == "OK") {
        navigate("/admin/orders");
      }

      // console.log(data.statusText);
    } catch (error) {
      // console.log(error.response.data.error);
      setServerMsg(error.response.data.error);

      setTimeout(() => {
        setServerMsg("");
      }, 2000);
    }
  }

  return (
    <section className="contact-section pb-5 ">
      {/*  */}

      {/*Create New Order 3*/}
      <div className=" ml-5 pb-0  d-flex order-danger ">
        <div className=" ml-4 p-  ">
          <div className="contact-title ">
            <div>
              <h2>Create New Order</h2>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* customer Info */}
      <div className="contact-section pt-0 pb-4">
        <div className="mr-5  ">
          {/* Customer Info */}
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className=" d-flex justify-content-between">
                <h4 className="fw-bold font-weight-bold">
                  <span className=" fw-bold mr-2">
                    {" "}
                    {customer1.customer_first_name}
                  </span>
                  {customer1.customer_last_name}
                  <span></span>
                </h4>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Email :</span>
                <span className="text-secondary">
                  {customer1.customer_email}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">Phone Number:</span>
                <span className="text-secondary">
                  {customer1.customer_phone_number}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Active Customer: </span>
                <span className="text-secondary">
                  {customer1?.active_customer_status ? "Yes" : "No"}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">
                  Edit customer info{" "}
                </span>
                <span>
                  <Link
                    to={`/admin/customer-update/${customer1.customer_hash}`}
                  >
                    <FaEdit color="#081336" />
                  </Link>
                </span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>

      {/* vehicle Info */}
      <div className="contact-section pb-4 pt-0">
        <div className="mr-5">
          {/* Customer Info */}
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className=" d-flex justify-content-between">
                <h4 className="fw-bold font-weight-bold">
                  <span className=" fw-bold mr-2">
                    {" "}
                    {vehicle1.vehicle_model}
                  </span>

                  <span></span>
                </h4>
              </div>

              <div>
                <span className="font-weight-bold mr-2">Vehicle color :</span>
                <span className="text-secondary">{vehicle1.vehicle_color}</span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">Vehicle tag :</span>
                <span className="text-secondary">{vehicle1.vehicle_tag}</span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">Vehicle year :</span>
                <span className="text-secondary">{vehicle1.vehicle_year}</span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">
                  Vehicle mileage :
                </span>
                <span className="text-secondary">
                  {vehicle1.vehicle_mileage}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2 ">Vehicle serial :</span>
                <span className="text-secondary">
                  {vehicle1.vehicle_serial}
                </span>
              </div>

              <div>
                <span className="font-weight-bold mr-2">
                  Edit vehicle info{" "}
                </span>
                <span>
                  <Link to={`/admin/vehicle/edit/${vehicle1.vehicle_id}`}>
                    <FaEdit color="#081336" />
                  </Link>
                </span>
              </div>
            </div>
          </div>{" "}
        </div>
      </div>

      {/* Choose Service  */}
      <form onSubmit={handleSubmit} className="contact-section pt-0 pb-4">
        <div className="mr-5  ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 flex-grow-1 bg-white Regular shadow">
              <div className="contact-title ">
                <div>
                  <h2>Choose Service</h2>{" "}
                </div>

                {services.map((service, i) => (
                  <>
                    <div
                      key={i}
                      className="bg-white Regular shadow my-2 d-flex "
                    >
                      <div className="py-4 pb-1 px-4 flex-grow-1 ">
                        <h5 className="mb-1 font-weight-bold ">
                          {service.service_name}
                        </h5>
                        <h6 className=" mb-1 text-secondary">
                          {service.service_description}
                        </h6>
                      </div>
                      <div className="checkbox-container">
                        <input
                          type="checkbox"
                          //

                          // ref={(el) => {
                          //   // {console.log(el)}
                          //   serviceDoms.current[service.service_id] = el;
                          // }}
                          // ref={serviceDoms}
                          //

                          onChange={
                            (e) =>
                              handleServiceSelect(
                                service.service_id,
                                e.target.checked
                              )

                            // {
                            //   console.log(serviceDoms.current.value);
                            //   console.log(e.target.checked);
                            //   console.log(service.service_id);
                            // }
                          }
                          //

                          // checked={selectedServices.includes(
                          //   service.service_id
                          // )}
                          //

                          className="wide-checkbox"
                          // required
                        />
                      </div>
                      <div className="d-flex align-items-center px-4"></div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Add New Service */}
        <div className="mr-5 mt-4 contact-title ">
          <div className=" ml-5 pb-0  d-flex order-danger ">
            <div className=" ml-4 p-3 px-5 flex-grow-1 bg-white Regular shadow">
              <h2>Additional request</h2>
              <div className="contact-form ">
                <div>
                  <div className="row clearfix">
                    <h3 className="ml-3">Service Description</h3>
                    <div className="form-group col-md-12">
                      <textarea
                        type="text"
                        name="service_description"
                        placeholder="Additional Service Description"
                        ref={setAdditionalRequestDom}
                        onChange={additionalRequestTracker}
                        value={additional_request}
                        required
                      ></textarea>
                    </div>
                    
                    <h3 className="ml-3">Notes For Internal Use</h3>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="wide-checkbox"
                        name="service_name"
                        placeholder="Notes For Internal Use"
                        ref={notes_for_internal_useDom}
                        onChange={notes_for_internal_useTracker}
                        value={notes_for_internal_use}
                        required
                      />
                    </div>

                    <h3 className="ml-3">Notes For Customer</h3>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="wide-checkbox"
                        name="service_name"
                        placeholder="notes_for_customer"
                        ref={notes_for_customerDom}
                        onChange={notes_for_customerTracker}
                        value={notes_for_customer}
                        required
                      />
                    </div>

                    <h3 className="ml-3">Order Description</h3>
                    <div className="form-group col-md-12">
                      <input
                        type="text"
                        className="wide-checkbox"
                        name="service_name"
                        placeholder="order_description"
                        ref={order_descriptionDom}
                        onChange={order_descriptionTracker}
                        value={order_description}
                        required
                      />
                    </div> 

                     <h3 className="ml-3">Estimated Completion Date</h3>
                    <div className="form-group col-md-12">
                      <input
                        type="date"
                        className="p-3 bg-dark white"
                        name="service_name"
                        placeholder="estimated_completion_date"
                        ref={estimated_completion_dateDom}
                        onChange={estimated_completion_dateTracker}
                        value={estimated_completion_date}
                        required
                      />
                    </div> 

                    <h3 className="ml-3">Total Service Price</h3>
                    <div className="form-group col-md-12">
                      <input
                        type="number"
                        className="wide-checkbox"
                        name="service_name"
                        placeholder="Total Service Price"
                        ref={totalServicePriceDom}
                        onChange={totalServicePriceTracker}
                        value={order_total_price}
                        required
                      />
                    </div>

                    <div className="form-group col-md-12 pl-3">
                      <button className="theme-btn btn-style-one" type="submit">
                        <span>ADD SERVICE</span>
                      </button>

                      {serverMsg && (
                        <div
                          className="validation-error"
                          style={{
                            color: "red",
                            fontSize: "100%",
                            fontWeight: "600",
                            padding: "25px",
                          }}
                          role="alert"
                        >
                          {serverMsg}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default CreateNewOrder;
