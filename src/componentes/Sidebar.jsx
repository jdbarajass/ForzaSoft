import React from "react";
import ImagenLogo from "./ImagenLogo";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <nav className="hidden sm:flex sm:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-4 sidebar">
      <Link to="/admin">
        <ImagenLogo />
      </Link>

      <div className="my-4">
        <Ruta icono="fas fa-user" ruta="/admin/perfil" nombre="Perfil" />
        <Ruta icono="fas fa-car" ruta="/admin/vehiculos" nombre="Diseño 3D" />
        <Ruta
          icono="fas fa-cash-register"
          ruta="/admin/ventas"
          nombre="Ventas"
        />
        <Ruta icono="fas fa-users" ruta="/admin/usuarios" nombre="Usuarios" />
      </div>
      <button>Cerrar Sesión</button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <button className="p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
        <i className={`${icono} w-10`} />
        {nombre}
      </button>
    </Link>
  );
};

export default Sidebar;
// el codigo w-72 significa w = ancho y w-72 es 18rem es decir 288 pixeles es la mitad de una pantalla mediana
// el codigo bg-red-400 es el color de fondo que le damos al sidebar y el 400 es el color que uno haya escogido en este caso rojo que puede variar su color rojo entre 100 y 900
