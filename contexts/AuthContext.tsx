// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

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
            setIsLoading(false); // Carregamento concluído
        };
        checkToken();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("https://sua-api.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Falha na autenticação");
            }

            const data = await response.json();
            const token = data.token;

            await SecureStore.setItemAsync("authToken", token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Erro de login:", error);
        }
    };

    const logout = async () => {
        await SecureStore.deleteItemAsync("authToken");
        setIsAuthenticated(false);
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
