import { View, Text, FlatList, Animated, Dimensions } from "react-native";
import { useRef } from "react";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const { width } = Dimensions.get('window'); // Largura da tela
const ITEM_WIDTH = 100; // Largura de cada item
const SPACING: number = (width - ITEM_WIDTH) / 2; // Espaçamento para centralizar o item

interface DateListProps {
    loading: boolean;
    dates: { id: number }[];
    loadMoreDates: () => void;
    onChange: (index: number) => void;
}

export default function DateList({... props}: DateListProps) {
    const scrollX = useRef(new Animated.Value(0)).current;

    return (
        <View className="w-full mt-2">
            <Animated.FlatList
                data={props.dates}
                keyExtractor={(item, index) => item.hasOwnProperty('id') ? item.id.toString() : index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: props.dates?.length ? SPACING : 0,
                    width: props.dates?.length ?  "auto" : "100%"
                }}
                snapToInterval={ITEM_WIDTH} // Encaixa o scroll no intervalo de cada item
                decelerationRate="fast"
                bounces={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                onMomentumScrollEnd={(event) => {
                    const offsetX = event.nativeEvent.contentOffset.x;
                    const newIndex = Math.round(offsetX / ITEM_WIDTH);
                    props.onChange(newIndex); // Atualiza o estado
                }}
                onEndReached={props.loadMoreDates}
                onEndReachedThreshold={0.1}
                renderItem={({ item, index }) => {
                    const inputRange = [
                        (index - 1) * ITEM_WIDTH,
                        index * ITEM_WIDTH,
                        (index + 1) * ITEM_WIDTH,
                    ];
                    const scale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.8, 1, 0.8],
                        extrapolate: 'clamp',
                    });
                    const opacity = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.35, 1, 0.35],
                        extrapolate: 'clamp',
                    });

                    return (
                        <Animated.View
                            className="bg-primary-400"
                            style={{
                                transform: [{ scale }],
                                opacity,
                                width: ITEM_WIDTH,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                                marginHorizontal: 1,
                                padding: 10,
                            }}
                        >
                            <Text className="text-sm font-semibold text-gray-700 mb-0.5">Seg</Text>
                            <Text className="font-bold text-gray-700 mt-1">01 jun/24</Text>
                        </Animated.View>
                    )
                }}
                ListEmptyComponent={<View className="w-full flex flex-row items-center justify-center">
                        <Text className="pr-2 text-2xl">😕</Text>
                        <Text className="text-gray-700 text-center opacity-70">Nenhuma data disponível</Text>
                </View>}
                ListFooterComponent={props.loading ? <LoadingIndicator /> : undefined}
            />
        </View>
    );
}
