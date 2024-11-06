import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "@/components/StatusBar";

export default function LoadingScreen() {
    return (
        <View
            className="flex-1 justify-center items-center gap-y-3.5 bg-primary-300"
        >
            <StatusBar />
            <ActivityIndicator size={45} className="text-gray-700" />
            <Text className="font-bold text-gray-700">Carregando...</Text>
        </View>
    );
};
