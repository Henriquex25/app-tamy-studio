import { View, Text, FlatList } from "react-native";

export default function DateList() {
    function isSelected(value: string) {
        return value === "1";
    }

    return (
        <View className="w-full px-2 mt-2">
            <FlatList
                data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }]}
                keyExtractor={() => Math.random().toString() + Date.now().toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View
                        className={`w-28 h-20 rounded-xl mx-1 flex items-center justify-center ${
                            isSelected(String(item.id)) ? "bg-primary-400" : ""
                        }`}
                    >
                        <Text className="text-sm font-semibold text-gray-700 mb-0.5">Seg</Text>
                        <Text className="font-bold text-gray-700 mt-1">01 jun/24</Text>
                    </View>
                )}
            />
        </View>
    );
}
