import API from "../api";

export const registerUser = (data) => API.post("/users/register", data);

export const loginUser = (data) => API.post("/users/login", data);

export const getProfile = () => API.get("/users/me");
