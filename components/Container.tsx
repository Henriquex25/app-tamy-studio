import { View } from "react-native";
import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
    return <View className="flex-1 bg-primary-300">{children}</View>;
}