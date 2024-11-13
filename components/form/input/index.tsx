import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, Text, TextInputProps, Pressable } from "react-native";
import themeColors from "@/styles/themeColors";
import { useState } from "react";

export interface InputProps extends TextInputProps {
    label?: string;
}

export function Input(props: InputProps) {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    return (
        <View className="relative">
            <View className="flex flex-row items-center justify-between px-4 bg-transparent border border-primary-500 h-14 rounded-xl">
                <TextInput
                    className="text-pink-500 text-lg font-bold placeholder:text-primary-500 placeholder:font-normal"
                    {...props}
                    secureTextEntry={props.secureTextEntry && !visiblePassword}
                />

                {/* ícones de visibilidade */}
                {props.secureTextEntry && (
                    <Pressable
                        onPress={() => {
                            setVisiblePassword(!visiblePassword);
                        }}
                    >
                        {visiblePassword ? (
                            <Ionicons name="eye-off" size={22} color={themeColors.primary[500]} />
                        ) : (
                            <Ionicons name="eye-outline" size={22} color={themeColors.primary[500]} />
                        )}
                    </Pressable>
                )}
            </View>
            <Text className="bg-primary-300 absolute left-3 -top-3 text-pink-500 px-1.5 font-semibold text-sm">
                {props.label}
            </Text>
        </View>
    );
}
