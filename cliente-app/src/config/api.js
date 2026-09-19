import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export const get = async (endpoint, id) => {
  const response = await api.get(`/${endpoint}${id != null ? `/${id}` : ""}`);

  return response.data;
};

export const post = async (endpoint, data = {}, config = {}) => {
  const response = await api.post(`/${endpoint}`, data, config);
  return response.data;
};

export const put = async (endpoint, id, data = {}, config = {}) => {
  const response = await api.put(`/${endpoint}${id != null ? `/${id}` : ""}`, data, config);
  return response.data;
};

export const patch = async (endpoint, data = {}, config = {}) => {
  const response = await api.patch(`/${endpoint}`, data, config);
  return response.data;
};

export const del = async (endpoint, id, config = {}) => {
  const response = await api.delete(`/${endpoint}${id != null ? `/${id}` : ""}`, config);
  return response.data;
};

export const authService = {
  async register(nombre_usuario, email, password) {
    try {

      const response = await api.post("/auth/register", {
        nombre_usuario,
        email,
        password
      });

      return response.data;

    } catch (error) {

      console.error("Register error:", error);

      return {
        success: false,
        message: error.response?.data?.message ||
          "Error de conexión con el servidor"
      };
    }
  },

  async login(email, password) {
    try {
      console.log(password);
      const response = await api.post("/auth/login", {
        email,
        password
      });

      return response.data;

    } catch (error) {

      console.error("Login error:", error);

      return {
        success: false,
        message: error.response?.data?.message ||
          "Error de conexión con el servidor"
      };
    }
  },
};

export default api;