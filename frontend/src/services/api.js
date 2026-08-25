import axios from "axios";

// Axios instance for API calls
const API = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // allows browser to send cookies (JWT cookie from backend)
});

export default API;
