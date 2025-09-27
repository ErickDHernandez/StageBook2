import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from "expo-router";
// 🔹 IMPORTACIÓN REAL: Asegúrate de que la ruta a tu AuthContext sea correcta
import { useAuth } from "../../src/providers/AuthContext"; 

export default function LoginScreen() {
  // 🟢 USAMOS LOS ESTADOS DE CARGA Y ERROR DEL CONTEXTO (Fuente Única de Verdad)
  const { signIn, isLoading, error: authError, clearError } = useAuth(); 
  const router = useRouter(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 🟢 Usamos un error local para validaciones básicas (ej. campos vacíos)
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    // 1. Limpiamos errores al iniciar el intento
    setLocalError(''); 
    clearError(); // Limpia el error del contexto

    if (!email || !password) {
      setLocalError('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    try {
      // 2. signIn establece isLoading(true) en el contexto automáticamente
      await signIn(email, password);
      router.replace('/(app)');
      
      // 3. NO NECESITAS LLAMAR A router.replace('/(app)') aquí.
      // El useAuth() de tu _layout.tsx raíz lo hará automáticamente.

    } catch (e) {
      // 4. Si el 'signIn' falla, el 'catch' en el AuthContext maneja el mensaje de error 
      // y establece isLoading(false) en el bloque 'finally'. 
      // Aquí solo registramos el error en la consola si es necesario.
      console.error("Login fallido, error manejado por AuthContext:", e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      
      {/* 🟢 Muestra el error de validación local O el error de Firebase del contexto */}
      {(localError || authError) ? (
        <Text style={styles.errorText}>{localError || authError}</Text>
      ) : null}

      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading} // Desactivar la edición mientras carga
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading} // Desactivar la edición mientras carga
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace('/(auth)/register')}
        disabled={isLoading}
      >
        <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#343a40',
  },
  errorText: {
    color: '#dc3545',
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#f8d7da',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#f5c6cb',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ced4da',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#007bff',
    alignItems: 'center',
    marginBottom: 12,
    flexDirection: 'row', // Para centrar el ActivityIndicator
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#adb5bd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    marginTop: 8,
  },
  secondaryButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
});
