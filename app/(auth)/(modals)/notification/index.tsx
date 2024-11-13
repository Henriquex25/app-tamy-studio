import { Text, StatusBar } from "react-native";
import { Container } from "@/components/Container";
import themeColors from "@/styles/themeColors";

export default function Notification() {
    return (
        <Container>
            <StatusBar barStyle="dark-content" backgroundColor={themeColors.primary[400]} />
            <Text>Notificação</Text>
        </Container>
    );
}
