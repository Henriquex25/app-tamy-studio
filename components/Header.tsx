import Ionicons from "@expo/vector-icons/Ionicons";
import { Image, Pressable, Text, View } from "react-native";
import themeColors from "@/styles/themeColors";
import { Platform } from "react-native";
import { Link } from "expo-router";
import { useState } from "react";

interface Props {
    label?: string;
}

export default function Header({ label = "Olá, Manuela" }: Props) {
    return (
        <View className="flex flex-row justify-between items-center px-4 mt-7">
            <View className="bg-primary-400/60 w-14 h-14 rounded-full flex justify-center items-center">
                <Link href="/(auth)/(modals)/notification" asChild>
                    <Pressable>
                        <Ionicons name="notifications-outline" size={27} color={themeColors.secondary[800]} />
                    </Pressable>
                </Link>
            </View>

            <View className="flex-1">
                <Text
                    className="text-2xl text-center font-semibold pt-1.5"
                    style={{
                        fontFamily: Platform.select({
                            android: "PlaywriteGBS-Regular",
                            ios: "PlaywriteGBS-Regular",
                        }),
                    }}
                >
                    {label}
                </Text>
            </View>

            <View className="bg-primary-400/60 w-14 h-14 rounded-full flex justify-center items-center">
                <Link href="/(auth)/(modals)/profile" asChild>
                    <Pressable>
                        <Ionicons name="person-outline" size={24} color={themeColors.secondary[800]} />
                    </Pressable>
                </Link>
            </View>
        </View>
    );
}
