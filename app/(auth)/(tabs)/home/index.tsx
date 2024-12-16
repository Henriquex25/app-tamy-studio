import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useAuth } from "@/contexts/AuthContext";
import { StatusBar } from "@/components/StatusBar";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";
import { Container } from "@/components/Container";

interface IScheduledService {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    service: string;
    price: number;
}

export default function HomeScreen() {
    const { logout } = useAuth();
    const [scheduledServices, setScheduledServices] = useState<IScheduledService[]>([]);

    useState(() => {
        setScheduledServices([
            {
                id: "1",
                name: "Alongamento Cílios",
                description: "Descrição do Serviço 1",
                date: "01/01/2023",
                time: "10:00",
                service: "Serviço 1",
                price: 10000,
            },
            {
                id: "2",
                name: "Manicure",
                description: "Descrição do Serviço 2",
                date: "01/01/2023",
                time: "10:00",
                service: "Serviço 1",
                price: 20000,
            },
        ]);
    });

    return (
        <View className="flex-1">
            <StatusBar />

            <Container>
                <Header />

                <Text className="mt-8 text-center font-bold text-2xl text-primary-500">Meus agendamentos</Text>

                {/* Lista de agendamentos */}
                <View className="mt-10">
                    <FlatList
                        data={scheduledServices}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View
                                className="w-[89%] rounded-xl mx-auto flex flex-row bg-gray-50 overflow-hidden mb-5"
                                style={{
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 5,
                                    elevation: 5,
                                }}
                            >
                                <View className="h-full w-4 bg-purple-500"></View>
                                <View className="px-5 py-2 flex flex-row">
                                    {/* Título e data */}
                                    <View className="w-7/12">
                                        <Text className="font-bold text-pink-500 text-xl mb-2" numberOfLines={1}>
                                            {item.name}
                                        </Text>
                                        <Text className="text-gray-400 mx-auto">{item.date + " - " + item.time}</Text>
                                    </View>

                                    {/* Preço e tempo restante */}
                                    <View className="w-4/12 flex flex-col">
                                        {/* Preço */}
                                        <View className="flex flex-row pr-1.5 w-full justify-end gap-x-1">
                                            <Text className="pt-1.5 font-semibold text-gray-400 text-[0.9rem]">R$</Text>
                                            <Text className="text-center text-lg font-bold text-gray-400">
                                                {(item.price / 100).toLocaleString("pt-BR", {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </Text>
                                        </View>

                                        {/* Tempo restante */}
                                        <View className="w-full flex flex-row justify-center items-center mt-1 gap-x-1">
                                            <Ionicons
                                                name="time-outline"
                                                size={15}
                                                color={themeColors.primary[400]}
                                                style={{ marginTop: 2, opacity: 0.7 }}
                                            />
                                            <Text className="text-primary-400/70">30 min</Text>
                                        </View>
                                    </View>

                                    {/* Botão */}
                                    <View className="flex justify-center w-1/12">
                                        <TouchableOpacity onPress={() => {}} activeOpacity={0.6}>
                                            <Ionicons
                                                name="ellipsis-vertical-sharp"
                                                size={26}
                                                color={themeColors.primary[400]}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </Container>
        </View>
    );
}
