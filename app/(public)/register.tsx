import { Container } from "@/components/Container";
import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
    return (
        <View className="flex-1">
            <StatusBar />

            <Container>
                <Text>Página de cadastro</Text>
            </Container>
        </View>
    );
}
