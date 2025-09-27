import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../src/firebaseConfig"; // auth es de tipo 'Auth | null'

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    setError("");

    // 🔑 VERIFICACIÓN CRÍTICA DE NULIDAD DE TYPESCRIPT
    if (!auth) {
      setError("Error de autenticación: El servicio de Firebase no está disponible.");
      // No restablecemos el loading aquí porque aún no se ha activado, 
      // pero es un buen punto de salida anticipada.
      console.error("La instancia de Firebase Auth es null. Verifica firebaseConfig.");
      return;
    }

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setError("Por favor, ingresa un correo electrónico válido.");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      // ✅ FIX: TypeScript ya sabe que 'auth' no es null gracias a la verificación anterior.
      await createUserWithEmailAndPassword(auth, email, password);

      // Navegar al login
      router.replace("/(auth)/login");
    } catch (e: any) {
      setLoading(false);

      switch (e.code) {
        case "auth/email-already-in-use":
          setError("El correo electrónico ya está en uso. Por favor, inicia sesión.");
          break;
        case "auth/invalid-email":
          setError("El formato del correo no es válido.");
          break;
        case "auth/weak-password":
          setError("La contraseña es demasiado débil (mínimo 6 caracteres).");
          break;
        default:
          setError("Ocurrió un error al registrarse. Inténtalo de nuevo.");
          console.error(e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Cuenta</Text>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Correo Electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña (mín. 6 caracteres)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? "Cargando..." : "Registrarse"}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.replace("/(auth)/login")}
      >
        <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f8f9fa" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24, color: "#343a40" },
  errorText: { color: "#dc3545", marginBottom: 16, textAlign: "center", fontWeight: "bold" },
  input: { width: "100%", padding: 12, borderWidth: 1, borderColor: "#ced4da", borderRadius: 8, marginBottom: 16, backgroundColor: "#fff" },
  button: { width: "100%", padding: 15, borderRadius: 8, backgroundColor: "#28a745", alignItems: "center", marginBottom: 12 },
  buttonDisabled: { backgroundColor: "#adb5bd" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  secondaryButton: { marginTop: 8 },
  secondaryButtonText: { color: "#28a745", fontSize: 14 },
});
