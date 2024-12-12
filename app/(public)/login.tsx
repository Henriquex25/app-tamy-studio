import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Input } from "@/components/form/input/index";
import { Link } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/Button";

interface ValidationErrors {
    email?: string[];
    password?: string[];
}

export default function LoginScreen() {
    const { login, isLoading } = useAuth();
    const [email, setEmail] = useState("test@example.com");
    const [password, setPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    async function handleLogin() {
        validate();

        if (email.length === 0 || password.length === 0) return;

        const response: any = await login(email, password);

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }
    }

    function validate() {
        const errors = validationErrors;

        if (email.length === 0) {
            errors.email = ["O campo email é obrigatório."];
        }

        if (password.length === 0) {
            errors.password = ["O campo senha é obrigatório."];
        }

        setValidationErrors(errors);
    }

    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-8">
            <View className="flex w-full -mt-5">
                <Image source={require("../../assets/images/logo.png")} className="w-40 h-40 self-center" />
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
                <Button color="primary" onPress={handleLogin} label="Entrar" loading={isLoading} />

                {/* Cadastrar */}
                <Link href="/register" asChild>
                    <Button color="transparent" label="Cadastrar" labelColor="text-primary-500" className="mt-3" />
                </Link>
            </View>
        </View>
    );
}
