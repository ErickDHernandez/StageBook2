import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

// Simulamos los proveedores de contexto y los hooks para no usar archivos externos.
const AuthContext = createContext(null);
const useAuth = () => useContext(AuthContext);

// Componente para la pantalla de inicio de sesión
const LoginScreen = ({ setScreen, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Simulamos la función de inicio de sesión
  const handleLogin = async () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Por favor, ingresa tu correo y contraseña.');
      return;
    }
    setLoading(true);
    try {
      // Simulamos la llamada a la autenticación. Solo 'test@test.com' y 'password123' funcionan.
      if (email === 'test@test.com' && password === 'password123') {
        // Redirige al home en caso de éxito
        setScreen('home');
      } else {
        // Lanza un error para ser capturado en el bloque `catch`
        throw { code: 'auth/invalid-credential' };
      }
    } catch (e) {
      if (e.code === 'auth/invalid-credential') {
        setErrorMessage('Credenciales inválidas. Por favor, verifica tu correo y contraseña.');
      } else {
        setErrorMessage('Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
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
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Iniciar Sesión'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setScreen('register')}
      >
        <Text style={styles.secondaryButtonText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para la pantalla de registro
const RegisterScreen = ({ setScreen, setErrorMessage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Lógica de registro simulada
    setErrorMessage('Registro simulado. Por favor, regresa al login.');
    setTimeout(() => setScreen('login'), 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regístrate</Text>
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
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Cargando...' : 'Regístrate'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => setScreen('login')}
      >
        <Text style={styles.secondaryButtonText}>¿Ya tienes cuenta? Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

// Componente para la pantalla de inicio (Home)
const HomeScreen = ({ setScreen }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Bienvenido!</Text>
    <Text style={styles.subtitle}>Has iniciado sesión con éxito.</Text>
    <TouchableOpacity
      style={styles.button}
      onPress={() => setScreen('login')}
    >
      <Text style={styles.buttonText}>Cerrar Sesión</Text>
    </TouchableOpacity>
  </View>
);

// Componente principal que maneja el estado de la aplicación
const App = () => {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [errorMessage, setErrorMessage] = useState('');

  const renderScreen = () => {
    if (currentScreen === 'login') {
      return <LoginScreen setScreen={setCurrentScreen} setErrorMessage={setErrorMessage} />;
    } else if (currentScreen === 'register') {
      return <RegisterScreen setScreen={setCurrentScreen} setErrorMessage={setErrorMessage} />;
    } else if (currentScreen === 'home') {
      return <HomeScreen setScreen={setCurrentScreen} />;
    }
  };

  return (
    <View style={styles.appContainer}>
      {errorMessage ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#343a40',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: '#6c757d',
  },
  errorContainer: {
    backgroundColor: '#dc3545',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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

export default App;
