import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api", // ya jo bhi tumhara backend baseURL hai
  withCredentials: true, // Automatically send cookies with every request
});

export default api;
