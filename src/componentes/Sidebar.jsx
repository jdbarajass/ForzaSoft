import React from "react";
import ImagenLogo from "./ImagenLogo";
import { Link } from "react-router-dom"; // useLocation lo que hace es que si di click a un boton que me redirige a una pagina, que este boton cambie de color para que el usuario sepa en que pagina esta
import useActiveRoute from "hooks/useActiveRoute";
import { useAuth0 } from "@auth0/auth0-react";
// import PrivateComponent from "componentes/PrivateCompoent";
import PrivateComponent from "./PrivateComponent";

const Sidebar = () => {
  const { user, logout } = useAuth0();
  const cerraSesion = () => {
    logout({ returnTo: "http://localhost:3000/admin" }); // se borra el token despues de que se termina la ejecucion es decir despues de que le doy en cerrar sesion
    localStorage.setItem("token", null);
  };
  return (
    <nav className="hidden sm:flex sm:w-72 border border-gray-300 h-full flex-col bg-gray-200 p-2 sidebar">
      <Link to="/PagIndex">
        <ImagenLogo />
      </Link>
      <div className="my-4">
        <Ruta
          icono="fas fa-user"
          ruta="/admin/perfil"
          nombre="Perfil"
          usuario={user}
        />
        <PrivateComponent roleList={["admin"]}>
          <Ruta
            icono="fas fa-cubes"
            ruta="/admin/Diseno3D"
            nombre="Diseño 3D"
          />
        </PrivateComponent>
        <PrivateComponent roleList={["admin", "vendedor"]}>
          <Ruta
            icono="fas fa-cash-register"
            ruta="/admin/ventas"
            nombre="Ventas"
          />
        </PrivateComponent>
        <PrivateComponent roleList={["admin"]}>
          <Ruta icono="fas fa-users" ruta="/admin/usuarios" nombre="Usuarios" />
        </PrivateComponent>
        <Ruta icono="fas fa-users" ruta="/admin/clientes" nombre="Clientes" />
        <Ruta
          icono="fas fa-cash-register"
          ruta="/admin/AdminVentas"
          nombre="Administrador Ventas"
        />
      </div>
      <button onClick={() => cerraSesion()} className="button">
        Cerrar Sesión
      </button>
    </nav>
  );
};

const Ruta = ({ icono, ruta, nombre, usuario = null }) => {
  const isActive = useActiveRoute(ruta); // Me indica cual es la ruta que esta activa para cambiar de color al boton
  return (
    <Link to={ruta}>
      <button
        className={`p-1 my-2 bg-${
          isActive ? "indigo" : "gray"
        }-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md`}
      >
        {usuario ? (
          <>
            <img src={usuario.picture} className="h-5 w-5 rounded-full" />
            {usuario.name}
          </> // este codigo lo que hace es colocarme el nombre en el perfil hala el nombre de auth0
        ) : (
          <>
            <i className={`${icono} w-10`} />
            {nombre}
          </>
        )}
      </button>
    </Link>
  );
};

export default Sidebar;
// el codigo w-72 significa w = ancho y w-72 es 18rem es decir 288 pixeles es la mitad de una pantalla mediana
// el codigo bg-red-400 es el color de fondo que le damos al sidebar y el 400 es el color que uno haya escogido en este caso rojo que puede variar su color rojo entre 100 y 900
// hidden sm:flex sm:w-72 = Cuando manejo tailwind el directamente ya viene por defecto para  manejar código que ya viene con responsive ( Tailwind es mobile first = es decir que todas las clases que están en Tailwind funcionan para un celular mobile) Entonces lo que hace este código es que se va a aplicar ciertas caracteristicas a un celular que tenga estas dimensiones
//{/*i className={`${icono} es un icono que se trae de la web de la pág fantawesone */}
