// Service.jsx
import React, { useEffect, useState } from "react";
import serviceService from "../../../../services/service.service";
import AddServiceForm from "./AddServiceForm";
import ServiceTable from "./ServiceTable";

const { getAllServices, addService, updateService } = serviceService;

const Service = () => {
	const [services, setServices] = useState([]);
	const [form, setForm] = useState({
		service_name: "",
		service_description: "",
	});
	const [editingId, setEditingId] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchServices();
	}, []);

	const fetchServices = async () => {
		setLoading(true);
		try {
			const servicesArray = await getAllServices();
			setServices(servicesArray);
			console.log("Fetched services:", servicesArray);
		} catch (error) {
			console.error("Error fetching services:", error);
			setError("Failed to load services");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.service_name.trim() || !form.service_description.trim()) {
			setError("Please fill out both the service name and description.");
			return;
		}
		setLoading(true);
		setError(null);

		try {
			if (editingId) {
				await updateService({ service_id: editingId, ...form }, token);
			} else {
				await addService(form, token);
			}
			setForm({ service_name: "", service_description: "" });
			setEditingId(null);
			fetchServices();
		} catch (error) {
			console.error("Error submitting form:", error);
			setError("Failed to add or update service");
		} finally {
			setLoading(false);
		}
	};

	const handleEdit = (service) => {
		setEditingId(service.service_id);
		setForm({
			service_name: service.service_name,
			service_description: service.service_description,
		});
	};

	const handleClear = () => {
		setEditingId(null);
		setForm({
			service_name: "",
			service_description: "",
		});
	};

	return (
		<section className="services-section">
			<div className="auto-container">
				<div className="sec-title style-two">
					<h2>Services We Provide</h2>
				</div>

				{loading ? (
					<p>Loading...</p>
				) : (
					<ServiceTable
						services={services}
						onEdit={handleEdit}
						onClear={handleClear}
					/>
				)}

				<div className="ServiceForm">
					<div className="sec-title style-two">
						<h2 className="ServiceForm-title">Add a New Service</h2>
					</div>

					<AddServiceForm
						form={form}
						onChange={handleChange}
						onSubmit={handleSubmit}
						editingId={editingId}
						error={error}
					/>
				</div>
			</div>
		</section>
	);
};

export default Service;
