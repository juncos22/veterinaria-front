import axios from "axios";
import { environtments } from "./environments";

const api = axios.create({
  baseURL: environtments.PRODUCTION,
});

export default api;
