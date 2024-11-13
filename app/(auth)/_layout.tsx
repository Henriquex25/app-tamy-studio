import { Stack, Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "../../styles/themeColors";

const tabBarActiveTintColor: string = "#4b5563"; // gray-600

export default function AuthLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(modals)" />
        </Stack>
    );
}