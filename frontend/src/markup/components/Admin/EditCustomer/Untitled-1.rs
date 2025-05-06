// import React from "react";
// import { useEffect, useState } from "react";
// import customerService from "../../../services/customer.service";
// import { useParams } from "react-router-dom";

// function EditCustomerForm() {
//   // call the customer service to get customer by id
//   const [customers, setCustomers] = useState([]);
//   const [customer_email, setEmail] = useState("");
//   const [customer_first_name, setFname] = useState("");
//   const [customer_last_name, setLname] = useState("");
//   const [customer_phone_number, setPhone] = useState("");
//   const [active_customer_status, setactive_customer_status] = useState(1);
//   const request = useParams();
//   console.log(request.customerId);
//   const [emailError, setEmailError] = useState("");
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       const response = await customerService.getCustomerById(
//         request.customerId
//       );
//       const data = await response.json();
//       console.log(data.customer[0]);
//       setCustomers(data.customer[0]);
//       setEmail(data.customer[0].customer_email);
//       setFname(data.customer[0].customer_first_name);
//       setLname(data.customer[0].customer_last_name);
//       setPhone(data.customer[0].customer_phone_number);
//     };
//     fetchCustomers();
//   }, []);
//   // log th customer data on the console
//   console.log(customers);
//   // define the handleSubmit function
//   let fullname =
//   customers.customer_first_name + " " + customers.customer_last_name;
//   // collect the customer data
//   const customerData = {
//     customer_phone_number: customer_phone_number,
//     customer_first_name: customer_first_name,
//     customer_last_name: customer_last_name,
//     active_customer_status: active_customer_status,
//   };
//   const updateCustomer = customerService.updateCustomer(
//     customers.customer_id,
//     customerData
//   );
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//   };
//   return (
//     <section className="contact-section">
//       <div className="auto-container">
//         <div className="contact-title">
//           <h2>Edit: </h2>
//           <h2>{fullname}</h2>
//         </div>
//         <div className="row clearfix">
//           <div className="mb-4">
//             <h2>Customer email:{customer_email}</h2>
//           </div>
//           <div className="form-column col-lg-7">
//             <div className="inner-column">
//               <div className="contact-form">
//                 <form onSubmit={handleSubmit}>
//                   <div className="row clearfix">
//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="customer fname"
//                         value={customer_first_name}
//                         onChange={(event) => setFname(event.target.value)}
//                         placeholder="First Name"
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="customer-lname"
//                         value={customer_last_name}
//                         onChange={(event) => setLname(event.target.value)}
//                         placeholder="Last Name"
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <input
//                         type="text"
//                         name="customer_"
//                         value={customer_phone_number}
//                         onChange={(event) => setPhone(event.target.value)}
//                         placeholder="Phone Number"
//                       />
//                     </div>

//                     <div className="form-group col-md-12">
//                       <button
//                         className="theme-btn btn-style-one"
//                         type="submit"
//                         data-loading-text="Please wait..."
//                       >
//                         <span>Update Customer</span>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default EditCustomerForm;
