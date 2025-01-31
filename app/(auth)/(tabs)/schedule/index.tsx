import { ReactElement, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, Text, View, ActivityIndicator } from "react-native";
import { Container } from "@/components/Container";
import Header from "@/components/Header";
import { useUser } from "@/contexts/UserContext";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/form/input";
import themeColors from "@/styles/themeColors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AxiosResponse } from "axios";
import api from "@/services/api";
import Toast from "react-native-toast-message";
import { ServiceType } from "@/types/Service";
import { router } from "expo-router";
import { LoadingIndicator } from "@/components/LoadingIndicator";

export default function Schedule() {
    const { user } = useUser();
    const [loading, setLoading] = useState<boolean>(false);
    const [services, setServices] = useState<ServiceType[]>([]);
    const [query, setQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            searchingServices();
        }, 700);

        return () => {
            clearTimeout(handler); // Limpa o timeout se o usuário continuar digitando
        };
    }, [query]);

    async function searchingServices(): Promise<void> {
        setLoading(true);

        try {
            const response: AxiosResponse = await api.get("/services", {
                params: {
                    query: query,
                },
            });

            setServices(response.data.data);
        } catch (error: any) {
            console.log("Erro ao pesquisar serviços: ", error);

            Toast.show({
                type: "error",
                text1: "Erro ao pesquisar por serviços",
                text2: "Tente novamente",
            });
        } finally {
            setLoading(false);
        }
    }

    function getFirstName(): string {
        return user?.name?.split(" ")[0] ?? "";
    }

    function goToNextScreen(item: ServiceType): void {
        router.push({
            pathname: "/(auth)/(new_schedule)/date_time",
            params: item,
        });

        setQuery("");
    }

    return (
        <Container>
            <StatusBar />
            <Header label={`Olá, ${getFirstName()}`} />

            <Text className="mt-7 text-center font-bold text-2xl text-primary-500">Faça seu agendamento</Text>

            <View className="px-6 mt-3">
                <Input
                    label="Serviço"
                    placeholder="Pesquise por um serviço..."
                    onChangeText={setQuery}
                    suffix={() => (
                        <Ionicons
                            name="search-outline"
                            size={23}
                            color={themeColors.primary[500]}
                            style={{ marginLeft: 5 }}
                        />
                    )}
                />
            </View>

            {/* Lista de serviços */}
            <View className="mb-[8rem] pb-3 -mt-3">
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <FlatList
                        className={services.length === 0 ? "min-h-screen" : ""}
                        data={services}
                        keyExtractor={(item: ServiceType): string => String(item.id)}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                className="w-[89%] rounded-xl mx-auto flex flex-row justify-between bg-primary-100 overflow-hidden mb-5 relative"
                                activeOpacity={0.7}
                                style={{
                                    shadowColor: "black",
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.8,
                                    shadowRadius: 5,
                                    elevation: 5,
                                }}
                                onPress={() => goToNextScreen(item)}
                            >
                                {/* Barra colorida lateral */}
                                <View className="h-full w-4 bg-gray-400 absolute"></View>
                                <View className="py-2 flex flex-row w-full justify-between">
                                    {/* Título e descrição */}
                                    <View className="w-[68%] pl-7">
                                        <Text className="font-bold text-pink-500 text-xl mb-2" numberOfLines={1}>
                                            {item.name}
                                        </Text>

                                        <Text className="text-sm text-gray-500" numberOfLines={3}>
                                            {item.description}
                                        </Text>
                                    </View>

                                    {/* Preço e Tempo de duração  */}
                                    <View className="w-[30%] flex flex-col justify-center py-2 gap-y-7">
                                        {/* Preço */}
                                        <View className="flex flex-row pr-3 w-full justify-end gap-x-1">
                                            <Text className="pt-1.5 font-semibold text-gray-500 text-[0.9rem]">R$</Text>
                                            <Text className="text-center text-lg font-bold text-gray-500">
                                                {item.formatted_price.substring(3).trim()}
                                            </Text>
                                        </View>

                                        {/* Tempo de duração */}
                                        <View className="w-full flex flex-row justify-end pr-3 mt-1 gap-x-1">
                                            <Ionicons
                                                name="time-outline"
                                                size={15}
                                                color={themeColors.primary[400]}
                                                style={{ marginTop: 2, opacity: 0.7 }}
                                            />
                                            <Text className="text-primary-400/70">{item.duration_time}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListFooterComponent={loading ? <LoadingIndicator /> : undefined}
                    />
                )}
            </View>
        </Container>
    );
}
