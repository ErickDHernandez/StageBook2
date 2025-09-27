import { Stack } from 'expo-router';

// Este layout se aplica a todas las rutas dentro de la carpeta /(auth),
// asegurando que Login y Register no muestren la barra de navegación estándar.
export default function AuthLayout() {
  return (
    <Stack>
      {/* Las pantallas de Login y Register se muestran a pantalla completa */}
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      
      {/* Si tuvieras una pantalla de "olvidé mi contraseña", iría aquí */}
      {/* <Stack.Screen name="forgot-password" options={{ headerShown: false }} /> */}
    </Stack>
  );
}