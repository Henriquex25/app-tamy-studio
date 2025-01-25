import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable, TouchableOpacity } from "react-native";
import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePicker from "@/components/form/DateTimePicker";
import Button from "@/components/Button";
import DateList from "@/components/DateList";
import { Ionicons } from "@expo/vector-icons";
import themeColors from "@/styles/themeColors";

export default function DateTime() {
    const [dateTimePickerVisible, setDateTimePickerVisible] = useState<boolean>(false);
    const [date, setDate] = useState<Date>(new Date());
    const service = useLocalSearchParams();

    return (
        <Container>
            <StatusBar color="dark" />

            <View className="mt-3">
                <DateList />
            </View>

            <Text className="mt-6 text-center font-bold text-2xl text-primary-500">Horários disponíveis</Text>

            <View className="mt-4 px-6 flex justify-between flex-1 mb-12">
                <FlatList
                    data={[
                        { time: "08:00" },
                        { time: "09:00" },
                        { time: "10:00" },
                        { time: "11:00" },
                        { time: "12:00" },
                        { time: "13:00" },
                        { time: "14:00" },
                        { time: "15:00" },
                        { time: "16:00" },
                        { time: "17:00" },
                        { time: "18:00" },
                        { time: "19:00" },
                        { time: "20:00" },
                    ]}
                    keyExtractor={() => Math.random().toString() + Date.now().toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            className="w-full mb-2 bg-primary-400 mt-2 h-16 rounded-xl flex flex-row items-center justify-center gap-x-3"
                            activeOpacity={0.65}
                        >
                            <Ionicons name="time-outline" size={21} color="#374151" />
                            <Text className="font-semibold text-lg text-gray-700 -mt-0.5">{item.time}</Text>
                        </TouchableOpacity>
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </Container>
    );
}
