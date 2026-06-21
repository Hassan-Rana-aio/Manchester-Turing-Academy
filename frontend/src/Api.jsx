import axios from "axios";
import { toast } from "react-toastify";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_API_URL,
});

instance.interceptors.request.use(
  (config) => {
    // add authentication token in request headers
    const token = localStorage.getItem("userToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 403) {
      localStorage.removeItem("userId");
      localStorage.removeItem("userRole");
      localStorage.removeItem("userToken");
      window.location.reload();
    }

    toast.error(error?.response?.data?.message);
    Promise.reject(error);
  }
);

export default instance;
