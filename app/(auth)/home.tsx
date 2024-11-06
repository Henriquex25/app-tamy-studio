import { View, Text, Button } from 'react-native'
import { useAuth } from "../../contexts/AuthContext";

export default function Home() {
    const { logout } = useAuth();

    return (
        <View>
            <Text>Seja Bem-vindo!</Text>
            <Button title="Logout" />
        </View>
    );
}