import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { ComponentProps, ReactElement, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "@/styles/themeColors";
import { Modal as RNModal } from "react-native";

export type PickerValue = {
    value: string | number;
};

export type PickerItemProps = PickerValue & {
    label: string;
    disabled?: boolean;
};

interface PickerProps extends ComponentProps<any> {
    label?: string;
    errorMessage?: string;
    placeholder?: string;
    value: string | number;
    options: PickerItemProps[];
    onChange?: (value: string | number) => void;
    selectablePlaceholder?: boolean;
}

export function Picker({ selectablePlaceholder = false, placeholder = "Selecione...", ...props }: PickerProps) {
    const [selectedValue, setSelectedValue] = useState<{ label: string; value: string | number }>({
        label: "",
        value: "",
    });
    const [visible, setVisible] = useState<boolean>(false);

    function openPickerItemList() {
        setVisible(true);
    }

    function closePickerItemList() {
        setVisible(false);
    }

    const PickerModal = (): ReactElement => {
        return (
            <RNModal animationType="fade" transparent={true} visible={visible} onRequestClose={closePickerItemList}>
                <Pressable
                    className={`flex-1 flex items-center w-screen fixed justify-center px-4 bg-black/60`}
                    onPress={closePickerItemList}
                >
                    <View className="bg-primary-200 mx-auto w-11/12 rounded-3xl py-1 overflow-hidden h-[50%]">
                        <ScrollView className="py-2">
                            {props.options.map((item, index) => (
                                <Item {...item} key={`${index}_${item.value}`} />
                            ))}
                        </ScrollView>
                    </View>
                </Pressable>
            </RNModal>
        );
    };

    const Item = (payload: PickerItemProps): ReactElement => {
        function selectedItem() {
            setSelectedValue({
                label: payload.label,
                value: payload.value,
            });

            if (props.onChange) {
                const resolvedValue: string | number =
                    typeof props.value === "string" ? payload.value : Number(payload.value);

                props.onChange(resolvedValue);
            }

            closePickerItemList();
        }

        return (
            <Pressable className="px-4 py-2 my-1 flex flex-row items-center gap-x-2 " onPress={selectedItem}>
                <View className="w-6">
                    {payload.value === props.value && (
                        <Ionicons name="checkmark" size={20} color={themeColors.primary[500]} />
                    )}
                </View>
                <Text className="text-primary-500 font-semibold">{payload.label}</Text>
            </Pressable>
        );
    };

    return (
        <View className="my-3">
            {/* Input */}
            <Pressable className="bg-transparent w-full rounded" onPress={openPickerItemList}>
                <View className="flex flex-row items-center justify-between px-4 bg-transparent rounded-xl border border-primary-500">
                    {/* Título */}
                    {props.label && (
                        <Text
                            className={
                                "bg-primary-300 absolute left-3 -top-3.5 px-1.5 font-semibold text-[0.9rem] " +
                                (props.errorMessage ? "text-red-500" : "text-pink-500")
                            }
                        >
                            {props.label}
                        </Text>
                    )}

                    {/* Valor selecionado */}
                    <TextInput
                        editable={false}
                        value={selectedValue.label}
                        className="text-primary-500 font-semibold flex-1"
                        placeholder={placeholder}
                        placeholderTextColor={themeColors.primary[400]}
                    />

                    {/* Ícone de remover valor selecionado */}
                    {selectablePlaceholder && selectedValue.label && (
                        <Pressable
                            className="mr-0.5 py-1 px-2"
                            onPress={() => {
                                if (!selectablePlaceholder || !selectedValue.label) return;

                                setSelectedValue({
                                    label: "",
                                    value: "",
                                });
                            }}
                        >
                            <Ionicons name="close" size={20} color={themeColors.primary[500]} />
                        </Pressable>
                    )}

                    {/* Ícone */}
                    <Ionicons name="chevron-down-outline" size={20} color={themeColors.primary[500]} />
                </View>
            </Pressable>

            {/* List of items */}
            <PickerModal />
        </View>
    );
}
