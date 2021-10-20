import React, { useState, useEffect } from "react";
import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Admin from "pages/admin/PagIndexAdmin";
import Diseno3D from "pages/admin/Diseno3D";
import Clientes from "pages/admin/Clientes";
import GestionarUsuarios from "pages/admin/GestionarUsuario";
import Usuario from "pages/admin/Usuario";
//import Ventas2 from "pages/admin/Ventas2";
import Ventas from "pages/admin/Ventas";
import PagIndex from "pages/auth/PagIndex";
import Login from "pages/auth/Login";
import Registro from "pages/auth/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "Styles/styles.css";
import { DarkModeContext } from "context/darkMode";
import { Auth0Provider } from "@auth0/auth0-react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("modo dark:", darkMode);
  }, [darkMode]);

  return (
    <Auth0Provider
      domain="misiontic-diseno3d.us.auth0.com"
      clientId="CS3VzTWZmTPByaDhKfuVuB1iPIVcSgsX"
      redirectUri={window.location.origin}
    >
      <div className="App">
        <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
          {/* El estado que quiero que se transmita a lo largo del resto de la aplicacion*/}
          <Router>
            <Switch>
              <Route
                path={[
                  "/admin",
                  "/admin/Diseno3D",
                  "/admin/Clientes",
                  "/admin/Ventas",
                ]}
              >
                <PrivateLayout>
                  <Switch>
                    <Route path="/admin/Diseno3D">
                      <Diseno3D />
                    </Route>
                    <Route path="/admin/Usuarios">
                      <Usuario />
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
                      <Ventas />
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
      </div>
    </Auth0Provider>
  );
}

export default App;

//<Route path="/"> Ruta base index pagina principal
// El switch sirve para que el navegador pueda escoger solo una ruta de todas las que hay
/* Al archivo App.js que es este en donde estamos ubicados le colocamos al final App.jsx
y esto se hace para que el mismo archivo me autocomplete código de HTML  */
/* El 100% de los HTML de react deben estar en el return de una función */
// coloco el Auth0Provider en todo mi app porque puedo llegarlo a necesitar en cualquier pagina de mi proyecto
// domain="misiontic-diseno3d.us.auth0.com" = estos son los props que necesita AuthProvider
// clientId = "YOUR_CLIENT_ID"
// redirectUri={window.location.origin}
// debo configurar esto en la pagina Atuh0 en estos espacios Allowed Web Origins Allowed Logout URLs Allowed Web Origins que es colocar esta direccion http://localhost:3000/ y en Application Type colocar Single Page Application y esto ayuda a que no haya que enviarle el Client Secret ya que react es solo FrontEnd