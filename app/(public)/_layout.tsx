import { Stack } from "expo-router";
import themeColors from "@/styles/themeColors";

export default function PublicLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: themeColors.primary["400"],
                },
            }}
        >
            <Stack.Screen
                name="login"
                options={{
                    title: "Login",
                }}
            />
            <Stack.Screen
                name="register"
                options={{
                    title: "Cadastrar",
                }}
            />
        </Stack>
    );
}
