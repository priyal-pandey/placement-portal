import axios from "axios";

const API = axios.create({
  baseURL: "https://placement-portal-goj9.onrender.com/api/auth",
});

export default API;