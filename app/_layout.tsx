import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";

const InitialLayout = () => {
    const { isLoading, isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) return;

        const inAuthGroup = segments[0] === "(auth)";

        if (isAuthenticated && !inAuthGroup) {
            router.replace("/home");
        } else if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated]);

    return (
        <SafeAreaView className="flex-1 bg-primary-300">
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <Slot />
        </SafeAreaView>
    );
};

export default function RootLayout() {
    return (
        <AuthProvider>
            <InitialLayout />
        </AuthProvider>
    );
};
