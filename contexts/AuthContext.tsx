import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import { router } from "expo-router";

interface AuthContextData {
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Novo estado para carregamento

    useEffect(() => {
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync("authToken");

            if (token) {
                setIsAuthenticated(true);
            }

            setIsLoading(false);
        };

        checkToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/login", { email, password });

            await SecureStore.setItemAsync("authToken", response.data.token);

            setIsAuthenticated(true);

            router.replace("/(auth)/(tabs)/home");
        } catch (error) {
            console.error("Erro no login:", error);
        }
    };

    const logout = async () => {
        try {
            const response = await api.post("/logout");

            if (response.status === 200) {
                await SecureStore.deleteItemAsync("authToken");
            }

            setIsAuthenticated(false);
            router.replace("/(public)/login");
        } catch (error) {
            console.error("Erro durante o logout:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro do AuthProvider");
    }

    return context;
};
