import { useUser } from "context/userContext";
import React from "react";
import { Link } from "react-router-dom";

const PrivateRoute = ({ roleList, children }) => {
  const { userData } = useUser();
  if (roleList.includes(userData.rol)) {
    return children;
  }
  return (
    <div className=" text-2xl flex flex-col items-center justify-center ">
      <div className=" button text-2xl flex flex-col items-center justify-center ">
        No, estas autorizado para ver este sitio web
      </div>
      <Link to="/">
        <span className="text-blue-500 font-bold">Llevame a la página de inicio</span>
      </Link>
    </div>
  );
};

export default PrivateRoute;

// Este codigo de PribetRoute es para proteger rutas es decir que tiene que uno estar autenticado para que la persona pueda seguir navegando, por eso se colocar en todo el app.js para que cualquier cosa que vaya a hacer alguien que no esta logueado le aparezaca el mensaje de No, estas autorizado para ver este sitio web
//  if (isLoading) return <div>Loading...</div>; = lo que hace este codigo es que si isLoading esta cargando o haciendo peticiones que muestre lo que hay dentro del div que en este caso es Loading
// console.log(AccessToken); // Me deja ver el token que me envia Auth0
/* Este código es para la comprobar si el token aun es o no valido y si se quieren hacer validaciones con el token
      if (localStorage.getItem("token")) {
        // Validar fecha de expiracion del token  
      } else {
        // Pedir el token
      }
*/
// Para poder desencriptar el token lo podemos hacer por medio de jwt.io

/* import { Link } from "react-router-dom";  
return isAuthenticated ? ( // para que me aparezca un mensaje grande de que no esta autorizado para ingresar sino esta autenticado
    <>{children}</>
  ) : (
    <div>
      <div className="text-9xl text-red-500">No, estas autorizado para ver este sitio web</div>
      <Link to="/">
        <span className="text-blue-500 font-bold">Llevame al home</span>
      </Link>
    </div>
  ); */
