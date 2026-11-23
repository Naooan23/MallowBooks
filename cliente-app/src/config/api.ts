import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const get = async (endpoint: string, id: number | undefined) => {
  const response = await api.get(`/${endpoint}${id != null ? `/${id}` : ""}`);
  return response.data;
};

export const postList = async (endpoint: string, data: { lista: number[] | [] }, config = {}) => {
  const response = await api.post(`/${endpoint}`, data, config);
  return response.data;
};

export const post = async (endpoint: string, data = {}, config = {}) => {
  const response = await api.post(`/${endpoint}`, data, config);
  return response.data;
};

export const put = async (endpoint: string, data = {}, config = {}) => {
  const response = await api.put(`/${endpoint}`, data, config);
  return response.data;
};

export const patch = async (endpoint: string, data = {}, config = {}) => {
  const response = await api.patch(`/${endpoint}`, data, config);
  return response.data;
};

export const del = async (endpoint: string, id: number | null, config = {}) => {
  const response = await api.delete(`/${endpoint}${id != null ? `/${id}` : ""}`, config);
  return response.data;
};

export const authService = {
  async register(nombre: string, email: string, password: string) {
    try {
      const response = await api.post("/auth/register", {
        nombre,
        email,
        password
      });

      if (response.data?.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message:
            error.response?.data?.detail ||
            "Error de conexión con el servidor"
        };
      }

      return {
        success: false,
        message: "Error de conexión con el servidor"
      };
    }
  },

  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password
      });

      if (response.data?.token) {
        sessionStorage.setItem("token", response.data.token);
      }

      return response.data;

    } catch (error) {
      if (axios.isAxiosError(error)) {
        return {
          success: false,
          message:
            error.response?.data?.detail ||
            "Error de conexión con el servidor"
        };
      }

      return {
        success: false,
        message: "Error de conexión con el servidor"
      };
    }
  },

  logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  }
};

export default api;
