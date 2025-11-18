import axios from "axios";

const API = axios.create({
  baseURL: "https://fooddel-backendfinal.onrender.com", // match your backend port
});

export default API;
  