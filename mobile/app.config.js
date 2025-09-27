module.exports = ({ config }) => {
  // Asegúrate de que el valor está presente en el proceso de Node.js
  const firebaseConfigString = process.env.EXPO_PUBLIC_FIREBASE_CONFIG;
  
  // Devuelve el objeto de configuración de Expo
  return {
    ...config,
    // La clave 'expo' de tu app.json
    expo: {
      ...config.expo,
      // ... el resto de tu configuración de app.json
      name: "mobile",
      slug: "mobile",
      version: "1.0.0",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "mobile",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,
      ios: {
        supportsTablet: true
      },
      android: {
        adaptiveIcon: {
          backgroundColor: "#E6F4FE",
          foregroundImage: "./assets/images/android-icon-foreground.png",
          backgroundImage: "./assets/images/android-icon-background.png",
          monochromeImage: "./assets/images/android-icon-monochrome.png"
        },
        edgeToEdgeEnabled: true,
        predictiveBackGestureEnabled: false
      },
      web: {
        output: "static",
        favicon: "./assets/images/favicon.png"
      },
      // 🔑 AHORA EL VALOR SE INYECTA CORRECTAMENTE
      extra: {
        EXPO_PUBLIC_FIREBASE_CONFIG: firebaseConfigString
      },
      plugins: [
        "expo-router",
        [
          "expo-splash-screen",
          {
            "image": "./assets/images/splash-icon.png",
            "imageWidth": 200,
            "resizeMode": "contain",
            "backgroundColor": "#ffffff",
            "dark": {
              "backgroundColor": "#000000"
            }
          }
        ]
      ],
      experiments: {
        typedRoutes: true,
        reactCompiler: true
      }
    }
  };
};