import React, { useState } from "react";
import { ActivityIndicator, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

interface Props extends React.ComponentProps<typeof Modal> {
    type?: "bottom" | "classic";
    visible: boolean;
    label?: string;
    confirmButtonLabel?: string;
    onConfirm?: () => void;
    loading?: boolean;
    cancelButtonLabel?: string;
    onCancel?: () => void;
    onClose: (visible: boolean) => void;
}

export function Dialog({ confirmButtonLabel = "Sim", cancelButtonLabel = "Não", type = "classic", ...props }: Props) {
    function confirm() {
        if (props.loading) return;

        if (props.onConfirm) {
            props.onConfirm();
        }
    }

    function cancel() {
        if (props.loading) return;

        if (props.onCancel) {
            props.onCancel();
        }

        props.onClose(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={props.visible} onRequestClose={cancel}>
            <Pressable
                className={`flex-1 bg-black/20 flex items-center w-screen fixed ${
                    type === "classic" ? "justify-center px-4" : "justify-end"
                }`}
                onPress={cancel}
            >
                {type === "classic" && (
                    <View className="bg-primary-200 mx-auto w-11/12 rounded-3xl px-4 py-6">
                        <Text className="text-center text-lg font-semibold text-gray-600">{props.label}</Text>

                        <View className="mt-9 self-end flex flex-row items-center justify-center gap-x-5">
                            {/* Cancel Button */}
                            <TouchableOpacity
                                className="h-14 bg-transparent px-6 rounded-lg flex justify-center items-center self-end"
                                activeOpacity={0.75}
                                disabled={props.loading}
                                onPress={cancel}
                            >
                                <Text className="text-gray-700 font-semibold">{cancelButtonLabel}</Text>
                            </TouchableOpacity>

                            {/* Confirm Button */}
                            <TouchableOpacity
                                className="h-14 bg-primary-400 px-6 rounded-lg flex justify-center items-center"
                                activeOpacity={0.75}
                                onPress={confirm}
                                disabled={props.loading}
                            >
                                {!props.loading && (
                                    <Text className="text-white font-semibold">{confirmButtonLabel}</Text>
                                )}
                                {props.loading && <ActivityIndicator size="large" color="white" />}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                {type === "bottom" && (
                    <View className="bg-black/50 px-5 pt-9 pb-7 w-full flex flex-col items-center gap-y-5">
                        {props.label && <Text className="text-gray-200 text-lg self-start">{props.label}</Text>}

                        <TouchableOpacity
                            className="h-16 bg-primary-400 px-5 rounded-xl flex justify-center items-center w-full"
                            activeOpacity={0.75}
                            onPress={confirm}
                            disabled={props.loading}
                        >
                            {!props.loading && (
                                <Text className="text-white font-semibold text-xl">{confirmButtonLabel}</Text>
                            )}
                            {props.loading && <ActivityIndicator size="large" color="white" />}
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="h-16 bg-transparent border border-primary-400 text-primary-400 px-5 rounded-xl flex justify-center items-center w-full"
                            activeOpacity={0.75}
                            disabled={props.loading}
                            onPress={cancel}
                        >
                            <Text className="text-white font-semibold text-xl">{cancelButtonLabel}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
}
