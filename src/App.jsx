import React, { useState, useEffect } from "react";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import PagIndex from "pages/auth/PagIndex";
import AuthLayout from "layouts/AuthLayout";
import Admin from "pages/admin/PagIndexAdmin";
import Diseno3D from "pages/admin/Diseno3D";
import Clientes from "pages/admin/Clientes";
import GestionarUsuarios from "pages/admin/GestionarUsuario";
import Usuarios from "pages/admin/Usuarios";
import Usuarioscris from "pages/admin/Usuariocris";
import Ventas from "pages/admin/Ventas";
import AdminVentas from "pages/admin/AdminVentas";
import Login from "pages/auth/Login";
import Registro from "pages/auth/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "Styles/styles.css";
import { DarkModeContext } from "context/darkMode";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserContext } from "context/userContext";
import PrivateRoute from "componentes/PrivateRoute";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userData, setUserData] = useState({});// el estado empieza vacio porque no tengo info de los usuarios

  useEffect(() => {
    console.log("modo dark:", darkMode);
  }, [darkMode]);

  return (
    <Auth0Provider
      domain="misiontic-diseno3d.us.auth0.com"
      clientId="CS3VzTWZmTPByaDhKfuVuB1iPIVcSgsX"
      redirectUri="https://thawing-island-88634.herokuapp.com/admin"
      audience="api-autenticacion-diseno3D"
    >
      <div className="App">
        <UserContext.Provider value={{ userData, setUserData }}>
          <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
            {/* El estado que quiero que se transmita a lo largo del resto de la aplicacion*/}
            <Router>
              <Switch>
                <Route
                  path={[
                    "/admin",
                    "/admin/Diseno3D",
                    "/admin/Clientes",
                    "/admin/AdminVentas",
                    "/admin/Usuarios",
                    "/admin/Ventas",
                    "/admin/Usuarioscris",
                  ]}
                >
                  <PrivateLayout>
                    <Switch>
                      <Route path="/admin/Diseno3D">
                        <PrivateRoute roleList={["admin"]}>
                          <Diseno3D />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/Usuarios">
                        <PrivateRoute roleList={["admin"]}>
                          <Usuarios />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/Usuarioscris">
                        <PrivateRoute roleList={["admin"]}>
                          <Usuarioscris />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/GestionarUsuarios">
                        <GestionarUsuarios />
                      </Route>
                      <Route path="/admin/Clientes">
                        {/* Nombre de la ruta a la que quiero llegar */}
                        <Clientes />
                      </Route>
                      {/*                   <Route path="/admin/Ventas2">
                    <Ventas2 />
                  </Route> */}
                      <Route path="/admin/Ventas">
                        <PrivateRoute roleList={["admin", "vendedor"]}>
                          <Ventas />
                        </PrivateRoute>
                      </Route>
                      <Route path="/admin/AdminVentas">
                        <AdminVentas />
                      </Route>
                      <Route path="/admin">
                        <Admin />
                      </Route>
                    </Switch>
                  </PrivateLayout>
                </Route>
                <Route path={["/login", "/registro"]}>
                  <AuthLayout>
                    <Switch>
                      <Route path="/login">
                        <Login />
                      </Route>
                      <Route path="/registro">
                        <Registro />
                      </Route>
                    </Switch>
                  </AuthLayout>
                </Route>
                <Route path={["/"]}>
                  {/* Esto quiere decir que es la ruta principal */}
                  <PublicLayout>
                    <Switch>
                      <Route path="/">
                        <PagIndex />
                      </Route>
                    </Switch>
                  </PublicLayout>
                </Route>
              </Switch>
            </Router>
          </DarkModeContext.Provider>
        </UserContext.Provider>
      </div>
    </Auth0Provider>
  );
}

export default App;

//<Route path="/"> Ruta base index pagina principal
// El switch sirve para que el navegador pueda escoger solo una ruta de todas las que hay
/* Al archivo App.js que es este en donde estamos ubicados le colocamos al final App.jsx
y esto se hace para que el mismo archivo me autocomplete c??digo de HTML  */
/* El 100% de los HTML de react deben estar en el return de una funci??n */
// coloco el Auth0Provider en todo mi app porque puedo llegarlo a necesitar en cualquier pagina de mi proyecto
// domain="misiontic-diseno3d.us.auth0.com" = estos son los props que necesita AuthProvider
// clientId = "YOUR_CLIENT_ID"
// redirectUri={window.location.origin}
// debo configurar esto en la pagina Atuh0 en estos espacios Allowed Web Origins Allowed Logout URLs Allowed Web Origins que es colocar esta direccion http://localhost:3000/ y en Application Type colocar Single Page Application y esto ayuda a que no haya que enviarle el Client Secret ya que react es solo FrontEnd
// </userContext.Provider> = todo queda encerrado en ese contexto es porque quiero que este disponible los datos del usuario por ejemplo los roles en toda la aplicacion
// RBAC = accero basado en roles