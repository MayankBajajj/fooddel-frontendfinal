import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // match your backend port
});

export default API;
