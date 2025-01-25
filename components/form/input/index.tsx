import { Ionicons } from "@expo/vector-icons";
import { View, TextInput, Text, TextInputProps, Pressable } from "react-native";
import themeColors from "@/styles/themeColors";
import { ReactElement, useState } from "react";
import { mask } from "react-native-mask-text";

export interface InputProps extends TextInputProps {
    type?: "text" | "password";
    label?: string;
    errorMessage?: string;
    required?: boolean;
    mask?: string;
    placeholder?: string;
    prefix?: string | (() => ReactElement);
    suffix?: string | (() => ReactElement);
}

export function Input({ type = "text", ...props }: InputProps) {
    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    function getTextColor(): string {
        return props.errorMessage
            ? "text-red-500 placeholder:text-red-500"
            : "text-pink-500 placeholder:text-primary-500";
    }

    function getUneditableClass(): string {
        return props.editable === false ? "opacity-85" : "";
    }

    return (
        <View className="relative mt-3 mb-2">
            <View
                className={
                    "flex flex-row items-center justify-between px-4 bg-transparent h-16 rounded-xl w-full " +
                    (props.errorMessage ? "border-2 border-red-500" : "border border-primary-500 ")
                }
            >
                {/* Título */}
                {props.label && (
                    <Text
                        className={
                            "bg-primary-300 absolute left-3 -top-3.5 px-1.5 font-semibold text-[0.95rem] " +
                            (props.errorMessage ? "text-red-500" : "text-pink-500")
                        }
                    >
                        {props.label}
                        {props.required && <Text className="text-red-600">*</Text>}
                    </Text>
                )}

                {/* Prefixo */}
                {props.prefix && typeof props.prefix === "string" && (
                    <Text className="text-lg font-bold text-pink-500 mr-1">{props.prefix}</Text>
                )}
                {props.prefix && typeof props.prefix === "function" && <props.prefix />}

                {(type === "text" || type === "password") && (
                    <TextInput
                        className={`text-lg font-semibold flex-1 ${getTextColor()} ${getUneditableClass()}`}
                        {...props}
                        secureTextEntry={type === "password" && !visiblePassword}
                        autoCapitalize={
                            type === "password" && props.autoCapitalize === undefined ? "none" : props.autoCapitalize
                        }
                        onChangeText={(text) =>
                            props.mask ? props.onChangeText?.(mask(text, props.mask)) : props.onChangeText?.(text)
                        }
                        placeholder={props.placeholder}
                        placeholderTextColor={themeColors.primary[400]}
                        readOnly={props.readOnly}
                    />
                )}

                {/* ícones de visibilidade */}
                {type === "password" && (
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

                {/* Sufixo */}
                {props.suffix && typeof props.suffix === "string" && (
                    <Text className="text-lg font-bold text-pink-500 ">{props.suffix}</Text>
                )}
                {props.suffix && typeof props.suffix === "function" && <props.suffix />}
            </View>

            {/* Mensagem de erro */}
            <Text className="text-red-500 font-semibold text-sm px-2 mt-1" numberOfLines={2}>
                {props.errorMessage ?? ""}
            </Text>
        </View>
    );
}
