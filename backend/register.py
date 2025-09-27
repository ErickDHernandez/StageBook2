@app.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: Usuario):
    # 🔑 PASO CLAVE: Hashear la contraseña antes de usarla
    hashed_password = hash_password(user.contrasena)
    
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (%s, %s, %s)",
                # 🚨 Usamos la contraseña HASHEADA aquí
                (user.nombre, user.correo, hashed_password) 
            )
            conn.commit()
        return {"mensaje": "Usuario registrado exitosamente"}
    except psycopg2.errors.UniqueViolation:
        # Maneja el caso en que el correo ya exista
        conn.rollback()
        raise HTTPException(status_code=400, detail="El correo ya está registrado.")
    except psycopg2.Error as e:
        conn.rollback()
        print(f"Error de DB: {e}")
        raise HTTPException(status_code=500, detail="Error al registrar usuario.")