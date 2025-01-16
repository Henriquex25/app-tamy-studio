import { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider } from "@/contexts/AuthContext";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import "../styles/global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import themeColors from "@/styles/themeColors";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import ToastConfig from "@/components/ToastConfig";
import { UserProvider } from "@/contexts/UserContext";

SplashScreen.preventAutoHideAsync();

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: themeColors.primary[500],
        secondary: themeColors.secondary[500],
        background: themeColors.primary[300],
    },
};

const InitialLayout = () => {
    const { isGlobalLoading, isAuthenticated } = useAuth();
    const segments = useSegments();
    const router = useRouter();

    const [fontsLoaded] = useFonts({
        "PlaywriteGBS-Regular": require("../assets/fonts/PlaywriteGBS-Regular.ttf"),
    });

    useEffect(() => {
        if (!fontsLoaded || isGlobalLoading) {
            SplashScreen.hideAsync();

            return;
        }

        const inAuthGroup: boolean = segments[0] === "(auth)";

        if (isAuthenticated && !inAuthGroup) {
            router.replace("/(auth)/(tabs)/home");
        } else if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [fontsLoaded, isAuthenticated, isGlobalLoading]);

    if (!fontsLoaded || isGlobalLoading) {
        return null;
    }

    return (
        <SafeAreaView className="flex-1 bg-primary-300">
            <StatusBar barStyle="dark-content" backgroundColor={themeColors.primary[300]} />
            <PaperProvider theme={theme}>
                <Slot />
            </PaperProvider>
            <Toast config={ToastConfig} />
        </SafeAreaView>
    );
};

export default function RootLayout() {
    return (
        <UserProvider>
            <AuthProvider>
                <InitialLayout />
            </AuthProvider>
        </UserProvider>
    );
}
