import { View } from "react-native";
import React from "react";

interface ContainerProps {
    center?: boolean;
    children: React.ReactNode;
}

export function Container({ center = false, ...props }: ContainerProps) {
    const getAlignment = (): string => {
        if (center) {
            return "items-center justify-center";
        }

        return "";
    };

    return <View className={`flex-1 bg-primary-300 ${getAlignment()}`}>{props.children}</View>;
}
