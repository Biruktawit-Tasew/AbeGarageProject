import React, { useEffect, useState, useMemo } from "react";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import LaunchOutlinedIcon from "@mui/icons-material/LaunchOutlined";
import customerService from "../../../../services/customer.service";
import { Link } from "react-router-dom";
import debounce from "lodash.debounce";
import Pagination from "react-bootstrap/Pagination";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Fetch all customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await customerService.getAllCustomers();
        const data = await response.json();
        setCustomers(data.customers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  // Memoize the debounced search handler
  const debouncedSearch = useMemo(
    () =>
      debounce((value) => {
        setSearchTerm(value.toLowerCase());
        setCurrentPage(1); // Reset to first page on search
      }, 500),
    []
  );

  // Cleanup the debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Filter customers based on search term
  const filteredCustomers = customers.filter((customer) => {
    const fullName =
      `${customer.customer_first_name} ${customer.customer_last_name}`.toLowerCase();
    return (
      fullName.includes(searchTerm) ||
      customer.customer_email.toLowerCase().includes(searchTerm) ||
      customer.customer_phone_number.toLowerCase().includes(searchTerm)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <section className="contact-section">
      <div className="auto-container">
        <div className="contact-title d-flex justify-content-between">
          <h2>Customers</h2>
        </div>
      </div>
      <div className="w-full mb-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by name, email or phone number"
            className="w-100 pr-10 pl-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-dark"
            onChange={(event) => debouncedSearch(event.target.value)}
          />
        </div>
      </div>

      <table className="table table-striped table-hover d-flex-column">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Added Date</th>
            <th scope="col">Active</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.customer_id}</td>
              <td>{customer.customer_first_name}</td>
              <td>{customer.customer_last_name}</td>
              <td>{customer.customer_email}</td>
              <td>{customer.customer_phone_number}</td>
              <td>{customer.customer_added_date}</td>
              <td>{customer.active_customer_status === 1 ? "Yes" : "No"}</td>
              <td className="d-flex justify-content-around">
                <Link to={`/admin/edit-customer/${customer.customer_id}`}>
                  <EditSquareIcon sx={{ color: "dark" }} />
                </Link>
                <Link to={`/admin/customer/${customer.customer_id}`}>
                  <LaunchOutlinedIcon sx={{ color: "dark" }} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            />
            <Pagination.Prev
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            />
            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            />
            <Pagination.Last
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </div>
      )}
    </section>
  );
}

export default CustomerTable;
