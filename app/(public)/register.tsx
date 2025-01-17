import { Container } from "@/components/Container";
import { View, Text, Image, ScrollView, Keyboard } from "react-native";
import themeColors from "@/styles/themeColors";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/form/input";
import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useAuth } from "@/contexts/AuthContext";
import { UserRegistrationType } from "@/types/auth/User";

export interface ValidationErrors {
    name?: string[];
    email?: string[];
    email_confirmation?: string[];
    cell_phone?: string[];
    password?: string[];
    password_confirmation?: string[];
}

export default function Register() {
    const { register, isLoading, isAuthenticated } = useAuth();
    const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
    const [payload, setPayload] = useState<UserRegistrationType>({
        name: "",
        email: "",
        email_confirmation: "",
        cell_phone: "",
        password: "",
        password_confirmation: "",
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

    async function handleRegister() {
        if (isLoading) return;

        setValidationErrors({});
        const response: any = await register(payload);

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }
    }

    function validate() {
        const errors: ValidationErrors = { ...validationErrors };

        payload.name.length === 0 ? (errors.name = ["O campo nome é obrigatório."]) : delete errors.name;
        payload.email.length === 0 ? (errors.email = ["O campo email é obrigatório."]) : delete errors.email;

        payload.email_confirmation.length === 0
            ? (errors.email_confirmation = ["O campo confirmar email é obrigatório."])
            : delete errors.email_confirmation;

        payload.cell_phone.length === 0
            ? (errors.cell_phone = ["O campo celular é obrigatório."])
            : delete errors.cell_phone;

        payload.password.length === 0 ? (errors.password = ["O campo senha é obrigatório."]) : delete errors.password;

        payload.password_confirmation.length === 0
            ? (errors.password_confirmation = ["O campo confirmar senha é obrigatório."])
            : delete errors.password_confirmation;

        payload.email !== payload.email_confirmation
            ? (errors.email_confirmation = ["Os emails não conferem."])
            : delete errors.email_confirmation;

        payload.password !== payload.password_confirmation
            ? (errors.password_confirmation = ["As senhas não conferem."])
            : delete errors.password_confirmation;

        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
        }
    }

    useEffect(() => {
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-1">
            <StatusBar color="dark" />

            <ScrollView className={`px-7 ${keyboardVisible ? "mb-2" : "mb-7"}`}>
                <View className="flex w-full my-4">
                    <Image source={require("@/assets/images/logo.png")} className="w-40 h-40 self-center" />
                </View>

                <View className="mt-6 w-full gap-y-4">
                    <View>
                        <Input
                            label="Nome"
                            value={payload.name}
                            errorMessage={validationErrors.name?.[0]}
                            onChangeText={(value) => setPayload({ ...payload, name: value })}
                        />
                    </View>

                    <View>
                        <Input
                            label="Email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            value={payload.email}
                            onChangeText={(value) => setPayload({ ...payload, email: value })}
                            errorMessage={validationErrors.email?.[0]}
                        />
                    </View>

                    <View>
                        <Input
                            label="Confirme o email"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoCapitalize="none"
                            value={payload.email_confirmation}
                            onChangeText={(value) => setPayload({ ...payload, email_confirmation: value })}
                            errorMessage={validationErrors.email_confirmation?.[0]}
                        />
                    </View>

                    <View>
                        <Input
                            label="Celular"
                            keyboardType="phone-pad"
                            value={payload.cell_phone}
                            onChangeText={(value) => setPayload({ ...payload, cell_phone: value })}
                            errorMessage={validationErrors.cell_phone?.[0]}
                            mask="(99) 99999-9999"
                        />
                    </View>

                    <View>
                        <Input
                            label="Senha"
                            secureTextEntry
                            value={payload.password}
                            onChangeText={(value) => setPayload({ ...payload, password: value })}
                            errorMessage={validationErrors.password?.[0]}
                        />
                    </View>

                    <View>
                        <Input
                            label="Confirme a senha"
                            secureTextEntry
                            value={payload.password_confirmation}
                            onChangeText={(value) => setPayload({ ...payload, password_confirmation: value })}
                            errorMessage={validationErrors.password_confirmation?.[0]}
                        />
                    </View>

                    {/* Botão Cadastrar */}
                    <View className="w-full mt-0.5">
                        <Button color="primary" onPress={handleRegister} label="Cadastrar" isLoading={isLoading} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
