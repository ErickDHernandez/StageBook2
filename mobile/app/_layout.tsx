import { Stack } from 'expo-router';
// ✅ RUTA CORREGIDA: Usamos el nivel más probable (../src/...)
import { AuthProvider } from '../src/providers/AuthContext'; 

export default function RootLayout() {
  return (
    // 🟢 ESTO RESUELVE EL ERROR "useAuth debe ser usado dentro de un AuthProvider"
    <AuthProvider>
      <Stack>
        {/*
          Agrupamos las rutas de autenticación: login.tsx y register.tsx
          (Asumiendo que están dentro de la carpeta (auth))
        */}
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* La pantalla principal (landing page) */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        
        {/* Rutas Protegidas (Dashboard, Agenda, etc.)
          Estas rutas serán vigiladas por (app)/_layout.tsx en el siguiente paso.
        */}
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
