//Es el punto de control que protege todas las rutas privadas
//Logica de redireccion condicional
//Afecta a las rutas dentro de (app)

import { Stack, Redirect } from 'expo-router';
import React from 'react';
import { useAuth } from '../../src/providers/AuthContext'; 

// Este layout aplica las reglas de seguridad a todas las rutas dentro de /(app)
export default function AppLayout() {
  // 🟢 Obtenemos el estado de autenticación (isAuthenticated y loading)
  const { isAuthenticated, loading } = useAuth();

  // 1. Mostrar pantalla vacía si el estado de Firebase aún se está cargando
  if (loading) {
    return null; 
  }

  // 2. 🔴 REGLA DE SEGURIDAD: Si NO está autenticado, redirigimos al login
  if (!isAuthenticated) {
    // Esto fuerza la navegación a la ruta que contiene tu login.tsx
    return <Redirect href="/(auth)/login" />;
  }

  // 3. 🟢 Si SÍ está autenticado, cargamos la navegación normal (Dashboard, Agenda, etc.)
  return (
    <Stack>
      {/* El "index" aquí es el archivo que se cargará por defecto, que debe ser tu DashboardScreen
        (es decir, tu dashboard.tsx renombrado a app/(app)/index.tsx).
      */}
      <Stack.Screen name="index" options={{ title: 'Dashboard', headerShown: false }} />
      {/* Aquí añadirías más pantallas protegidas (ej: agenda, profile, etc.) */}
      {/* <Stack.Screen name="agenda" options={{ title: 'Agenda' }} /> */}
    </Stack>
  );
}
