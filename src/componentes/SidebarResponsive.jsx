import React, { useState } from "react";
import { Link } from "react-router-dom";

const SidebarResponsive = () => {
  const [mostrarNavegacion, setMostrarNavegacion] = useState(false);
  return (
    <div
      className="sm:hidden"
      onClick={() => {
        setMostrarNavegacion(!mostrarNavegacion);
      }}
    >
      <i
        className={`mx-2 fas fa-${
          //mx-2 = Sirve para separa el icono de la x o el hamburguer un poco de la esquina
          mostrarNavegacion ? "times" : "bars"
        } hover:text-yellow-600`} // En esta parte de código se evalua si la variable mostarNavegacion esta en true entonces muestra el icono times que es una x sino el icono hamburguer
      />
      {mostrarNavegacion && (
        <ul className="bg-gray-900">
          <ResponsiveRoute nombre="Diseno3D" ruta="/admin/Diseno3D" />
          <ResponsiveRoute nombre="Ventas" ruta="/admin/ventas" />
          <ResponsiveRoute nombre="Usuarios" ruta="/admin/usuarios" />
        </ul>
      )}
    </div>
  );
};

const ResponsiveRoute = ({ ruta, nombre }) => {
  return (
    <Link to={ruta}>
      <li className="text-gray-200 border border-gray-300 p-1">{nombre}</li>
    </Link>
  );
};

export default SidebarResponsive;

//El md:hidden = Lo que hace es ocultarme el icono que generamos con  <i className="fas fa-bars" /> tomado de fontawesome el hamburguer 