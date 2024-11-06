import { View, Text, Button } from 'react-native'
import { useAuth } from "../../../contexts/AuthContext";
import { StatusBar } from '@/components/StatusBar';
import Header from '@/components/Header';

export default function Home() {
    const { logout } = useAuth();

    return (
        <>
            <StatusBar />

            <View className="flex-1 bg-primary-300">
                <Header />

                <Text className="mt-8 text-center font-bold text-2xl text-primary-500">Meus agendamentos</Text>
            </View>
        </>
    );
}