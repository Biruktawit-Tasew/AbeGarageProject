const db = require("../config/db.config");

// Get all services
const getAllServices = async () => {
	const rows = await db.query("SELECT * FROM common_services");
	return rows;
};

// Get service by ID
const getServiceById = async (id) => {
	const rows = await db.query(
		"SELECT * FROM common_services WHERE service_id = ?",
		[id]
	);
	return rows[0]; // Return a single service
};

// Create new service
const createService = async (service) => {
	const { service_name, service_description } = service;
	await db.query(
		"INSERT INTO common_services (service_name, service_description) VALUES (?, ?)",
		[service_name, service_description]
	);
};

const updateService = async (id, name, description) => {
	const sql = `UPDATE common_services SET service_name = ?, service_description = ? WHERE service_id = ?`;
	await db.query(sql, [name, description, id]);
};

module.exports = {
	getAllServices,
	getServiceById,
	createService,
	updateService,
};
