import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_BACKEND_API_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Interceptador para adicionar o token CSRF ao cabeçalho
api.interceptors.request.use(async (config) => {
    if (config.url !== "/login") {
        const authToken = await SecureStore.getItemAsync("authToken");

        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }
    }
    return config;
});

export default api;
