import React,{ useEffect, useState} from "react";
import Sidebar from "componentes/Sidebar";
import SidebarResponsive from "componentes/SidebarResponsive";
import { useAuth0 } from "@auth0/auth0-react";
//import { Link } from "react-router-dom";
import ReactLoading from "react-loading";
import { obtenerDatosUsuario } from "utils/api";
import { useUser } from "context/userContext";

const PrivateLayout = ({ children }) => {
  const { isAuthenticated, isLoading,loginWithRedirect, getAccessTokenSilently,logout } =useAuth0();
  const [loadingUserInformation,setLoadingUserInformation]=useState(false);
  const { setUserData } = useUser();
  useEffect(() => {
    const fetchAuth0Token = async () => {
      setLoadingUserInformation(true);
      // 1. Pedir token a Auth0
      const accessToken = await getAccessTokenSilently({
        audience: "api-autenticacion-diseno3D",
      });
      // 2. Recibir token de Auth0
      localStorage.setItem("token", accessToken); // este codigo me guarda el token en el localStorage
      console.log("Este es el token", accessToken);
      // 3. enviarle el token al BackEnd
      //Con este codigo le estoy diciendo al BackEnd que con este token que se le envio de obtenerDatosUsuario en la api cree o envieme los datos de ese usuario
      await obtenerDatosUsuario(
        (response) => {
          console.log("response con datos del usuario", response);
          setUserData(response.data);
          setLoadingUserInformation(false);
        },
        (err) => {
          // console.error("error", err);
          console.log("err", err);
          setLoadingUserInformation(false);
          logout({ returnTo: "http://localhost:3000/admin" });
        }
      );
    };
    if (isAuthenticated) {
      // cada vez que la persona se autentica envia un nuevo token
      fetchAuth0Token();
    }
  }, [isAuthenticated, getAccessTokenSilently,logout,setUserData]);

  if (isLoading || loadingUserInformation){
    return (
      <ReactLoading type="spokes" color="#acb123" height={667} width={375} />
    );
  }
  if (!isAuthenticated) {
    return loginWithRedirect();
  }

  return (
//    <PrivateRoute>
      <div className="flex w-screen h-screen">
        <div className="flex flex-col md:flex-row flex-nowrap h-full w-full">
          <Sidebar />
          <SidebarResponsive />
          <main className="flex w-full  overflow-y-scroll items-center justify-center">
            {children}
          </main>
        </div>
      </div>
//    </PrivateRoute>
  );
};

export default PrivateLayout;
// Display flex o flex = Que pueda ocupar todo el espacio en la pantalla
// w-screen h-screen = Este codigo dice que ocupe todo el alto y el ancho del view port
// <main className="flex w-full bg-blue-400">{children}</main>; = este codigo es para que  /// todo el contenido de la pagina ocupe toda la pantalla y ademas tenga ese color azul
// Y esta plantilla del PribeteLayout lo que hace es que tenga mi sidebar a un lado y mi    //contenido al otro lado
// overflow-y-scroll =Este codigo sirve para que el sidebar se quede quieto y mi contenido  //sea el que se mueva de lado a lado
// md:flex-row = Lo que hace es que ubica el icono de hamburger en la parte superior cuando es menor a una pantalla mediana
// para bloquear la ruta uso PrivateLayout y para el elemento digamos como los botones de editar borrar y demas uso el PrivateComponent
