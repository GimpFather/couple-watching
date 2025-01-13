import axios from "axios";

const axiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_OMDB_ROUTE}?apikey=${
		import.meta.env.VITE_OMDB_API_KEY
	}`,
});

export default axiosInstance;
