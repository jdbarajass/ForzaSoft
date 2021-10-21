import React from "react";
import ImagenLogo from "./ImagenLogo";
import { Link } from "react-router-dom"; // useLocation lo que hace es que si di click a un boton que me redirige a una pagina, que este boton cambie de color para que el usuario sepa en que pagina esta
import useActiveRoute from "hooks/useActiveRoute"

const Sidebar = () => {
  return (
    <nav className="hidden sm:flex sm:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-2 sidebar">
      <Link to="/PagIndex">
        <ImagenLogo />
      </Link>
      <div className="my-4">
        <Ruta icono="fas fa-user" ruta="/admin/perfil" nombre="Perfil" />
        <Ruta icono="fas fa-cubes" ruta="/admin/Diseno3D" nombre="Diseño 3D" />
        <Ruta
          icono="fas fa-cash-register"
          ruta="/admin/ventas"
          nombre="Ventas"
        />
        <Ruta icono="fas fa-users" ruta="/admin/usuarios" nombre="Usuarios" />
        <Ruta icono="fas fa-users" ruta="/admin/clientes" nombre="Clientes" />
        <Ruta icono="fas fa-cash-register" ruta="/admin/AdminVentas" nombre="Administrador Ventas" />
      </div>
      <button className="button">Cerrar Sesión</button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre }) => {
  const isActive = useActiveRoute(ruta) // Me indica cual es la ruta que esta activa para cambiar de color al boton
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2 bg-${
          isActive ? "indigo" : "gray"
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        <i className={`${icono} w-10`} />
        {/*i className={`${icono} es un icono que se trae de la web de la pág fantawesone */}
        {nombre}
      </button>
    </Link>
  );
};

export default Sidebar;
// el codigo w-72 significa w = ancho y w-72 es 18rem es decir 288 pixeles es la mitad de una pantalla mediana
// el codigo bg-red-400 es el color de fondo que le damos al sidebar y el 400 es el color que uno haya escogido en este caso rojo que puede variar su color rojo entre 100 y 900
// hidden sm:flex sm:w-72 = Cuando manejo tailwind el directamente ya viene por defecto para  manejar código que ya viene con responsive ( Tailwind es mobile first = es decir que todas las clases que están en Tailwind funcionan para un celular mobile) Entonces lo que hace este código es que se va a aplicar ciertas caracteristicas a un celular que tenga estas dimensiones
