import React, { forwardRef } from "react";
import { TouchableOpacity, Text, ActivityIndicator, View } from "react-native";
import themeColors from "@/styles/themeColors";

interface ButtonProps extends React.ComponentProps<typeof TouchableOpacity> {
    label?: string;
    onPress?: () => void;
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    color?: "primary" | "secondary" | "danger" | "transparent" | "custom";
    labelColor?: string;
    prepend?: () => React.ReactNode;
    append?: () => React.ReactNode;
}

const Button = forwardRef<View, ButtonProps>((props, ref) => {
    function getBackgroundColor(): string | undefined {
        if (props.className?.includes("bg-") || props.color === "custom") {
            return;
        }

        const colors = {
            primary: "bg-pink-400",
            secondary: "bg-gray-500",
            danger: "bg-red-500",
            transparent: "bg-transparent",
        };

        return colors[props.color ?? "primary"];
    }

    function getTextColor(): string {
        if (props.color === "custom") {
            return "";
        }

        const colors = {
            primary: "text-gray-800",
            secondary: "text-white",
            danger: "text-white",
            transparent: "text-gray-800",
        };

        return colors[props.color ?? "primary"];
    }

    function getActivityIndicatorColor(): string {
        if (props.color == "custom") {
            return "";
        }

        const colors = {
            primary: "#1f2937",
            secondary: "#fff",
            danger: "#fff",
            transparent: themeColors.primary[400],
        };

        return colors[props.color ?? "primary"];
    }

    return (
        <TouchableOpacity
            ref={ref}
            {...props}
            className={`w-full rounded-3xl ${props.loading ? "pointer-events-none py-2" : "py-3.5"} ${
                props.className ?? ""
            } ${getBackgroundColor()}`}
            activeOpacity={props.activeOpacity ?? 0.7}
            disabled={props.disabled || props.loading}
        >
            <View className="flex flex-row items-center justify-center">
                {props.prepend && props.prepend()}
                {props.label?.length && !props.loading && (
                    <Text className={`font-bold text-xl mr-2.5 ${props.labelColor || getTextColor()}`}>
                        {props.label}
                    </Text>
                )}
                {props.loading && <ActivityIndicator size="large" color={getActivityIndicatorColor()} />}
                {props.children}
                {props.append && props.append()}
            </View>
        </TouchableOpacity>
    );
});

export default Button;
