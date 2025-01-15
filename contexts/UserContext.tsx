import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { UserType } from "@/types/auth/User";
import api from "@/services/api";
import {router} from "expo-router";

interface UserContextProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    isLoading: boolean;
    clearUser: () => void;
    changePassword: (data: ChangePasswordProps) => Promise<void>;
}

interface ChangePasswordProps {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            const userData = await SecureStore.getItemAsync("user");
            if (userData) {
                setUser(JSON.parse(userData));
            }

            setIsLoading(false);
        };

        loadUser();
    }, []);

    const clearUser = async () => {
        await SecureStore.deleteItemAsync("user");
        setUser(null);
    };

    const changePassword = async ({ currentPassword, newPassword, confirmNewPassword }: ChangePasswordProps): Promise<void> => {
        try {
            setIsLoading(true);

            const response = await api.post("/change-password", { currentPassword, newPassword, confirmNewPassword });

            if (response.status === 200 && response.data.hasOwnProperty("status") && response.data.status === "ok") {
                router.navigate({
                    pathname: "/(auth)/(modals)/profile",
                    params: {
                        toast: JSON.stringify({
                            type: "success",
                            text1: response.data.message,
                        }),
                    }
                });
            }
        } catch (error: any) {
            if (error.response) {
                return error.response;
            }

            console.error("Erro no login:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return <UserContext.Provider value={{ user, setUser, clearUser, isLoading, changePassword }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
