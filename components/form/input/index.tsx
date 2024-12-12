import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, Text, TextInputProps, Pressable } from "react-native";
import themeColors from "@/styles/themeColors";
import { useState } from "react";

export interface InputProps extends TextInputProps {
    label?: string;
    errorMessage?: string;
}

export function Input(props: InputProps) {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    return (
        <View className="relative">
            <View
                className={
                    "flex flex-row items-center justify-between px-4 bg-transparent h-14 rounded-xl " +
                    (props.errorMessage ? "border-2 border-red-500" : "border border-primary-500")
                }
            >
                {/* Título */}
                <Text
                    className={
                        "bg-primary-300 absolute left-3 -top-3 px-1.5 font-semibold text-sm " +
                        (props.errorMessage ? "text-red-500" : "text-pink-500")
                    }
                >
                    {props.label}
                </Text>

                <TextInput
                    className={
                        "text-lg font-bold placeholder:font-normal flex-1 " +
                        (props.errorMessage
                            ? "text-red-500 placeholder:text-red-500"
                            : "text-pink-500 placeholder:text-primary-500")
                    }
                    {...props}
                    secureTextEntry={props.secureTextEntry && !visiblePassword}
                    autoCapitalize={
                        props.secureTextEntry && props.autoCapitalize === undefined ? "none" : props.autoCapitalize
                    }
                />

                {/* ícones de visibilidade */}
                {props.secureTextEntry && (
                    <Pressable
                        onPress={() => {
                            setVisiblePassword(!visiblePassword);
                        }}
                    >
                        {visiblePassword ? (
                            <Ionicons
                                name="eye-off"
                                size={22}
                                color={props.errorMessage ? "red" : themeColors.primary[500]}
                            />
                        ) : (
                            <Ionicons
                                name="eye-outline"
                                size={22}
                                color={props.errorMessage ? "red" : themeColors.primary[500]}
                            />
                        )}
                    </Pressable>
                )}
            </View>

            {/* Mensagem de erro */}
            <Text className="text-red-500 font-semibold text-sm px-2 mt-1" numberOfLines={2}>
                {props.errorMessage ?? ""}
            </Text>
        </View>
    );
}
