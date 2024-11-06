import { View, TextInput, Text, TextInputProps } from 'react-native'

export interface InputProps extends TextInputProps {
    label?: string;
}

export function Input(props: InputProps) {
    return (
        <View className="relative">
            <TextInput
                className="bg-transparent px-4 border border-primary-500 h-14 rounded-xl text-pink-500 text-lg font-bold placeholder:text-primary-500 placeholder:font-normal"
                {...props}
            />
            <Text className="bg-primary-300 absolute left-3 -top-3 text-pink-500 px-1.5 font-semibold text-sm">{props.label}</Text>
        </View>
    )
}