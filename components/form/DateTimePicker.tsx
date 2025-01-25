import { Pressable, View } from "react-native";
import BaseDateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import themeColors from "@/styles/themeColors";
import { Input } from "./input";
import Ionicons from "@expo/vector-icons/Ionicons";

interface DateTimePickerProps {
    label?: string;
    visible: boolean;
    value: Date;
    mode?: "date" | "time" | "datetime" | "countdown";
    onValueChange: (date: Date, event: DateTimePickerEvent) => void;
    setVisible: (visible: boolean) => void;
    minimumDate?: Date;
    maximumDate?: Date;
}

export default function DateTimePicker({ mode = "datetime", ...props }: DateTimePickerProps) {
    const onChange = (event: any, selectedDate: any) => {
        if (event.type === "dismissed") {
            props.setVisible(false);
            return;
        }

        props.setVisible(false);
        props.onValueChange(selectedDate, event);
    };

    return (
        <View>
            <Pressable onPress={() => props.setVisible(true)}>
                <Input
                    label={props.label}
                    value={props.value.toLocaleDateString("pt-BR")}
                    readOnly={true}
                    suffix={() => <Ionicons name="calendar-outline" size={24} color={themeColors.primary[500]} />}
                />
            </Pressable>

            {props.visible && (
                <BaseDateTimePicker
                    mode={mode}
                    value={props.value}
                    onChange={onChange}
                    minimumDate={props.minimumDate}
                    maximumDate={props.maximumDate}
                    is24Hour={true}
                />
            )}
        </View>
    );
}
