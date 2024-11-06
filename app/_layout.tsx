import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "../contexts/AuthContext";
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import "../styles/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {
    const { isLoading, isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        "PlaywriteGBS-Regular": require("../assets/fonts/PlaywriteGBS-Regular.ttf"),
    });

    useEffect(() => {
        if (!fontsLoaded || isLoading) {
            SplashScreen.hideAsync();

            return;
        }

        const inAuthGroup = segments[0] === "(auth)";

        console.log("Primeiro seguimento: ", segments[0]);
        console.log("inAuthGroup: ", inAuthGroup);
        console.log("Verificação 1: ", true && !inAuthGroup);
        console.log("Verificação 2: ", !false);

        // if (isAuthenticated && !inAuthGroup) {
        if (true && !inAuthGroup) {
            router.replace("/(auth)/(tabs)/home");
        // } else if (!isAuthenticated) {
        } else if (!true) {
            router.replace("/login");
        }
    }, [fontsLoaded, isAuthenticated]);

    if (!fontsLoaded || isLoading) {
        return null;
    }

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
