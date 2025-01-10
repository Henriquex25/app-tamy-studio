import { Text, TouchableOpacity, View, Image } from "react-native";
import { Container } from "@/components/Container";
import { useAuth } from "@/contexts/AuthContext";
import { useUser } from "@/contexts/UserContext";
import { StatusBar } from "@/components/StatusBar";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";

type IconName = keyof typeof Ionicons.glyphMap;

interface ButtonProps {
    icon: IconName;
    label: string;
    labelColor?: string;
    withDivider?: boolean;
    onPress: () => void;
}

export default function Profile() {
    const { logout } = useAuth();
    const { user } = useUser();

    function Button({ withDivider = true, ...props }: ButtonProps) {
        const labelColor = props.labelColor || themeColors.primary[500];

        return (
            <TouchableOpacity onPress={props.onPress}>
                <View
                    className={`flex flex-row items-center pb-3.5 mb-3.5 ${
                        withDivider && "border-b border-primary-500"
                    }`}
                >
                    <Ionicons name={props.icon} size={31} color={labelColor} className="mr-4" />
                    <Text className="font-semibold flex-1 text-xl" style={{ color: labelColor }}>
                        {props.label}
                    </Text>
                    <Ionicons name="chevron-forward" size={24} color={labelColor} />
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            <StatusBar color="dark" />

            <View>
                {/* Foto */}
                <View className="my-10">
                    <Image source={require("@/assets/images/logo.png")} className="w-28 h-28 self-center" />
                </View>

                {/* Nome */}
                <Text className="text-center text-2xl font-bold text-primary-500">{user?.name}</Text>

                {/* Botões */}
                <View className="mt-8 px-6">
                    <Button icon="person-outline" label="Meu cadastro" onPress={logout} />
                    <Button icon="key-outline" label="Trocar minha senha" onPress={logout} />
                    <Button
                        icon="log-out-outline"
                        label="Sair da conta"
                        onPress={logout}
                        withDivider={false}
                        labelColor="red"
                    />
                </View>
            </View>
        </Container>
    );
}
