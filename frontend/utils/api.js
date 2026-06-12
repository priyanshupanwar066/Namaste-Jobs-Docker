import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL , // ya jo bhi tumhara backend baseURL hai
  withCredentials: true, // Automatically send cookies with every request
});

export default api;

