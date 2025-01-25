import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import api from "@/services/api";
import { router } from "expo-router";
import { AxiosError, AxiosResponse } from "axios";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { UserRegistrationType } from "@/types/auth/User";
import { useUser } from "./UserContext";

WebBrowser.maybeCompleteAuthSession();

interface AuthContextData {
    isAuthenticated: boolean;
    isGlobalLoading: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void | AxiosResponse>;
    register: (fields: UserRegistrationType) => Promise<void | AxiosResponse>;
    // googleLogin: () => Promise<void>;
    forgotPassword: (email: string) => Promise<AxiosResponse>;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isGlobalLoading, setIsGlobalLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser, clearUser, user } = useUser();
    const isAuthenticated = !!user;

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
            const token: string | null = await SecureStore.getItemAsync("authToken");

            if (!token) return;

            const response = await api.post("/auth/check");

            if (response.status === 200 && response.data.user) {
                setUser(response.data.user);
            }
        } catch (error: any) {
            if (!(error instanceof AxiosError)) {
                console.error("Erro ao verificar o token:", error);
            }

            if (
                error instanceof AxiosError &&
                error.response?.status === 401 &&
                error.response?.data?.message.toLowerCase().include("unauthenticated")
            ) {
                await SecureStore.deleteItemAsync("authToken");
                clearUser();
            }
        } finally {
            setIsGlobalLoading(false);
        }
    };

    // useEffect(() => {
    //     if (response?.type === "success") {
    //         const { authentication } = response;
    //
    //         if (authentication) {
    //             handleGoogleLogin(authentication.accessToken);
    //         }
    //     }
    // }, [response]);

    const login = async (email: string, password: string) => {
        try {
            setIsLoading(true);

            const response = await api.post("/login", { email, password });

            await SecureStore.setItemAsync("authToken", response.data.token);

            setUser(response.data.user);

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

    // const googleLogin = async () => {
    //     await promptAsync();
    // };

    const handleGoogleLogin = async (accessToken: string) => {
        try {
            setIsLoading(true);

            const res = await api.post("/auth/google", { access_token: accessToken });

            await SecureStore.setItemAsync("authToken", res.data.token);
            await SecureStore.setItemAsync("user", JSON.stringify(res.data.user));

            setUser(res.data.user);
            router.replace("/(auth)/(tabs)/home");
        } catch (error) {
            console.error("Erro ao autenticar com o Google:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (fields: UserRegistrationType) => {
        try {
            setIsLoading(true);

            const response = await api.post("/register", fields);

            await SecureStore.setItemAsync("authToken", response.data.token);
            await SecureStore.setItemAsync("user", JSON.stringify(response.data.user));

            setUser(response.data.user);

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

            clearUser();

            router.replace("/(public)/login");
        } catch (error) {
            console.error("Erro durante o logout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (email: string) => {
        try {
            setIsLoading(true);

            return await api.post("/forgot-password", { email });
        } catch (error: any) {
            console.error("Erro ao tentar recuperar a senha:", error);
            return error.response;
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
                // googleLogin,
                register,
                logout,
                forgotPassword,
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
