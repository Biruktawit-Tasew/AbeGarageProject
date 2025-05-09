import axiosBase from "../axiosConfig";

// GET all services
const getAllServices = async () => {
	const response = await axiosBase.get("/api/services");
	// console.log(response);
	return response.data;
};
// GET a single service by ID
const getServiceById = async (id) => {
	const response = await axiosBase.get(`/api/service/${id}`);
	return response.data;
};

// POST: Add a new service
const addService = async (formData, token) => {
	const response = await axiosBase.post("/api/service", formData, {
		headers: {
			"x-access-token": token,
		},
	});
	return response.data;
};

// PUT: Update an existing service
// Destruct service id out of formData and onlt send the name and description
const updateService = async (
	{ service_id, service_name, service_description },
	token
) => {
	const response = await axiosBase.put(
		`/api/service/${service_id}`,
		{ service_name, service_description },
		{
			headers: {
				"x-access-token": token,
			},
		}
	);
	return response.data;
};

const serviceService = {
	getAllServices,
	getServiceById,
	addService,
	updateService,
};

export default serviceService;
