import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Input } from '../../components/form/input/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Login() {
    return (
        <View className="bg-primary-300 flex-1 justify-center items-center w-full px-8">
            {/* Logo */}
            <View className="flex w-full -mt-5">
                <Image source={require("../../assets/images/logo.png")} className="w-40 h-40 self-center" />
            </View>

            {/* Form */}
            <View className="mt-16 w-full">
                {/* Email */}
                <View>
                    <Input label="Usuário" keyboardType="email-address" textContentType="emailAddress" />
                </View>

                {/* Password */}
                <View className="mt-8">
                    <Input label="Senha" secureTextEntry />
                </View>

                {/* Esqueci minha senha */}
                <View>
                    <Link href="/forgot-password" className="text-sm text-right pr-2 text-pink-500 mt-4">
                        Esqueci minha senha
                    </Link>
                </View>
            </View>

            {/* Botões */}
            <View className="mt-10 w-full">
                {/* Entrar */}
                <TouchableOpacity className="w-full bg-pink-400 py-3 rounded-3xl" activeOpacity={0.7}>
                    <Text className="text-center font-bold text-xl text-gray-800">Entrar</Text>
                </TouchableOpacity>

                {/* Cadastrar */}
                <Link href="/register" asChild>
                    <TouchableOpacity className="mt-4 w-full py-3 rounded-3xl" activeOpacity={0.7}>
                        <Text className="text-center font-bold text-lg text-pink-500">Cadastrar</Text>
                    </TouchableOpacity>
                </Link>

                {/* Convidado */}
                {/* <TouchableOpacity className="mt-8 w-full py-2.5 rounded-3xl" activeOpacity={0.7}>
                    <Text className="text-center font-semibold text-lg text-pink-500">
                        Continuar como convidado
                    </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}