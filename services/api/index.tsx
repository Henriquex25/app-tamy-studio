import axios from "axios";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

export default api;
