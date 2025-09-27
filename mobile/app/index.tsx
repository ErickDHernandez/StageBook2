import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { useRouter } from "expo-router";
// 🔹 Rutas de importación corregidas (../src/...)
import Logo from "../src/shared/components/Logo";
import Typewriter from "../src/shared/components/TypeWriter";

// 💡 Nota: Asegúrate de que tu interfaz ApiData esté definida en algún lugar si la necesitas.
interface ApiData {
    // Define las propiedades de tu API
}

export default function IndexScreen() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [apiData, setApiData] = useState<ApiData | null>(null);

    // 🔹 Lógica de carga de datos inicial (Ejemplo)
    useEffect(() => {
        // Simular carga de datos (reemplazar con tu llamada a la API)
        const loadInitialData = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula 1.5s de carga
            // Aquí puedes redirigir a /login o /dashboard basado en la lógica
            setIsLoading(false);
        };

        loadInitialData();
    }, []);

    if (isLoading) {
        return (
            <View style={[styles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#4F86F7" />
                <Text style={styles.loadingText}>Cargando StageBook...</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Logo width={250} />

            <Text style={styles.title}>
                <Typewriter text="¡Bienvenido/a!" speed={80} fontSize={32} color="#000" />
            </Text>

            <Text style={styles.subtitle}>
                Tu plataforma para gestionar proyectos teatrales.
            </Text>

            <TouchableOpacity
                style={[styles.button, styles.primaryButton]}
                onPress={() => router.push("/login")}
            >
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => router.push("/register")}
            >
                <Text style={styles.secondaryButtonText}>Registrarse</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "#fff",
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: "#4F86F7",
    },
    title: {
        marginTop: 40,
        marginBottom: 10,
        fontSize: 32,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitle: {
        fontSize: 18,
        color: "#666",
        marginBottom: 50,
        textAlign: "center",
    },
    button: {
        width: "80%",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginVertical: 10,
    },
    primaryButton: {
        backgroundColor: "#4F86F7",
    },
    secondaryButton: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#4F86F7",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButtonText: {
        color: "#4F86F7",
        fontSize: 16,
        fontWeight: "bold",
    },
});