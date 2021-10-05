import React, { useState, useEffect } from "react";
import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Admin from "pages/admin/PagIndexAdmin";
import Diseno3D from "pages/admin/Diseno3D";
import Clientes from "pages/admin/Clientes";
import GestionarUsuarios from "pages/admin/GestionarUsuario";
import Usuario from "pages/admin/Usuario";
import Ventas from "pages/admin/Ventas";
import PagIndex from "pages/auth/PagIndex";
import Login from "pages/auth/Login";
import Registro from "pages/auth/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "Styles/styles.css";
import { DarkModeContext } from "context/darkMode";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log("modo dark:", darkMode);
  }, [darkMode]);

  return (
    <div className="App">
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Router>
          <Switch>
            <Route path={["/admin", "/admin/Diseno3D", "/admin/Clientes"]}>
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
                    <Clientes />
                  </Route>
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
  );
}

export default App;

//<Route path="/"> Ruta base index pagina principal
// El switch sirve para que el navegador pueda escoger solo una ruta de todas las que hay
