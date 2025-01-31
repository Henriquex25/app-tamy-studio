import { ActivityIndicator } from 'react-native';
import themeColors from "@/styles/themeColors";

export function LoadingIndicator() {
    return (
        <ActivityIndicator color={themeColors.primary[400]} size="large" style={{ paddingBottom: 20 }} />
    );
}