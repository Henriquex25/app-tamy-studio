import { View, Text, ViewProps } from 'react-native';

interface SectionProps extends ViewProps {
    center?: boolean,
    direction?: "row" | "col"
}

export function Info({center = true, direction = "row", ...props}: SectionProps) {
    const getAlignment: () => string = (): string => center ? "items-center justify-center" : '';
    const getDirection: () => string = (): string => direction === 'row' ? "flex-row" : 'flex-col';

    return (
        <View
            className={`border border-primary-500/70 rounded-xl py-4 px-5 flex mb-4 w-full ${getAlignment()} ${getDirection()}`}
            {...props}
        >
            {props.children}
        </View>
    );
}