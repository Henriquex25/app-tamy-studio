import {Container} from "@/components/Container";
import {View, Text, Image} from "react-native";
import themeColors from "@/styles/themeColors";
import {StatusBar} from "@/components/StatusBar";
import {Input} from "@/components/form/input";
import React, { useState } from "react";
import Button from "@/components/Button";

export default function Register() {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-8">
            <StatusBar color="dark"/>

            <View className="flex w-full -mt-5">
                <Image source={require("@/assets/images/logo.png")} className="w-40 h-40 self-center"/>
            </View>

            <View className="mt-16 w-full">
                <Input label="Nome" />

                <Input
                    label="Email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                />

                <Input
                    label="Confirmar email"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                />

                <Input
                    label="Senha"
                    secureTextEntry
                />

                <Input
                    label="Confirmar senha"
                    secureTextEntry
                />

                    {/* Botão Cadastrar */}
                <View className="mt-6 w-full">
                    <Button color="primary" onPress={() => {}} label="Cadastrar" isLoading={isLoading} />
                </View>
            </View>

        </View>
    );
}
