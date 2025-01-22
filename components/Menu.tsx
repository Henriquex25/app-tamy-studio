import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';
import React, { ComponentProps, ReactElement } from "react";
import { Menu as BaseMenu } from "react-native-paper";
import themeColors from "@/styles/themeColors";
import { Ionicons } from "@expo/vector-icons";

interface MenuProps extends ComponentProps<any> {
    visible: boolean;
    closeMenu: () => void;
    anchor: ReactElement;
}

export function Menu({horizontalAlignment = "left", verticalAlignment = "bottom", ...props}: MenuProps) {

    return (
        <View className="flex flex-row justify-center items-center">
            <BaseMenu
                visible={props.visible}
                onDismiss={props.closeMenu}
                anchor={props.anchor}
                contentStyle={{
                    padding: 4,
                    borderRadius: 10,
                    backgroundColor: themeColors.primary[400],
                    borderWidth: 1,
                    borderColor: themeColors.primary[500],
                    width: 'auto',
                    rowGap: 3,
                }}
            >
                {props.children}
            </BaseMenu>
        </View>
    );
}

type IconName = keyof typeof Ionicons.glyphMap;

interface MenuItemProps extends ComponentProps<any> {
    title: string;
    onPress?: () => void;
    icon?: IconName;
    iconSize?: number;
    loading?: boolean;
}

export function MenuItem({ loading = false, ...props}: MenuItemProps): ReactElement {
    return (
        <TouchableOpacity
            className="flex flex-row items-center justify-center gap-x-3 pl-2 pr-3 ml-0.5 mr-1.5 py-2 disabled:opacity-60"
            onPress={() => {
                if (props.loading) return;

                if (props.onPress) {
                    props.onPress();
                }
            }}
            disabled={props.loading}
            activeOpacity={0.7}
        >
            { loading ? (
                <ActivityIndicator color="#4b5563" size="small" style={{ transform: [{ scaleX: 1.16 }, { scaleY: 1.16 }] }} />
            ) : (
                <Ionicons name={props.icon} size={props.iconSize ?? 26} color={"#1f2937"}/>
            )}

            <Text className="text-lg -mt-0.5 text-gray-800 font-semibold">{props.title}</Text>
        </TouchableOpacity>
    );
}