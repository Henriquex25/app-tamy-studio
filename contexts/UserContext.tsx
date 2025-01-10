import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { UserType } from "@/types/auth/User";

interface UserContextProps {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
    clearUser: () => void;
    isLoading: boolean;
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

    return <UserContext.Provider value={{ user, setUser, clearUser, isLoading }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
