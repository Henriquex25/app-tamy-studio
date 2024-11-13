import { Text, StatusBar, TouchableOpacity } from "react-native";
import { Container } from "@/components/Container";
import themeColors from "@/styles/themeColors";
import { useAuth } from "@/contexts/AuthContext";

export default function Profile() {
    const { logout } = useAuth();

    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor={themeColors.primary[400]} />
            <Text>Perfil</Text>

            <TouchableOpacity className="mt-3 w-11/12 mx-auto bg-primary-400 p-4 rounded" onPress={logout}>
                <Text className="text-center font-bold">Logout</Text>
            </TouchableOpacity>
        </Container>
    );
}
