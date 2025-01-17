import { useState, useEffect, forwardRef } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Container } from "@/components/Container";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { StatusBar } from "@/components/StatusBar";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";
import { Dialog } from "@/components/Dialog";
import { Link, useLocalSearchParams } from "expo-router";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { useRouter } from 'expo-router';

type IconName = keyof typeof Ionicons.glyphMap;

interface ButtonProps {
    icon: IconName;
    label: string;
    labelColor?: string;
    withDivider?: boolean;
    onPress?: () => void;
}

export default function Profile() {
    const { logout, isLoading } = useAuth();
    const { user } = useUser();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const router = useRouter();
    let { toast }: { toast?: string } | undefined = useLocalSearchParams<{ toast?: string }>();

    useEffect(() => {
        const toastObj: ToastShowParams = JSON.parse(toast || "{}");

        if (Object.keys(toastObj).length > 0) {
            Toast.show(toastObj);
            toast = undefined;
        }

    }, [toast]);

    const Button = forwardRef<any, ButtonProps>(({ withDivider = true, ...props }, ref) => {
        const labelColor = props.labelColor || themeColors.primary[500];

        return (
            <TouchableOpacity ref={ref} onPress={props.onPress}>
                <View
                    className={`flex flex-row items-center pb-3.5 mb-3.5 ${
                        withDivider && "border-b border-primary-500/35"
                    }`}
                >
                    <Ionicons name={props.icon} size={31} color={labelColor} className="mr-4"/>
                    <Text className="font-semibold flex-1 text-xl" style={{ color: labelColor }}>
                        {props.label}
                    </Text>
                    <Ionicons name="chevron-forward" size={24} color={labelColor}/>
                </View>
            </TouchableOpacity>
        );
    });

    function ConfirmLogoutModal() {
        return (
            <Dialog
                label="Deseja realmente sair da sua conta?"
                onConfirm={logout}
                visible={modalVisible}
                hide={setModalVisible}
                isLoading={isLoading}
            />
        )
    }

    return (
        <Container>
            <StatusBar color="dark"/>

            <View>
                {/* Foto */}
                <View className="my-10">
                    <Image source={require("@/assets/images/logo.png")} className="w-28 h-28 self-center"/>
                </View>

                {/* Nome */}
                <Text className="text-center text-2xl font-bold text-primary-500">{user?.name}</Text>

                {/* Botões */}
                <View className="mt-8 px-6">

                    <Link href="/(auth)/(modals)/profile/my_record" asChild>
                        <Button icon="person-outline" label="Meu cadastro"/>
                    </Link>

                    <Link href="/(auth)/(modals)/profile/change_password" asChild>
                        <Button icon="key-outline" label="Trocar minha senha"/>
                    </Link>

                    <Button
                        icon="log-out-outline"
                        label="Sair da conta"
                        onPress={() => setModalVisible(true)}
                        withDivider={false}
                        labelColor="red"
                    />
                </View>
            </View>

            <ConfirmLogoutModal/>
        </Container>
    );
}
