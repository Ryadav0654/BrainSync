import axios from "axios";
import { baseURL } from "@/config/config";

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default apiClient;
