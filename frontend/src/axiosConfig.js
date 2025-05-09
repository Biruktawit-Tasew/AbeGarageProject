// import axios module
import axios from "axios";

// import api url from Z env
const ApiUrl = import.meta.env.VITE_API_URL;

// create Z axios baseUrl
const axiosBase = axios.create({
	baseURL: `${ApiUrl}`,
	headers: {
		"Content-Type": "application/json",
	},
});

// export Z axios baseUrl
export default axiosBase;
