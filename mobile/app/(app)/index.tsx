import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
// 🔹 Rutas de importación corregidas
import { useAuth } from "../../src/providers/AuthContext";
import Logo from "../../src/shared/components/Logo";
import Typewriter from "../../src/shared/components/TypeWriter";
import Button from "../../src/shared/components/Button";

export default function DashboardScreen() {
  const router = useRouter();
  const { signOutUser } = useAuth(); 

  const handleNotReady = (section: string) => {
    console.log(`La sección "${section}" aún no está disponible.`);
  };

  const handleSignOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo width={200} />

      <Text style={styles.title}>
        <Typewriter text="Bienvenido a StageBook" speed={60} fontSize={24} color="#000" />
      </Text>

      <View style={styles.buttonsContainer}>
        <Button text="Agenda" onPress={() => handleNotReady("Agenda")} />
        <Button text="Ensayos" onPress={() => handleNotReady("Ensayos")} />
        <Button text="Guiones" onPress={() => handleNotReady("Guiones")} />
        <Button text="Pósters" onPress={() => handleNotReady("Pósters")} />
        <Button text="Perfil" onPress={() => handleNotReady("Perfil")} />
        <Button text="Configuración" onPress={() => handleNotReady("Configuración")} />
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
  },
  buttonsContainer: {
    width: "100%",
    gap: 15,
    marginTop: 20,
  },
  signOutButton: {
    backgroundColor: '#ff4d4d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  signOutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
