import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// 🔹 Importaciones de componentes compartidos
import Logo from "../../src/shared/components/Logo";
import Typewriter from "../../src/shared/components/TypeWriter";
import Button from "../../src/shared/components/Button";

export default function ModalScreen() {
  const router = useRouter();

  const handleCloseModal = () => {
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Logo width={150} />
      <Text style={styles.title}>
        <Typewriter text="Ajustes y Opciones" speed={60} fontSize={24} color="#000" />
      </Text>
      <Text style={styles.subtitle}>
        Aquí podrás configurar tu perfil y la aplicación.
      </Text>
      
      <View style={styles.contentContainer}>
        {/* Aquí puedes agregar más opciones de configuración */}
        <Text style={styles.comingSoonText}>Más opciones próximamente...</Text>
      </View>

      <Button
        text="Cerrar"
        onPress={handleCloseModal}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  contentContainer: {
    width: '100%',
    padding: 20,
    marginBottom: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

