import { useState, useEffect, forwardRef, ReactElement } from "react";
import { Text, TouchableOpacity, View, Image, Pressable } from "react-native";
import { Container } from "@/components/Container";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { StatusBar } from "@/components/StatusBar";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";
import { Dialog } from "@/components/Dialog";
import { Link, useLocalSearchParams } from "expo-router";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

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
    const { user, cachedAvatarFilePath, uploadAvatar, deleteAvatar } = useUser();
    const [showConfirmLogoutModal, setShowConfirmLogoutModal] = useState<boolean>(false);
    const [showRemoveAvatarModal, setShowRemoveAvatarModal] = useState<boolean>(false);
    const [avatarValidationErrors, setAvatarValidationErrors] = useState<{ avatar?: string[] }>({});
    const router = useRouter();
    let { toast }: { toast?: string } | undefined = useLocalSearchParams<{ toast?: string }>();

    useEffect(() => {
        const toastObj: ToastShowParams = JSON.parse(toast || "{}");

        if (Object.keys(toastObj).length > 0) {
            Toast.show(toastObj);
            toast = undefined;
        }
    }, [toast]);

    async function pickImage(): Promise<void> {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const response: any = await uploadAvatar(result.assets[0].uri);

            if (response.data?.hasOwnProperty("errors")) {
                setAvatarValidationErrors({});

                setAvatarValidationErrors(response.data.errors);
            }
        }
    }

    const Button = forwardRef<any, ButtonProps>(({ withDivider = true, ...props }, ref): ReactElement => {
        const labelColor = props.labelColor || themeColors.primary[500];

        return (
            <TouchableOpacity ref={ref} onPress={props.onPress}>
                <View
                    className={`flex flex-row items-center pb-3.5 mb-3.5 ${
                        withDivider && "border-b border-primary-500/35"
                    }`}
                >
                    <Ionicons name={props.icon} size={31} color={labelColor} className="mr-4" />
                    <Text className="font-semibold flex-1 text-xl" style={{ color: labelColor }} numberOfLines={2}>
                        {props.label}
                    </Text>
                    <Ionicons name="chevron-forward" size={24} color={labelColor} />
                </View>
            </TouchableOpacity>
        );
    });

    function ConfirmLogoutModal(): ReactElement {
        return (
            <Dialog
                type="bottom"
                label="Deseja realmente sair da sua conta?"
                onConfirm={() => {
                    setShowConfirmLogoutModal(false);
                    logout();
                }}
                visible={showConfirmLogoutModal}
                hide={setShowConfirmLogoutModal}
                isLoading={isLoading}
            />
        );
    }

    function ConfirmRemoveAvatarModal(): ReactElement {
        return (
            <Dialog
                label="Deseja realmente remover sua foto?"
                onConfirm={() => {
                    setShowRemoveAvatarModal(false);
                    deleteAvatar();
                }}
                visible={showRemoveAvatarModal}
                hide={setShowRemoveAvatarModal}
                isLoading={isLoading}
            />
        );
    }

    return (
        <Container>
            <StatusBar color="dark" />

            <View>
                {/* Avatar */}
                <View className="my-10">
                    {cachedAvatarFilePath ? (
                        <Pressable
                            className="self-center flex justify-center items-center"
                            onPress={() => {
                                if (!cachedAvatarFilePath) return;
                                setShowRemoveAvatarModal(true);
                            }}
                        >
                            <Image
                                source={{ uri: cachedAvatarFilePath }}
                                className="w-32 h-32 rounded-full object-cover object-center"
                            />
                        </Pressable>
                    ) : (
                        <Pressable
                            className="relative bg-primary-400/60 p-8 rounded-full self-center flex justify-center items-center"
                            onPress={pickImage}
                        >
                            <Ionicons name="person-outline" size={29} color="black" />

                            <View className="absolute -bottom-1 right-1 bg-primary-300 rounded-full p-0.5">
                                <Ionicons name="add-circle-outline" size={26} color="black" />
                            </View>
                        </Pressable>
                    )}

                    {avatarValidationErrors.avatar?.[0] && (
                        <View className="flex flex-row items-center justify-center gap-x-2">
                            <Ionicons name="warning-outline" size={24} color="red" className="self-center" />
                            <Text className="text-center text-sm text-red-500 mt-1">
                                {avatarValidationErrors.avatar?.[0]}
                            </Text>
                        </View>
                    )}
                </View>

                {/* Nome */}
                <Text className="text-center text-2xl font-bold text-primary-500">{user?.name}</Text>

                {/* Botões */}
                <View className="mt-8 px-6">
                    <Link href="/(auth)/(modals)/profile/my_record" replace asChild>
                        <Button icon="person-outline" label="Meu cadastro" />
                    </Link>

                    <Link href="/(auth)/(modals)/profile/change_password" replace asChild>
                        <Button icon="key-outline" label="Trocar minha senha" />
                    </Link>

                    <Button
                        icon="log-out-outline"
                        label="Sair da conta"
                        onPress={() => setShowConfirmLogoutModal(true)}
                        withDivider={false}
                        labelColor="red"
                    />
                </View>
            </View>

            <ConfirmLogoutModal />
            <ConfirmRemoveAvatarModal />
        </Container>
    );
}
