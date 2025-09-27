const API_URL = "http://127.0.0.1:8000"; // ajusta si usas otra IP

export async function login(correo: string, contrasena: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contrasena }),
  });
  return response.json();
}

export interface User {
  id: number;
  correo: string;
}
