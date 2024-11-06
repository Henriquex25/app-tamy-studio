import { StatusBar as RNStatusBar } from 'react-native'
import themeColors from '@/styles/themeColors';

export function StatusBar() {
    return <RNStatusBar barStyle="dark-content" backgroundColor={themeColors.primary[300]} />;
}