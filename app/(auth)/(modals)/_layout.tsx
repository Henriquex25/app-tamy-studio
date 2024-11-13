import { Stack } from "expo-router";
import themeColors from "@/styles/themeColors";

export default function ModalsLayout() {
    return (
        <Stack
            screenOptions={{
                presentation: "modal",
                headerStyle: {
                    backgroundColor: themeColors.primary[400],
                },
                headerTitleAlign: "center",
            }}
        >
            <Stack.Screen
                name="notification/index"
                options={{
                    title: "Notificações",
                    headerTitleAlign: "center",
                }}
            />

            <Stack.Screen
                name="profile/index"
                options={{
                    title: "Perfil",
                    headerTitleAlign: "center",
                }}
            />
        </Stack>
    );
}
