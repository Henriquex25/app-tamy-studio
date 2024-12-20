import { View, Text } from "react-native";
import { BaseToast, ErrorToast, InfoToast } from "react-native-toast-message";

const successColor = "#10b981";
const errorColor = "#ef4444";
const infoColor = "#06b6d4";
const warningColor = "#f59e0b";
const titleFontSize = 16;
const bodyFontSize = 13;

export default {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: successColor, width: "88%", height: 70 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: titleFontSize,
                fontWeight: "500",
                color: successColor,
            }}
            text2Style={{
                fontSize: bodyFontSize,
                paddingLeft: 5,
                paddingRight: 5,
            }}
        />
    ),

    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: errorColor, width: "88%", height: 70 }}
            text1Style={{
                fontSize: titleFontSize,
                fontWeight: "500",
                color: errorColor,
            }}
            text2Style={{
                fontSize: bodyFontSize,
            }}
        />
    ),

    info: (props: any) => (
        <InfoToast
            {...props}
            style={{ borderLeftColor: infoColor, width: "88%", height: 70 }}
            text1Style={{
                fontSize: titleFontSize,
                fontWeight: "500",
                color: infoColor,
            }}
            text2Style={{
                fontSize: bodyFontSize,
            }}
        />
    ),

    warning: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: warningColor, width: "88%", height: 70 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: titleFontSize,
                fontWeight: "500",
                color: warningColor,
            }}
            text2Style={{
                fontSize: bodyFontSize,
            }}
        />
    ),
};
