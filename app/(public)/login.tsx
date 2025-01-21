import React, { useState, useEffect } from "react";
import { View, Image } from "react-native";
import { Input } from "@/components/form/input/index";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

interface ValidationErrors {
    email?: string[];
    password?: string[];
}

export default function LoginScreen() {
    const { login, isLoading, isAuthenticated } = useAuth();
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("password");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/(auth)/(tabs)/home");
        }
    }, []);

    async function handleLogin() {
        const response: any = await login(email, password);

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }
    }

    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-8">
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

                {/* Password */}
                <View className="mt-5">
                    <Input
                        label="Senha"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                        errorMessage={validationErrors.password?.[0]}
                    />
                </View>

                {/* Esqueci minha senha */}
                <View>
                    <Link href="/forgot-password" className="text-sm text-right pr-2 text-pink-500 mt-1.5">
                        Esqueci minha senha
                    </Link>
                </View>
            </View>

            {/* Botões */}
            <View className="mt-10 w-full">
                {/* Entrar */}
                <Button color="primary" onPress={handleLogin} label="Entrar" isLoading={isLoading} />

                {/* Entrar com Google */}
                {/* <Button
                    color="transparent"
                    label="Entrar com o Google"
                    labelColor="text-primary-500"
                    className="mt-5"
                    prepend={() => <Ionicons name="logo-google" size={22} color="black" style={{ marginRight: 12 }} />}
                /> */}

                {/* Cadastrar */}
                <Link href="/register" asChild>
                    <Button color="transparent" label="Cadastrar" labelColor="text-primary-500" className="mt-2" />
                </Link>
            </View>
        </View>
    );
}
