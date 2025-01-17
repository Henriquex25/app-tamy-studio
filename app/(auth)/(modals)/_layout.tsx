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
                }}
            />

            <Stack.Screen
                name="profile/index"
                options={{
                    title: "Perfil",
                }}
            />

            <Stack.Screen
                name="profile/change_password"
                options={{
                    title: "Trocar senha",
                }}
            />

            <Stack.Screen
                name="profile/my_record"
                options={{
                    title: "Meu cadastro",
                }}
            />
        </Stack>
    );
}
