import axios from "axios";
const API_URL = "http://localhost:8000/api";

const apiClient = axios.create({
  baseURL: API_URL, // your Django backend base URL
  timeout: 10000,
});

// ✅ Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    console.log("➡️ Request:", config.method?.toUpperCase(), config.url, config.data);

    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    console.log("✅ Response:", response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error("❌ Response error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;