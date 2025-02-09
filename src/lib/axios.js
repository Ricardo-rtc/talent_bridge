import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://localhost:7057/api" : "https://backend-talent-bridge-kbiu.onrender.com/api",
	withCredentials: true,
});
