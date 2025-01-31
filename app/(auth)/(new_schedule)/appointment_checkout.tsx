import { View, Text } from 'react-native';
import { ReactElement } from "react";
import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import { Info } from "@/components/Info";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "@/styles/themeColors";
import Button from "@/components/Button";
import { router } from "expo-router";

interface InputGroupProps {
    label: string;
    value: string;
    withVerticalMargin?: boolean;
}

export default function AppointmentCheckout(): ReactElement {

    function goToScheduledSuccessfully() {
        router.navigate("/(auth)/(new_schedule)/scheduled_successfully");
    }

    const InputGroup = ({ withVerticalMargin = true, ...props }: InputGroupProps): ReactElement => {
        const getVerticalMargin = (): string => {
            return withVerticalMargin ? "mb-2.5" : "";
        }

        return (
            <View className={getVerticalMargin()}>
                <Text className="text-primary-500 text-lg font-bold">{props.label}</Text>
                <Text className="text-gray-600/80 font-semibold">{props.value}</Text>
            </View>
        )
    }

    return (
        <Container>
            <StatusBar color="dark" />

            <View className="w-full h-full p-6 flex flex-col justify-center -mt-10">
                <View>
                    <Info>
                        <Ionicons name="alert-circle" size={37} color={themeColors.primary[500]}/>
                        <Text className="text-primary-600 ml-5">
                            Verifique se os dados estão corretos e confirme o seu agendamento.
                        </Text>
                    </Info>
                </View>

                <View className="mt-6">
                    <Info center={false} direction="col">
                        {/* Data e hora */}
                        <View className="flex flex-row justify-between">
                            <InputGroup label="Data" value="31/01/2025" />
                            <InputGroup label="Hora" value="15:00" />
                        </View>

                        {/* Serviço */}
                        <InputGroup label="Serviço" value="Corte de cabelo" />

                        {/* Duração */}
                        <InputGroup label="Tempo médio de duração" value="01:30" />

                        {/* Preço */}
                        <InputGroup label="Preço" value="R$ 50,00" withVerticalMargin={false} />
                    </Info>
                </View>

                <View className="mt-10">
                    <Button label="Agendar" onPress={goToScheduledSuccessfully} />
                </View>
            </View>
        </Container>
    );
}