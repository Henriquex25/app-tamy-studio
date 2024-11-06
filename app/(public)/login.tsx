import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Input } from '../../components/form/input/index';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';

export default function Login() {
    return (
        <View className="px-4 pt-7 bg-primary-300 flex-1">
            {/* Logo */}
            <View className="flex w-full">
                <Image source={require("../../assets/images/logo.png")} className="w-32 h-32 self-center" />
            </View>

            {/* Form */}
            <View className="mt-12">
                {/* Email */}
                <View>
                    <Input label="Usuário" keyboardType="email-address" textContentType="emailAddress" />
                </View>

                {/* Password */}
                <View className="mt-7">
                    <Input label="Senha" secureTextEntry />
                </View>

                {/* Esqueci minha senha */}
                <View>
                    <Link href="/forgot-password" className="text-sm text-right pr-2 text-pink-600 mt-3.5">
                        Esqueci minha senha
                    </Link>
                </View>
            </View>

            {/* Botões */}
            <View className="mt-10">
                {/* Entrar */}
                <TouchableOpacity className="w-full bg-pink-400 py-2.5 rounded-3xl" activeOpacity={0.7}>
                    <Text className="text-center font-bold text-xl text-gray-800">Entrar</Text>
                </TouchableOpacity>

                {/* Cadastrar */}
                <Link href="/register" asChild>
                    <TouchableOpacity className="mt-4 w-full py-2.5 rounded-3xl" activeOpacity={0.7}>
                        <Text className="text-center font-bold text-lg text-pink-600">Cadastrar</Text>
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