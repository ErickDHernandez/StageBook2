from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
from passlib.context import CryptContext

app = FastAPI()

# Configuración CORS para que React pueda llamar a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"
                    "http://127.0.0.1:8000",       
                    "http://192.168.56.1",     
                    "exp://[DIRECCION-DE-EXPO]" 
    ],
    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conexion a PostgreSQL
conn = psycopg2.connect(
    dbname = "stagebook",
    user = "postgres",
    host = "localhost",
    password = "5171572",
    port = "5432"

)
pwd_context = CryptContext(schemes=["bcrypt"], deprecated = "auto")
def hash_password (password:str) -> str:
    """Hashea una contraseña."""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verifica una contraseña hasheada."""
    return pwd_context.verify(plain_password, hashed_password)

#Modelo de usuario
class Usuario(BaseModel):
    nombre: str | None = None
    correo:str
    contrasena: str

#Rutas
@app.get("/api/")
def root():
    return {
        "proyecto": "BookStage",
        "descripcion": "Artistic Planner & Portfolio"
    }

@app.post("/register")
def register(user: Usuario):
    try:
        with conn.cursor() as cur:
            cur.execute(
                "INSERT INTO usuarios (nombre, correo, contrasena) VALUES (%s, %s, %s)",
                (user.nombre, user.correo, user.contrasena)
            )
            conn.commit()
        return {"mensaje":"Usuario registrado"}
    except psycopg2.Error as e:
        conn.rollback()
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/login")
def login(user: Usuario):
    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT * FROM usuarios WHERE correo=%s AND contrasena=%s",
                (user.correo, user.contrasena)
            )
            result = cur.fetchone()
        if result:
            return {"mensaje": "Login exitoso"}
        else:
            return {"mensaje": "Credenciales incorrectas"}
    except psycopg2.Error as e:
        raise HTTPException(status_code=500, detail="Error en la base de datos")
