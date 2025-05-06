const serviceService = require("../services/service.service");

// GET /api/services - get all services
const getAllServices = async (req, res) => {
	try {
		const services = await serviceService.getAllServices();
		res.status(200).json(services);
	} catch (error) {
		 console.error("Error in getAllServices:", error);
		res.status(500).json({ error: "Failed to retrieve services" });
	}
};

// GET /api/service/:id - get a single service
const getSingleService = async (req, res) => {
	try {
		const id = req.params.id;
		const service = await serviceService.getServiceById(id);
		res.status(200).json(service);
	} catch (error) {
		res.status(500).json({ error: "Failed to retrieve service" });
	}
};

// POST /api/service - add a new service
const createService = async (req, res) => {
	try {
		const newService = req.body;
		await serviceService.createService(newService);
		res.status(201).json({ success: "true" });
	} catch (error) {
		res.status(500).json({ error: "Failed to create service" });
	}
};

// PUT /api/service - update a service
const updateService = async (req, res) => {
	try {
		const id = req.params.id;
		const { service_name, service_description } = req.body;

		await serviceService.updateService(id, service_name, service_description);

		res.status(200).json({ success: true });
	} catch (error) {
		console.error("Error in updateService:", error);
		res.status(500).json({ error: "Failed to update service" });
	}
};

module.exports = {
	getAllServices,
	getSingleService,
	createService,
	updateService,
};
