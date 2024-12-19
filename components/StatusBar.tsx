import {StatusBar as RNStatusBar, StatusBarProps} from 'react-native'
import themeColors from '@/styles/themeColors';

interface IStatusBarProps extends StatusBarProps {
    color?: "light" | "dark";
}

export function StatusBar(props: IStatusBarProps) {
    function getColor() {
        if (props.color === "dark") {
            return themeColors.primary[400];
        }

        return themeColors.primary[300];
    }

    return <RNStatusBar barStyle="dark-content" backgroundColor={getColor()} />;
}