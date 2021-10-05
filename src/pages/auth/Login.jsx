import React from "react";
import { Link } from "react-router-dom";
import Google from "media/LogoGoogle.png";

const Login = () => {
  return (
    <div className="flex flex-col w-full justify-center items-center">
      <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
        Inicia Sesión En Tu Cuenta
      </h2>
      <form className="mt-8 max-w-md">
        <div>
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="email"
            placeholder="Correo electrónico"
            required
          />
          <input
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="password"
            placeholder="Contraseña"
            required
          />
        </div>
        <div className="flex justify-between">
          <div className="p-6">
            <label
              className="ml-2 block text-sm text-gray-900"
              htmlFor="recuerdame"
            >
              <input type="checkbox" name="recuerdame" />
              Recuérdame
            </label>
          </div>
          <div className="p-6 text-indigo-700 font-medium text-indigo-6 hover:text-indigo-500">
            <Link to="/">¿Olvidaste tu contraseña?</Link>
          </div>
        </div>
        <div className="flex justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700">
          <Link to="/admin">
            <button type="submit">Iniciar Sesión</button>
          </Link>
        </div>
        <div className="flex justify-between">
          <div className="p-2">
            <label htmlFor="recuerdame">¿No tienes cuenta?</label>
          </div>
          <div className="p-2 text-indigo-700 font-medium text-indigo-6 hover:text-indigo-500">
            <Link to="/">Regístrate</Link>
          </div>
        </div>
        <div className="flex justify-center">
          ------------------------O-------------------------{" "}
        </div>
        <div className=" flex justify-center bg-gray-200 p-2 text-black rounded-lg shadow-md hover:bg-blue-100">
          <img
            className="w-full"
            src={Google}
            alt="Logo Google"
            class="h-6 w-6"
          />
          <button className="p-2">Inicia Sesión Con Google</button>
        </div>
      </form>
    </div>
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
