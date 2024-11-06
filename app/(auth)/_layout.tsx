import { Stack } from "expo-router";
import { AuthProvider } from "../../contexts/AuthContext";

export default function AuthLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="home"
                options={{ headerTitle: "Home" }}
            />
            <Stack.Screen
                name="profile"
                options={{ headerTitle: "Minha conta" }}
            />
        </Stack>
    )
}