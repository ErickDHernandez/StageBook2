from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración CORS para que React pueda llamar a la API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React se ejecutará en este puerto
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/")
@app.get("/api")
def root():
    return {
        "equipo": "TeamScene",
        "proyecto": "BookStage",
        "descripcion": "Bienvenido a BookStage: Tu herramienta para facilitarte la vida teatral."
    }
