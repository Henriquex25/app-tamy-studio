import { useState } from "react";
import { View, Text, ViewProps, ScrollView } from 'react-native';
import { Container } from '@/components/Container';
import { StatusBar } from "@/components/StatusBar";
import Ionicons from "@expo/vector-icons/Ionicons";
import themeColors from "@/styles/themeColors";
import { ReactElement } from "react";
import { Input } from "@/components/form/input";
import { useUser } from "@/contexts/UserContext";
import { UserChangeData, ValidationErrorsChangeData } from "@/types/auth/User";
import Button from "@/components/Button";

interface SectionProps extends ViewProps {}

export default function MyRecord() {
    const { user, isLoading, changeUserData } = useUser();
    const [newUserData, setNewUserData] = useState<UserChangeData>({
        name: user!.name,
        cell_phone: user!.cell_phone
    });
    const [validationErrors, setValidationErrors] = useState<ValidationErrorsChangeData>({});

    async function handleSave(): Promise<void> {
        if (isLoading) return;

        setValidationErrors({});

        const response: any = await changeUserData(newUserData);

        if (response !== undefined && response.data?.hasOwnProperty("errors")) {
            setValidationErrors(response.data.errors);
        }
    }

    function Section(props: SectionProps): ReactElement {
        return (
            <View
                className="border border-primary-600/40 rounded-xl p-4 flex flex-row gap-x-6 items-center justify-center mb-4 w-full"
            >
                {props.children}
            </View>
        )
    }

    function getCellPhoneMasked(): string {
        if (!newUserData.cell_phone) return "";

        return newUserData.cell_phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }

    return (
        <Container>
            <StatusBar color="dark"/>

            <ScrollView>
                <View className="p-default flex items-center justify-center">
                    <Section>
                        <Ionicons name="alert-circle" size={37} color={themeColors.primary[500]}/>
                        <Text className="text-primary-600">Confira seus dados, edite o que for necessário e conclua
                            atualização.
                        </Text>
                    </Section>

                    <View className="mt-5 w-full mb-5 gap-y-6">
                        <Input
                            label="Nome"
                            value={newUserData.name}
                            onChangeText={(text) => setNewUserData({ ...newUserData, name: text })}
                            errorMessage={validationErrors.name?.[0]}
                        />

                        <Input
                            label="Email"
                            editable={false}
                            selectTextOnFocus={false}
                            value={user?.email}
                            errorMessage={validationErrors.cell_phone?.[0]}
                        />

                        <Input
                            label="Celular"
                            value={newUserData.cell_phone && getCellPhoneMasked()}
                            onChangeText={(text) => setNewUserData({ ...newUserData, cell_phone: text })}
                            mask="(99) 99999-9999"
                        />
                    </View>

                    <Button
                        label="Salvar"
                        onPress={handleSave}
                        disabled={!newUserData.name || !newUserData.cell_phone} isLoading={isLoading}
                    />
                </View>
            </ScrollView>
        </Container>
    );
}