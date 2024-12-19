import { Stack } from "expo-router";
import themeColors from "@/styles/themeColors";

export default function PublicLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: themeColors.primary["400"],
                },
            }}
        >
            <Stack.Screen
                name="login"
            />
            <Stack.Screen
                name="register"
                options={{
                    headerShown: true,
                    title: "Cadastrar",
                }}
            />
        </Stack>
    );
}
