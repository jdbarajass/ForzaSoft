import React from "react";
import Google from "media/LogoGoogle.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className="max-w-md w-full space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <form className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Correo Electrónico"
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Contraseña"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Recuérdame
              </label>
            </div>

            <div className="text-sm">
              <a
                href="/"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" button group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md "
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* <LockClosedIcon
                  className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
                  aria-hidden='true'
                /> */}
              </span>
              <Link to="/admin">Inicia sesión</Link>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span>¿No tienes cuenta?</span>
            <Link to="/registro">
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Regístrate
              </span>
            </Link>
          </div>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <span className="mx-4">------------------------</span>
        <h2 className="my-4 text-center text-sm font-extrabold text-gray-900">
          O
        </h2>
        <span className="mx-4">------------------------</span>
      </div>
      <div className="max-w-md w-full">
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <div className="flex items-center justify-start">
              <img src={Google} alt="Logo Google" className="h-6 w-6" />
              <span className="mx-4">Continúa con Google</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

// <h2> = Sirve para colocar un titulo
// <form> = Para hacer formularios
// <input type="email"/> = Para que el usuario digite su correo y que sea realmente de ese tipo de correo electronico y no otra cosa
// required = Sirve para que la persona que va a ingresar sepa que debe llenar ese campo o sino no puede seguir
// placeholder = "dsl@c.com"; = para que se vea un ejemplo de como debe llenar ese campo requerido
// <input type="checkbox" /> = Es un recuadro para seleccinar si quiero que recuerde la cuenta con la que estoy ingresando
// Siempre los label debe estar asociados a un input y debo darle un nombre tanto en el input como en el label para eso es el htmlFor="recuerdame"> y el name = "recuerdame" />
// <button type = "submit"> = Este codigo es el encargado de que despues de oprimir el boton me va a enviar esta información a la base de datos
// className = "mt-8"> = margin top para que se separe un poco de la margen de arriba del a pagina
// className = "appearence-none focus:outline-none" = para quitar el borde de los campos de contraseña y password que aparecen como un rectangulo y el outline es para no ponerle ningun delineado
// El ring le pone un borde y una sombre
