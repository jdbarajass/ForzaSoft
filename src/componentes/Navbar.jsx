import React from "react";
import { Link } from "react-router-dom";
import TriggerDarkMode from "./TriggerDarkMode";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className="bg-red-400">
      <ul className="flex w-full justify-between my-3">
        <li>Logo</li>
        <li>Navegacion1</li>
        <li>Navegacion2</li>
        <li>
          <TriggerDarkMode />
        </li>
        <li className="px-3">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700"
          >
            Iniciar Sesión Con AUTH0
          </button>
        </li>
        <li>
          <Link to="/login">
            <button className="bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 ">
              Iniciar Sesión personalizado
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
// flex w-full justify-between = El navbar hasta el momento presenta la informacion una debajo de la otra pero con flex hago que me quede una al lado de la otra pero toda unida entonces para separarla uso el justify-between pero debo decirle que ocupe toda la pantalla de lado a lado eso lo hago con w-full
// my-3 = lo que hace es poner un margin en el eje y para que quede más alto la margen
// className = "bg-indigo-500" = le coloca un rectangulo con un color al rededor del boton iniciar sesion
// text-white rounded-lg = adentro del boton el text cambia el color del texto y el rounded lo que hace es redondear los bordes del boton
// shadow-md = lo que hace es ponerle sombra al boton
// hover: bg-indigo-700 = cuando me posicione en el boton cambie el color a un poquito más oscuro
/* La funcion Link a diferencia de la etiqueda a que lleva <a ref=...> es que la etiqueta a hace nuevas peticiones, la funcion Link no, solo navega entre las mismas paginas del HTML y es mucho más rapido */
//const { loginWithRedirect } = useAuth0();= es una funcioni de useAuth0 y es para re dirigirse al login de la página de Auth0
