import React, { useRef, useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";

// import employee service
import vehicleService from "../../../../../services/vehicle.services";

// import the useAuth hook
import { useAuth } from "../../../../../Context/AuthContext";

// import react router dom
import { useParams, useNavigate } from "react-router-dom";

function EditVehicleForm() {
  const navigate = useNavigate();
  const [vehicle_year, setVehicleYear] = useState("");
  const [vehicle_make, setVehicleMake] = useState("");
  const [vehicle_model, setVehicleModel] = useState("");
  const [vehicle_type, setVehicleType] = useState("");
  const [vehicle_mileage, setVehicleMileage] = useState("");
  const [vehicle_tag, setVehicleTag] = useState("");
  const [vehicle_serial, setVehicleSerial] = useState("");
  const [vehicle_color, setVehicleColor] = useState("");

  const { customer_hash, vehicle_id } = useParams();

  // traget
  const vehicleYearDom = useRef();
  const vehicleMakeDom = useRef();
  const vehicleModelDom = useRef();
  const vehicleTypeDOM = useRef();
  const vehicleMileageDom = useRef();
  const vehicleTagDom = useRef();
  const vehicleSerialDom = useRef();
  const vehicleColorDOM = useRef();

  // console.log(checkboxDOM.current)

  // create a variable to hold the users token
  let loggedInEmployeeToken = "";
  // destructure the auth hook and get the token
  const { employee } = useAuth();
  if (employee && employee.employee_token) {
    loggedInEmployeeToken = employee.employee_token;
  }

  // first name value tracker
  function vehicleYearTracker() {
    setVehicleYear(vehicleYearDom.current.value);
  }

  // last name value tracker
  function vehicleMakeTracker() {
    setVehicleMake(vehicleMakeDom.current.value);
  }

  // phone number value tracker
  function vehicleModelTracker() {
    setVehicleModel(vehicleModelDom.current.value);
  }

  // active employee value tracker
  function vehicleTypeTracker() {
    setVehicleType(vehicleTypeDOM.current.value);
  }

  function VehicleMileageTracker() {
    setVehicleMileage(vehicleMileageDom.current.value);
  }

  function vehicleTagTracker() {
    setVehicleTag(vehicleTagDom.current.value);
  }
  function vehicleSerialTracker() {
    setVehicleSerial(vehicleSerialDom.current.value);
  }
  function vehicleColorTracker() {
    setVehicleColor(vehicleColorDOM.current.value);
  }

  // fetch employee data using useEffect
  useEffect(() => {
    const fetchData = async () => {
      // console.log(formData);
      try {
        const data = await vehicleService?.getSingleVehicle(
          customer_hash,
          vehicle_id,
          loggedInEmployeeToken
        );

        console.log(data.data.getSingleVehicle[0]);

        if (data?.statusText !== "OK") {
          // set apiError to true
          setApiError(true);

          if (data?.status === 403) {
            setApiErrorMessage("Please login again");
          } else if (data?.status === 401) {
            setApiErrorMessage("You are not Authorized to view this page");
          } else {
            setApiErrorMessage("Please try again laterrrr");
          }
        }

        setVehicleYear(data.data.getSingleVehicle[0].vehicle_year);
        setVehicleMake(data.data.getSingleVehicle[0].vehicle_make);
        setVehicleModel(data.data.getSingleVehicle[0].vehicle_model);
        setVehicleType(data.data.getSingleVehicle[0].vehicle_type);

        setVehicleMileage(data.data.getSingleVehicle[0].vehicle_mileage);
        setVehicleTag(data.data.getSingleVehicle[0].vehicle_tag);

        setVehicleSerial(data.data.getSingleVehicle[0].vehicle_serial);
        setVehicleColor(data.data.getSingleVehicle[0].vehicle_color);

        // console.log(checkboxDOM.current.checked);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // submit handler
  async function handleSubmit(e) {
    // prevent the default behavior of the form submission
    e.preventDefault();

    // prepare the data for form submission
    const FormData = {
      vehicle_year,
      vehicle_make,
      vehicle_model,
      vehicle_type,
      vehicle_mileage,
      vehicle_tag,
      vehicle_serial,
      vehicle_color,
    };

    try {
      const data = await vehicleService.updateVehicleById(
        FormData,
        loggedInEmployeeToken
      );

      // alert("grood");
      navigate("/admin/orders");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="contact-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="form-column col-lg-7">
              <div className="inner-column">
                <div className="contact-form">
                  {/* Form Start*/}

                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      {/* First Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_year"
                          placeholder="Vehicle Year"
                          ref={vehicleYearDom}
                          value={vehicle_year}
                          onChange={vehicleYearTracker}
                          required
                        />
                        {"vehicle_year Required" && (
                          <div className="validation-error" role="alert">
                            {/* {firstNameRequired} */}
                          </div>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_make"
                          placeholder="vehicle make"
                          required
                          ref={vehicleMakeDom}
                          value={vehicle_make}
                          onChange={vehicleMakeTracker}
                        />
                        {"vehicle_makeRequired" && (
                          <div className="validation-error" role="alert"></div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_model"
                          placeholder="vehicle_model"
                          ref={vehicleModelDom}
                          required
                          value={vehicle_model}
                          onChange={vehicleModelTracker}
                        />
                        {"vehicle_modelRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_type"
                          placeholder="vehicle_type"
                          ref={vehicleTypeDOM}
                          required
                          value={vehicle_type}
                          onChange={vehicleTypeTracker}
                        />
                        {"vehicle_typeRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_mileage"
                          placeholder="vehicle_mileage"
                          ref={vehicleMileageDom}
                          required
                          value={vehicle_mileage}
                          onChange={VehicleMileageTracker}
                        />
                        {"vehicle_mileageRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_tag"
                          placeholder="vehicle_tag"
                          ref={vehicleTagDom}
                          required
                          value={vehicle_tag}
                          onChange={vehicleTagTracker}
                        />
                        {"vehicle_tagRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_serial"
                          placeholder="vehicle_serial"
                          ref={vehicleSerialDom}
                          required
                          value={vehicle_serial}
                          onChange={vehicleSerialTracker}
                        />
                        {"vehicle_serialRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      <div className="form-group col-md-12">
                        <input
                          type="text"
                          name="vehicle_color"
                          placeholder="vehicle_color"
                          ref={vehicleColorDOM}
                          required
                          value={vehicle_color}
                          onChange={vehicleColorTracker}
                        />
                        {"vehicle_colorRequired" && (
                          <div className="validation-error" role="alert">
                            {/* {phoneNumberRequired} */}
                          </div>
                        )}
                      </div>

                      {/* Submit Button */}
                      <div className="form-group col-md-12">
                        <button
                          // onClick={spinner}
                          className="theme-btn btn-style-one"
                          type="submit"
                          data-loading-text="Please wait..."
                        >
                          <span>
                            {!"spin" ? (
                              <BeatLoader color="white" size={8} />
                            ) : (
                              "Update Vehicle"
                            )}
                          </span>
                        </button>
                        {"serverMsg" && (
                          <div
                            className="validation-error"
                            style={{
                              color: "green",
                              fontSize: "100%",
                              fontWeight: "600",
                              padding: "25px",
                            }}
                            role="alert"
                          >
                            {/* {serverMsg} */}
                          </div>
                        )}
                      </div>
                    </div>
                  </form>

                  {/* Form End */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditVehicleForm;
