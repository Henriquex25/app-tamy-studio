import React, { useState } from "react";
import {ActivityIndicator, Modal, Pressable, Text, TouchableOpacity, View} from "react-native";

interface Props extends React.ComponentProps<typeof Modal> {
    visible?: boolean;
    label?: string;
    confirmButtonLabel?: string;
    onConfirm?: () => void;
    isLoading?: boolean;
    cancelButtonLabel?: string;
    onCancel?: () => void;
    hide: (visible: boolean) => void;
}

export function Dialog({ confirmButtonLabel = "Sim", cancelButtonLabel = "Não", ...props }: Props) {

    function confirm() {
        if (props.isLoading) return;

        if (props.onConfirm) {
            props.onConfirm();
        }
    }

    function cancel() {
        if (props.isLoading) return;

        if (props.onCancel) {
            props.onCancel();
        }

        props.hide(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={cancel}
        >
            <Pressable className="flex-1 bg-black/15 flex justify-end items-center w-screen fixed" onPress={cancel}>
                <View className="bg-black/50 px-5 pt-9 pb-7 w-full flex flex-col items-center gap-y-5">

                    {props.label && <Text className="text-gray-200 text-lg self-start">{props.label}</Text>}

                    <TouchableOpacity
                        className="h-16 bg-primary-400 px-5 rounded-xl flex justify-center items-center w-full"
                        activeOpacity={0.75}
                        onPress={confirm}
                        disabled={props.isLoading}
                    >
                        {!props.isLoading && <Text className="text-white font-semibold text-xl">{confirmButtonLabel}</Text>}
                        {props.isLoading && <ActivityIndicator size="large" color="white" />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="h-16 bg-transparent border border-primary-400 text-primary-400 px-5 rounded-xl flex justify-center items-center w-full"
                        activeOpacity={0.75}
                        disabled={props.isLoading}
                        onPress={cancel}
                    >
                        <Text className="text-white font-semibold text-xl">{cancelButtonLabel}</Text>
                    </TouchableOpacity>
                </View>
            </Pressable>
        </Modal>
    );
}