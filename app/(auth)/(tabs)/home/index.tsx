import { ReactElement, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, RefreshControl, Text, TouchableOpacity, View } from "react-native";
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
import { Menu, MenuItem } from "@/components/Menu";
import { Dialog } from "@/components/Dialog";


export default function HomeScreen() {
    const skipGetAppointments = useRef(false);
    const apiEndpoint = '/appointments';
    const { user } = useUser();
    let { toast } = useLocalSearchParams<{ toast?: string }>();
    const [appointments, setAppointment] = useState<AppointmentType[]>([]);
    const [hasMoreAppointments, setHasMoreAppointments] = useState<boolean>(false);
    const [loadingAppointments, setLoadingAppointments] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loadingMoreAppointments, setLoadingMoreAppointments] = useState<boolean>(false);
    const [appointmentMenu, setAppointmentMenu] = useState<{ [key: string]: boolean }>({});
    const [menuActionLoading, setMenuActionLoading] = useState<{ [key: string]: boolean }>({});
    const [showAppointmentCancellationConfirmationModal, setShowAppointmentCancellationConfirmationModal] = useState<boolean>(false);
    const [appointmentIdToCancel, setAppointmentIdToCancel] = useState<string | number | null>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    useEffect(() => {
        const toastObj: ToastShowParams = JSON.parse(toast || "{}");
        if (Object.keys(toastObj).length > 0) {
            Toast.show(toastObj);
            toast = undefined;
        }

        if (skipGetAppointments.current) {
            skipGetAppointments.current = false;
            return;
        }

        handleGetAppointments();
    }, []);

    async function getAppointmentsApi(page: number = 1): Promise<AxiosResponse> {
        return await api.get(apiEndpoint, {
            params: {
                page: page
            }
        })
    }

    async function handleGetAppointments(skipLoading: boolean = false): Promise<void> {
        try {

            if (!skipLoading) {
                setLoadingAppointments(true);
            }

            const response: AxiosResponse = await getAppointmentsApi();

            if (response.status === 200) {
                if (currentPage !== response.data.page) {
                    skipGetAppointments.current = true;
                    setCurrentPage(response.data.meta.current_page);
                }

                setHasMoreAppointments(!!response.data.links.next);

                if (response.data.meta.current_page === 1) {
                    setAppointment([...response.data.data]);
                    return;
                }

                setAppointment([...appointments, ...response.data.data]);
            }

        } catch (error: any) {
            console.log(error)

            Toast.show({
                type: "error",
                text1: "Erro ao buscar agendamentos. Tente novamente",
                text2: error.message
            })
        } finally {
            setLoadingAppointments(false);
        }
    }

    async function loadMoreAppointments(): Promise<void> {
        if (loadingMoreAppointments) return;

        setLoadingMoreAppointments(true);

        if (hasMoreAppointments) {
            const page = currentPage + 1;
            setCurrentPage(page);
            const result: AxiosResponse = await getAppointmentsApi(page);

            if (result.status === 200) {
                setHasMoreAppointments(!!result.data.links.next);

                const resultAppointments: AppointmentType[] = result.data.data.filter((appointment: AppointmentType) => {
                    return !appointments.find((a: AppointmentType) => a.id === appointment.id);
                });

                setAppointment([...appointments, ...resultAppointments]);
            }
        }

        setLoadingMoreAppointments(false);
    }

    async function onRefresh(): Promise<void> {
        setRefreshing(true);
        await handleGetAppointments(true);
        setRefreshing(false);
    }

    async function cancelAppointment(id: string | number): Promise<void> {
        if (menuActionLoading[id] || refreshing) return;

        setMenuActionLoadingState(id, true)

        try {
            const response: AxiosResponse = await api.delete(`/appointments/${id}`);

            if (response.status === 200) {

                const filteredAppointments: AppointmentType[] = appointments.filter((appointment: AppointmentType): boolean => appointment.id !== id)

                setAppointment(filteredAppointments);

                Toast.show({
                    type: "success",
                    text1: "Sucesso",
                    text2: response.data.message
                });
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Erro ao tentar cancelar o agendamento",
                text2: "Tente novamente"
            })

            console.log("Erro ao cancelar agendamento:", error);
        } finally {
            setAppointmentMenu({});
            setMenuActionLoadingState(id, false)
            setAppointmentIdToCancel(null)
            setShowAppointmentCancellationConfirmationModal(false);
        }

    }

    function getFirstName(): string {
        return user?.name?.split(" ")[0] || "";
    }

    function MenuAnchor(id: string | number): ReactElement {
        return (
            <TouchableOpacity
                onPress={() => visibleMenu(id, true)}
                activeOpacity={0.6}
            >
                <Ionicons
                    name="ellipsis-vertical-sharp"
                    size={26}
                    color={themeColors.primary[400]}
                />
            </TouchableOpacity>
        )
    }

    function visibleMenu(id: string | number, visible: boolean): void {
        setAppointmentMenu({
            ...appointmentMenu,
            [id]: visible ? !appointmentMenu[id] : visible
        })
    }

    function setMenuActionLoadingState(id: string | number, loading: boolean): void {
        setMenuActionLoading({
            ...menuActionLoading,
            [id]: loading
        })
    }

    function AppointmentCancellationConfirmationModal(): ReactElement {
        return (
            <Dialog
                label="Deseja realmente cancelar?"
                visible={showAppointmentCancellationConfirmationModal}
                onClose={setShowAppointmentCancellationConfirmationModal}
                onConfirm={() => cancelAppointment(appointmentIdToCancel!)}
                loading={menuActionLoading[appointmentIdToCancel!]}
            />
        )
    }

    return (
        <View className="flex-1">
            <StatusBar/>

            <Container>
                <Header label={`Olá, ${getFirstName()}`}/>

                <Text className="mt-7 text-center font-bold text-2xl text-primary-500">Meus agendamentos</Text>

                {/* Lista de agendamentos */}
                <View className="mt-1.5 mb-[8rem] py-3">
                    { loadingAppointments ? (
                        <ActivityIndicator color={themeColors.primary[400]} size="large" />
                    ) : (
                        <FlatList
                            className={appointments.length === 0 ? "min-h-screen" : ''}
                            data={appointments}
                            keyExtractor={(item: AppointmentType): string => item.id.toString()}
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
                                                    style={{ marginTop: 2, opacity: 0.7 }}
                                                />
                                                <Text className="text-primary-400/70">{item.service.duration_time}</Text>
                                            </View>
                                        </View>

                                        {/* Menu */}
                                        <View className="flex justify-center w-1/12">

                                            <Menu
                                                visible={appointmentMenu[item.id]}
                                                closeMenu={() => visibleMenu(item.id, false)}
                                                anchor={MenuAnchor(item.id)}
                                            >
                                                {/* Botões do menu */}
                                                <MenuItem
                                                    title="Cancelar"
                                                    icon="close-circle-outline"
                                                    loading={menuActionLoading[item.id]}
                                                    onPress={() => {
                                                        setAppointmentIdToCancel(item.id);
                                                        setShowAppointmentCancellationConfirmationModal(true);
                                                    }}
                                                />
                                            </Menu>
                                        </View>
                                    </View>
                                </View>
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={[themeColors.primary[500]]}
                                />
                            }
                            ListEmptyComponent={<Text className="text-center text-gray-600">Nenhum agendamento encontrado.</Text>}
                            onEndReached={loadMoreAppointments}
                            onEndReachedThreshold={0.1}
                            ListFooterComponent={loadingMoreAppointments ? (
                                <ActivityIndicator color={themeColors.primary[400]} size="large" style={{paddingBottom: 20}} />
                            ) : null}
                        />
                    )}
                </View>

                <AppointmentCancellationConfirmationModal />
            </Container>
        </View>
    );
}
