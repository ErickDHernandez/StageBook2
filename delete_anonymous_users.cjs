const admin = require('firebase-admin');

// 💡 IMPORTANTE: Asegúrate de que esta ruta apunte correctamente 
// a tu archivo de clave privada JSON. Si lo moviste a la raíz,
// esta ruta './admin_key.json' es la correcta.
const serviceAccount = require('./admin_key.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const auth = admin.auth();

async function deleteAnonymousUsers() {
    console.log("Iniciando la búsqueda y eliminación de usuarios anónimos...");
    let nextPageToken;
    let deletedCount = 0;

    do {
        // Obtener un lote de 1000 usuarios
        const listUsersResult = await auth.listUsers(1000, nextPageToken);
        nextPageToken = listUsersResult.pageToken;

        // FILTRADO ROBUSTO: Identifica usuarios que son pura o probablemente anónimos/de prueba
        const usersToDelete = listUsersResult.users.filter(user => {
            
            // 1. Usuarios que solo tienen el proveedor 'firebase' (el proveedor ID anónimo)
            const isPureAnonymous = user.providerData.some(p => p.providerId === 'firebase') && 
                                    user.providerData.length === 1;

            // 2. Usuarios que no tienen email (a menudo usuarios de prueba que solo se autenticaron anónimamente)
            const hasNoEmail = !user.email;
            
            // 3. Usuarios sin ningún proveedor (a veces ocurre con migraciones o versiones antiguas de SDK)
            const hasNoProviderData = user.providerData.length === 0;

            // Eliminamos si cumple con cualquier criterio de ser un usuario anónimo o de prueba
            return isPureAnonymous || hasNoEmail || hasNoProviderData;
        });

        if (usersToDelete.length > 0) {
            const uidsToDelete = usersToDelete.map(u => u.uid);
            await auth.deleteUsers(uidsToDelete);
            deletedCount += uidsToDelete.length;
            console.log(`✅ Lote eliminado: ${uidsToDelete.length} usuarios.`);
        } else {
            console.log("No se encontraron más usuarios anónimos en este lote.");
        }
    } while (nextPageToken); // Repetir si hay más páginas de usuarios

    console.log(`\n🎉 Eliminación completada. Total de usuarios anónimos eliminados: ${deletedCount}`);
}

// Ejecutar la función
deleteAnonymousUsers().catch(error => {
    console.error("\n❌ Error durante el proceso de eliminación:", error);
    // Este mensaje ayuda si hay un problema con la clave de Firebase
    if (error.code === 'auth/credential-too-old') {
        console.error("Por favor, genera una nueva clave privada en la consola de Firebase.");
    }
});