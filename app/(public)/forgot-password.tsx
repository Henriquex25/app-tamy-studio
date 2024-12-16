import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import { View, Text } from "react-native";

export default function ForgotPassword() {
    return (
        <View className="flex-1">
            <StatusBar />

            <Container>
                <Text>Página de esqueci minha senha</Text>
            </Container>
        </View>
    );
}
