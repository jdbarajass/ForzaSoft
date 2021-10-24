import React from "react";
import { Link } from "react-router-dom";
import TriggerDarkMode from "./TriggerDarkMode";
import { useAuth0 } from "@auth0/auth0-react";

NAVBAR (LUIS)
const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav class="bg-gray-700 shadow-lg">
      <div class="container mx-auto PX-4">
        <div class="sm:flex justify-around">
          <a href="/home" class="text-white text-3xl font-bold p-3">ARTMOTICS</a>

          <ul class="text-gray-400 sm:self-center text-xl border-t sm:border-none">
            <li class="sm:inline-block">
              <a href="/home" class="p-3 hover:text-white">Inicio</a>
            </li>
            <li class="sm:inline-block">
              <a href="/#Servicios" class="p-3 hover:text-white">Servicios</a>
            </li>
            <li class="sm:inline-block">
              <a href="/#Imagenes" class="p-3 hover:text-white">Imagenes</a>
            </li>
            <li class="sm:inline-block">
              <a href="/#footer" class="p-3 hover:text-white">Contactos</a>
            </li>
            <li class="sm:inline-block">
              <Link to="/login">
                <button onClick={() => loginWithRedirect()} className="bg-gray-500 p-2 text-white rounded-lg shadow-md hover:bg-gray-400">
                  Iniciar Sesión
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
