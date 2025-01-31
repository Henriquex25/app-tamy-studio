import { View, Text, Dimensions } from 'react-native';
import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import LottieView from 'lottie-react-native';
import { useRef, useEffect } from 'react';
import { Info } from "@/components/Info";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "@/styles/themeColors";
import Button from "@/components/Button";
import { router } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function ScheduledSuccessfully() {

    function gotoHome() {
        router.dismissTo("/(auth)/(tabs)/home");
    }

    return (
        <Container>
            <StatusBar/>

            <View className="flex-1 flex px-4">
                <View className="w-full relative flex items-center mt-20">
                    <LottieView
                        source={require("@/assets/animations/check.json")}
                        autoPlay={true}
                        loop={false}
                        style={{
                            width: 200,
                            height: 200,
                            zIndex: 1,
                        }}
                    />
                </View>

                <View>
                    <Text className="text-primary-500 text-2xl font-bold text-center mt-7">
                        Agendamento realizado com sucesso!
                    </Text>
                </View>

                <View className="justify-self-end mt-14">
                    <Info>
                        <Ionicons name="alert-circle" size={37} color={themeColors.primary[500]}/>
                        <Text className="text-primary-600 ml-5">
                            Caso não possa comparecer na data marcada, por favor, cancele com antecedência.
                        </Text>
                    </Info>
                </View>

                <View className="mt-12">
                    <Button label="Ir para o início" onPress={gotoHome} />
                </View>
            </View>
        </Container>
    );
}