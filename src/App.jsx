import AuthLayout from "layouts/AuthLayout";
import PrivateLayout from "layouts/PrivateLayout";
import PublicLayout from "layouts/PublicLayout";
import Admin from "pages/admin/PagIndexAdmin";
import Diseno3D from "pages/admin/Diseno3D"
import Clientes from "pages/admin/Clientes"
import PagIndex from "pages/PagIndex";
import Login from "pages/Login";
import Registro from "pages/Registro";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "Styles/styles.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/admin", "/admin/Diseno3D", "/admin/Clientes"]}>
          <PrivateLayout>
            <Switch>
              <Route path="/admin/Diseno3D">
                <Diseno3D />
              </Route>
              <Route path="/admin/Clientes">
                <Clientes />
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
  );
}

export default App;

//<Route path="/"> Ruta base index pagina principal
// El switch sirve para que el navegador pueda escoger solo una ruta de todas las que hay