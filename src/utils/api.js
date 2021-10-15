// aca en la carpeta utils van cosas como conexiones al backend autenticacion procesamiento de datos ... tambien se mete todo lo que tenga que ver con axios
import axios from "axios";

export const obtenerdiseno3D = async (setdiseno3D, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/diseno3D/" };
  await axios
    .request(options)
    .then(function (response) {
      setdiseno3D(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};
