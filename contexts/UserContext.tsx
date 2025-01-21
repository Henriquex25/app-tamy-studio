import React, { createContext, useContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { UserChangeData, UserType } from "@/types/auth/User";
import api from "@/services/api";
import { router } from "expo-router";
import * as FileSystem from "expo-file-system";
import { AxiosResponse } from "axios";

interface UserContextProps {
    user: UserType | null;
    isLoading: boolean;
    cachedAvatarFilePath: string | null;
    setUser: (user: UserType | null) => void;
    clearUser: () => void;
    changePassword: (data: ChangePasswordProps) => Promise<void>;
    changeUserData: (data: UserChangeData) => Promise<void>;
    uploadAvatar: (imageUri: string) => Promise<AxiosResponse | void>;
    deleteAvatar: () => Promise<AxiosResponse | void>;
}

interface ChangePasswordProps {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cachedAvatarFilePath, setCachedAvatarFilePath] = useState<string | null>(null);
    const [user, setUser] = useState<UserType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const cacheDirectory = FileSystem.cacheDirectory;

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

    useEffect(() => {
        downloadUserAvatar();
    }, [user]);

    const clearUser = async () => {
        await SecureStore.deleteItemAsync("user");
        setUser(null);
    };

    const changePassword = async ({
        currentPassword,
        newPassword,
        confirmNewPassword,
    }: ChangePasswordProps): Promise<void> => {
        try {
            setIsLoading(true);

            const response = await api.post("/user/change-password", {
                currentPassword,
                newPassword,
                confirmNewPassword,
            });

            if (isSuccessfulResponse(response)) {
                router.replace({
                    pathname: "/(auth)/(modals)/profile",
                    params: {
                        toast: JSON.stringify({
                            type: "success",
                            text1: response.data.message,
                        }),
                    },
                });
            }
        } catch (error: any) {
            if (error.response && error.response.data?.hasOwnProperty("errors")) {
                return error.response;
            }

            console.error("Erro ao tentar mudar a senha:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const changeUserData = async (data: UserChangeData) => {
        try {
            setIsLoading(true);

            const response = await api.post("/user/change-data", { ...data });

            if (isSuccessfulResponse(response)) {
                setUser(response.data.user);

                router.replace({
                    pathname: "/(auth)/(modals)/profile",
                    params: {
                        toast: JSON.stringify({
                            type: "success",
                            text1: response.data.message,
                        }),
                    },
                });
            }
        } catch (error: any) {
            if (error.response && error.response.data?.hasOwnProperty("errors")) {
                return error.response;
            }

            console.error("Erro ao tentar atualizar os dados do usuário:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadUserAvatar = async (): Promise<void> => {
        if (!user || !user.avatar || !user.avatar_url) return;

        const fileName = user.avatar.split("/").pop();
        const fileUri = `${cacheDirectory}${user.id}_${fileName}`;

        const fileInfo = await FileSystem.getInfoAsync(fileUri);
        if (fileInfo.exists) {
            setCachedAvatarFilePath(fileUri);
            return;
        }

        const downloadedFile = await FileSystem.downloadAsync(user.avatar_url, fileUri);
        setCachedAvatarFilePath(downloadedFile.uri);
    };

    const uploadAvatar = async (imageUri: string): Promise<AxiosResponse | void> => {
        const fileExtension = imageUri.split(".").pop();
        const formData = new FormData();

        const fileData = {
            uri: imageUri,
            name: `avatar.${fileExtension}`,
            type: `image/${fileExtension}`,
        };

        formData.append("avatar", fileData as any);

        try {
            setIsLoading(true);

            const response = await api.post("/user/upload-avatar", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (isSuccessfulResponse(response)) {
                saveAvatarFileToCache(imageUri, response.data.avatar_url);

                setUser((prevUser) => {
                    if (prevUser) {
                        return {
                            ...prevUser,
                            avatar: response.data.avatar,
                            avatar_url: response.data.avatar_url,
                        };
                    }

                    return prevUser;
                });

                return response.data.avatar_url; // Retorna a URL do avatar atualizado
            }

            console.log("resposta mal sucedida ao tentar atualizar o avatar no backend", response.data);
        } catch (error: any) {
            if (error.response && error.response.data?.hasOwnProperty("errors")) {
                return error.response;
            }

            console.error("Erro ao tentar atualizar o avatar no backend:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const saveAvatarFileToCache = async (imageUri: string, avatar: string): Promise<boolean> => {
        const fileName = avatar.split("/").pop();
        const cachedFilePath = `${cacheDirectory}${user!.id}_${fileName}`;

        try {
            await FileSystem.copyAsync({
                from: imageUri,
                to: cachedFilePath,
            });

            setCachedAvatarFilePath(cachedFilePath);

            return true;
        } catch (error) {
            console.error("Erro ao salvar a imagem no cache:", error);
            throw new Error("Não foi possível salvar a imagem no cache.");
        }
    };

    const deleteAvatar = async (): Promise<AxiosResponse | void> => {
        try {
            setIsLoading(true);

            const response = await api.post("/user/delete-avatar");

            if (isSuccessfulResponse(response)) {
                deleteAvatarFromCache();

                setCachedAvatarFilePath(null);

                setUser((prevUser) => {
                    if (prevUser) {
                        return {
                            ...prevUser,
                            avatar: undefined,
                            avatar_url: undefined,
                        };
                    }

                    return prevUser;
                });
            }
        } catch (error: any) {
            if (error.response && error.response.data?.hasOwnProperty("errors")) {
                return error.response;
            }

            console.error("Erro ao tentar deletar o avatar no backend:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteAvatarFromCache = async (): Promise<void> => {
        if (!cachedAvatarFilePath) return;

        await FileSystem.deleteAsync(cachedAvatarFilePath);
    };

    const isSuccessfulResponse = (response: AxiosResponse): boolean => {
        return response.status === 200 && response.data.hasOwnProperty("status") && response.data.status === "success";
    };

    return (
        <UserContext.Provider
            value={{
                user,
                isLoading,
                cachedAvatarFilePath,
                setUser,
                clearUser,
                changePassword,
                changeUserData,
                uploadAvatar,
                deleteAvatar,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }

    return context;
};
