import axios from "axios";
import { useHistory } from "react-router-dom";

// Crea una instancia de Axios
const axiosInstance = axios.create();

// Interceptor para capturar errores globalmente
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Si el token ha expirado o es inválido, redirigir al login
      useHistory().push("/login"); // Redirigir al login
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
