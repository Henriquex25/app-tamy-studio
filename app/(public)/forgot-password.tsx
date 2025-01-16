import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/form/input";
import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";
import {AxiosResponse} from "axios";
import Toast from "react-native-toast-message";


interface ValidationErrors {
    email?: string[];
    password?: string[];
}

export default function ForgotPassword() {
    const { forgotPassword, isLoading, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    async function handleForgotPassword() {
        if (isLoading) return;

        setValidationErrors({});

        const response: AxiosResponse = await forgotPassword(email);

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }

        if (response.status === 200 && response.data.hasOwnProperty("status")) {
            Toast.show({
                type: "success",
                text1: "Sucesso",
                text2: response.data.status,
                visibilityTime: 10000,
            });
        }
    }

    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-8">
            <StatusBar color="dark" />

            <View className="flex w-full -mt-5">
                <Image source={require("@/assets/images/logo.png")} className="w-40 h-40 self-center" />
            </View>

            {/* Form */}
            <View className="mt-16 w-full">
                {/* Email */}
                <View>
                    <Input
                        label="Email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        onChangeText={setEmail}
                        value={email}
                        errorMessage={validationErrors.email?.[0]}
                        autoCapitalize="none"
                    />
                </View>
            </View>

            {/* Botões */}
            <View className="mt-10 w-full">
                {/* Entrar */}
                <Button color="primary" onPress={handleForgotPassword} label="Entrar" isLoading={isLoading} />

            </View>
        </View>
    );
}
