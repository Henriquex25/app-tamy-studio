import { Stack } from "expo-router";
import themeColors from "@/styles/themeColors";

export default function NewScheduleLayout() {
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
                name="date_time"
                options={{
                    title: "Dia e horário",
                }}
            />
        </Stack>
    );
}
