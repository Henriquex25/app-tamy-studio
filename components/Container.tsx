import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {children}
        </SafeAreaView>
    );
}