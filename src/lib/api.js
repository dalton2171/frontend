import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-o6y6.onrender.com/api",
  withCredentials: true,
});

export default api;