import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://localhost:7057/api" : "https://backend-talent-bridge-kbiu.onrender.com/api",
});

export default api;