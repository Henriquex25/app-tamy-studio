import { Stack } from "expo-router";
import { AuthProvider } from "../../contexts/AuthContext";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
    );
}