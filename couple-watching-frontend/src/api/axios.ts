import axios from "axios";

export const axiosOMDBInstance = axios.create({
   baseURL: `${import.meta.env.VITE_OMDB_ROUTE}?apikey=${import.meta.env.VITE_OMDB_API_KEY}`,
});
