import { useState, useEffect, useRef } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { StatusBar } from "@/components/StatusBar";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";
import { Container } from "@/components/Container";
import { useLocalSearchParams } from "expo-router";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { useUser } from "@/contexts/UserContext";
import { AppointmentType } from "@/types/Appointment";
import api from "@/services/api";
import { AxiosResponse } from "axios";
import * as SecureStore from "expo-secure-store";


export default function HomeScreen() {
    const skipGetAppointments = useRef(false);
    const apiEndpoint = '/appointments';
    const {user} = useUser();
    const [appointments, setAppointment] = useState<AppointmentType[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    let {toast} = useLocalSearchParams<{ toast?: string }>();

    useEffect(() => {
        const toastObj: ToastShowParams = JSON.parse(toast || "{}");
        if (Object.keys(toastObj).length > 0) {
            Toast.show(toastObj);
            toast = undefined;
        }
    }, []);

    useEffect(() => {
        if (skipGetAppointments.current) {
            skipGetAppointments.current = false;
            return;
        }

        getAppointmentsApi();
    }, [currentPage]);

    function getFirstName(): string {
        return user?.name?.split(" ")[0] || "";
    }

    async function getAppointmentsApi(): Promise<void> {
        try {
            const response: AxiosResponse = await api.post(apiEndpoint, {
                page: currentPage
            })

            if (response.status === 200) {
                if (currentPage !== response.data.page) {
                    skipGetAppointments.current = true;
                    setCurrentPage(response.data.page);
                }

                setAppointment(response.data.data);

                console.log(appointments)
            }

            console.log(response.data)
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <View className="flex-1">
            <StatusBar/>

            <Container>
                <Header label={`Olá, ${getFirstName()}`}/>

                <Text className="mt-8 text-center font-bold text-2xl text-primary-500">Meus agendamentos</Text>

                {/* Lista de agendamentos */}
                <View className="mt-10">
                    <FlatList
                        data={appointments}
                        keyExtractor={(item: AppointmentType): string => item.id.toString()}
                        renderItem={({item}) => (
                            <View
                                className="w-[89%] rounded-xl mx-auto flex flex-row bg-gray-50 overflow-hidden mb-5"
                                style={{
                                    shadowColor: "black",
                                    shadowOffset: {width: 0, height: 3},
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
                                            {item.service.name}
                                        </Text>
                                        <Text className="text-gray-500 mx-auto font-semibold">
                                            {`${item.scheduled_at.substring(0, 10).trim()} - ${item.scheduled_at.substring(10).trim()}`}
                                        </Text>
                                    </View>

                                    {/* Preço e tempo restante */}
                                    <View className="w-4/12 flex flex-col">
                                        {/* Preço */}
                                        <View className="flex flex-row pr-1.5 w-full justify-end gap-x-1">
                                            <Text className="pt-1.5 font-semibold text-gray-400 text-[0.9rem]">R$</Text>
                                            <Text className="text-center text-lg font-bold text-gray-400">
                                                {item.service.formated_price.substring(3).trim()}
                                            </Text>
                                        </View>

                                        {/* Tempo de duração */}
                                        <View className="w-full flex flex-row justify-center items-center mt-1 gap-x-1">
                                            <Ionicons
                                                name="time-outline"
                                                size={15}
                                                color={themeColors.primary[400]}
                                                style={{marginTop: 2, opacity: 0.7}}
                                            />
                                            <Text className="text-primary-400/70">{item.service.duration_time}</Text>
                                        </View>
                                    </View>

                                    {/* Botão */}
                                    <View className="flex justify-center w-1/12">
                                        <TouchableOpacity
                                            onPress={() => {
                                            }} activeOpacity={0.6}
                                        >
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
