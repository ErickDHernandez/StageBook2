import React, { 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    ReactNode 
} from 'react';
import { 
    getAuth, 
    User, 
    onAuthStateChanged, 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword, 
    signOut,
    Auth,
    AuthError
} from 'firebase/auth'; 
import { 
    getFirestore, 
    Firestore, 
    doc, 
    setDoc 
} from 'firebase/firestore'; 
import '../firebaseConfig';

interface UserData extends User {
    appUserId: string; 
    // Si agregas más datos de usuario de Firestore, van aquí.
}

// Interfaz del Contexto (Basada en tu definición)
interface AuthContextType {
    user: UserData | null;
    db: Firestore | null;
    loading: boolean; // Carga inicial de la sesión
    isLoading: boolean; // Carga de operaciones (signIn, signUp, signOut)
    isAuthenticated: boolean;
    error: string | null;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signOutUser: () => Promise<void>;
    clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    // Estados de la aplicación
    const [user, setUser] = useState<UserData | null>(null);
    const [dbInstance, setDbInstance] = useState<Firestore | null>(null);
    const [loading, setLoading] = useState(true); 
    const [isLoading, setIsLoading] = useState(false); 
    const [error, setError] = useState<string | null>(null);
    const [authInstance, setAuthInstance] = useState<Auth | null>(null);

    const isAuthenticated = !!user && !loading;

    // Inicializa Firebase Auth, Firestore y escucha cambios de estado
    useEffect(() => {
        try {
            const auth = getAuth();
            const db = getFirestore();

            setAuthInstance(auth);
            setDbInstance(db);

            const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
                if (currentUser) {
                    // Mapeamos el User de Firebase a nuestro UserData, añadiendo appUserId (la UID)
                    setUser({ ...currentUser, appUserId: currentUser.uid });
                } else {
                    setUser(null);
                }
                setLoading(false); 
            });

            return () => unsubscribe();
        } catch (e) {
            console.error("Error al inicializar Firebase Auth/Firestore:", e);
            setLoading(false);
            setError("No se pudo conectar con los servicios de Firebase");
        }
    }, []);

    // FUNCIÓN SIGN IN (CORRECCIÓN DE CARGA Y ERRORES)
    const signIn = async (email: string, password: string) => {
        if (!authInstance) return;

        setError(null);
        setIsLoading(true); 

        try {
            await signInWithEmailAndPassword(authInstance, email, password);
        } catch (e:any) {
            let errorMessage = 'Error inesperado al iniciar sesión, inténtelo de nuevo.'
            const errorCode = e?.code;
            console.log("CÓDIGO DE ERROR DE FIREBASE:", errorCode);

            // Mensaje de error para el usuario
            if (errorCode === 'auth/invalid-email'){
              errorMessage = "El formato de correo electrónico es invalido. Por favor, revísalo.";
            }else if (
              errorCode === 'auth/invalid-credential' ||
              errorCode === "auth/wrong-password" ||
              errorCode === "auth/user-not-found"
            ){
              errorMessage = "Correo o contraseña incorrectos . Por favor, verifica tus datos.";
            }else if (errorCode === "auth/too-many-requests"){
              errorMessage = "Demasiados intentos fallidos. Intentalo de nuevo más tarde";
            }
            console.log("CÓDIGO DE ERROR DE FIREBASE:", errorCode);
            setError(errorMessage);
            console.error("Error de Firebase:",e);
            throw e; 
        } finally {
            //Se asegura que el spinner siempre se detenga
            setIsLoading(false); 
        }
    };

    // ➡️ FUNCIÓN SIGN UP
const signUp = async (email: string, password: string, name: string) => {
    if (!authInstance || !dbInstance) return;

    setError(null);
    setIsLoading(true); // Se inicia la carga

    try {
        const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
        
        // Creación de documento de usuario en Firestore
        const userRef = doc(dbInstance, `artifacts/__app_id/users/${userCredential.user.uid}/profile/details`);

        await setDoc(userRef, {
            name: name,
            email: email,
            createdAt: new Date().toISOString(),
        });

        // 🚨 SOLUCIÓN DEFINITIVA (ÉXITO): 
        // Desactiva la carga inmediatamente después de que TODAS las operaciones asíncronas terminen.
        setIsLoading(false); 
        
        // Ahora, la aplicación detecta que el usuario está logueado y comienza la redirección.

    } catch (e) {
        const authError = e as AuthError;
        console.error("Error de registro:", authError.code);
        let errorMessage = "Ocurrió un error al registrar el usuario.";

        if (authError.code === 'auth/email-already-in-use') {
            errorMessage = "El correo electrónico ya está registrado.";
        }
        
        setError(errorMessage);
        
        // 🚨 SOLUCIÓN DEFINITIVA (FALLO): 
        // Desactiva la carga ANTES de relanzar el error.
        setIsLoading(false); 
        
        throw e;
    }
    // NOTA: Eliminamos el bloque finally ya que el código de éxito y error lo tienen cubierto.
};

    // ➡️ FUNCIÓN LOGOUT
    const signOutUser = async () => {
        if (!authInstance) return;
        setIsLoading(true);
        setError(null);
        try {
            await signOut(authInstance);
        } catch (e) {
            console.error("Error al cerrar sesión:", e);
            setError("No se pudo cerrar la sesión correctamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const clearError = () => setError(null);

    const value = {
        user,
        db: dbInstance,
        loading,
        isLoading,
        isAuthenticated,
        error,
        signUp,
        signIn,
        signOutUser,
        clearError,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// --- Hook para Consumir el Contexto ---
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};
