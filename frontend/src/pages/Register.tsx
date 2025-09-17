import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form className="flex flex-col gap-3 w-80">
      <div>  
        <input type="text" placeholder="Nombre" className="p-2 border rounded" />
      </div>  
      <div>
        <input type="email" placeholder="Correo" className="p-2 border rounded" />
      </div>  
      <div>  
        <input type="password" placeholder="Contraseña" className="p-2 border rounded" />
      </div>  
        <button className="bg-green-500 text-white p-2 rounded">Registrarse</button>
      </form>

      <p className="mt-4">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="text-blue-500 underline">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
}

export default Register;
