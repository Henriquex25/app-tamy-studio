import { Tabs } from "expo-router";
import { AuthProvider } from "../../../contexts/AuthContext";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "../../../styles/themeColors";

const tabBarActiveTintColor: string = "#4b5563"; // gray-600

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: tabBarActiveTintColor,
                tabBarInactiveTintColor: tabBarActiveTintColor,
                tabBarActiveBackgroundColor: themeColors.primary[300],
                tabBarInactiveBackgroundColor: themeColors.primary[300],

            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Início",
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />;
                    },
                }}
            />

            <Tabs.Screen
                name="schedule"
                options={{
                    title: "Agendar",
                    tabBarIcon: ({ focused, color, size }) => {
                        return <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />;
                    },
                }}
            />
        </Tabs>
    );
}
