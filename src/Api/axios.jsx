import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:5001/clone-2025-96bdb/us-central1/api" // Use only the emulator's base URL
});

export default axiosInstance;