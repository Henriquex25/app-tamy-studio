import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../services/api";
import { router } from "expo-router";
import { AxiosError, AxiosResponse } from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextData {
    isAuthenticated: boolean;
    isGlobalLoading: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void | AxiosResponse>;
    register: (fields: IRegisterFields) => Promise<void | AxiosResponse>;
    googleLogin: () => Promise<void>;
}

export interface IRegisterFields {
    name: string;
    email: string;
    email_confirmation: string;
    cell_phone: string;
    password: string;
    password_confirmation: string;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isGlobalLoading, setIsGlobalLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        // iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
        // androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
        redirectUri: process.env.EXPO_PUBLIC_GOOGLE_REDIRECT_URI,
    });

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        try {
            const token = await SecureStore.getItemAsync("authToken");

            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            const checkToken = await api.post("/auth/check");
            if (checkToken.status !== 200) {
                setIsAuthenticated(false);
                return;
            }

            setIsAuthenticated(true);
        } catch (error: any) {
            if (error instanceof AxiosError === false) {
                console.error("Erro ao verificar o token:", error);
            }

            if (
                error instanceof AxiosError &&
                error.response?.status === 401 &&
                error.response?.data?.message.toLowerCase().include("unauthenticated")
            ) {
                await SecureStore.deleteItemAsync("authToken");
            }

            setIsAuthenticated(false);
        } finally {
            setIsGlobalLoading(false);
        }
    };

    useEffect(() => {
        if (response?.type === "success") {
            const { authentication } = response;

            if (authentication) {
                handleGoogleLogin(authentication.accessToken);
            }
        }
    }, [response]);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const response = await api.post("/login", { email, password });

            await SecureStore.setItemAsync("authToken", response.data.token);
            await SecureStore.setItemAsync("user", JSON.stringify(response.data.user));

            setIsAuthenticated(true);
            router.replace("/(auth)/(tabs)/home");
        } catch (error: any) {
            if (error.response) {
                return error.response;
            }

            console.error("Erro no login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const googleLogin = async () => {
        await promptAsync();
    };

    const handleGoogleLogin = async (accessToken: string) => {
        try {
            setIsLoading(true);
            const res = await api.post("/auth/google", { access_token: accessToken });

            await SecureStore.setItemAsync("authToken", res.data.token);

            setIsAuthenticated(true);
            router.replace("/(auth)/(tabs)/home");
        } catch (error) {
            console.error("Erro ao autenticar com o Google:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (fields: IRegisterFields) => {
        try {
            setIsLoading(true);

            const response = await api.post("/register", fields);

            await SecureStore.setItemAsync("authToken", response.data.token);
            await SecureStore.setItemAsync("user", JSON.stringify(response.data.user));

            setIsAuthenticated(true);
            router.replace({
                pathname: "/(auth)/(tabs)/home",
                params: {
                    toast: JSON.stringify({
                        type: "success",
                        text1: "Cadastrado realizado com sucesso!",
                        text2: "Não se esqueça de validar seu email.",
                        visibilityTime: 8000,
                    }),
                },
            });
        } catch (error: any) {
            if (error.response) {
                return error.response;
            }

            console.error("Erro ao tentar registrar um novo usuário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);

            const response = await api.post("/logout");

            if (response.status === 200) {
                await SecureStore.deleteItemAsync("authToken");
                await SecureStore.deleteItemAsync("user");
            }

            setIsAuthenticated(false);
            router.replace("/(public)/login");
        } catch (error) {
            console.error("Erro durante o logout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isGlobalLoading,
                isLoading,
                login,
                googleLogin,
                register,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro do AuthProvider");
    }

    return context;
};
