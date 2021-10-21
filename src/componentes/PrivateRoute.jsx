import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  useEffect(() => {
    const fetchAuth0Token = async () => {
      const accessToken = await getAccessTokenSilently({
        audience: `api-autenticacion-diseno3D`,
      });
      localStorage.setItem("token", accessToken); // este codigo me guarda el token en el localStorage
    };
    if (isAuthenticated) {
      // cada vez que la persona se autentica envia un nuevo token
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  if (isLoading) return <ReactLoading type="spokes" color="#acb123" height={667} width={375} />
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <div>
      <div className="text-9xl text-red-500">
        No, estas autorizado para ver este sitio web
      </div>
      <Link to="/">
        <span className="text-blue-500 font-bold">Llevame al home</span>
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
