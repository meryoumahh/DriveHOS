import axios from "axios";
const API_URL = "https://drivehos.onrender.com/api";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 30000,
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
    return response;
  },
  (error) => {
    console.error("❌ Response error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;