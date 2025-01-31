import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://localhost:7057/api" : "/api",
	withCredentials: true,
});
