import { useState } from "react";
import { View, Text } from "react-native";
import { Container } from "@/components/Container";
import { StatusBar } from "@/components/StatusBar";
import { Input } from "@/components/form/input";
import Button from "@/components/Button";
import { useUser } from "@/contexts/UserContext";
import { ValidationErrorsChangePassword } from "@/types/auth/User";

export default function ChangePassword() {
    const {changePassword, isLoading} = useUser();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsChangePassword>({});

    async function handleChangePassword() {
        if (isLoading) return;

        setValidationErrors({});

        const response: any = await changePassword({currentPassword, newPassword, confirmNewPassword});

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }

    }

    return (
        <Container>
            <StatusBar color="dark"/>

            <View className="px-6 py-8 flex-1 flex justify-center items-center gap-y-5">
                <Input
                    label="Senha atual"
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                    secureTextEntry
                    errorMessage={validationErrors.currentPassword?.[0]}
                />

                <Input
                    label="Nova senha"
                    value={newPassword}
                    onChangeText={setNewPassword}
                    secureTextEntry
                    errorMessage={validationErrors.newPassword?.[0]}
                />

                <Input
                    label="Confirmar nova senha"
                    value={confirmNewPassword}
                    onChangeText={setConfirmNewPassword}
                    secureTextEntry
                    errorMessage={validationErrors.newPassword_confirmation?.[0]}
                />

                <Button
                    label="Salvar"
                    className="mt-6"
                    onPress={handleChangePassword}
                    isLoading={isLoading}
                    disabled={!currentPassword || !newPassword || !confirmNewPassword}
                />
            </View>
        </Container>
    );
}