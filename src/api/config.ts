import axios from "axios";
import { AuthResponse } from "../utils/types";

const api = axios.create({
  baseURL: "http://127.0.0.1:3001",
});

api.interceptors.request.use(function (config) {
  const auth: AuthResponse =
    localStorage.getItem("auth") !== null
      ? JSON.parse(localStorage.getItem("auth")!)
      : {};
  config.headers.Authorization = `Bearer ${auth.token}`;

  return config;
});

export default api;
