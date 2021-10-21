// aca en la carpeta utils van cosas como conexiones al backend autenticacion procesamiento de datos ... tambien se mete todo lo que tenga que ver con axios
import axios from "axios";


const getToken = () => {
  return (`Bearer ${localStorage.getItem("token")}`);
}

export const obtenerdiseno3D = async (successCallback, errorCallback) => {
  const options = { method: "GET", url: "http://localhost:5000/diseno3D/", 
    headers: { // esta parte de codigo es el token que me deja validar como usuario a mi sistema
    Authorization: getToken(),
  },
  
  };
  await axios
    .request(options)
    .then(successCallback)
    .catch(errorCallback);
};

export const creardiseno3D = async (data,successCallback, errorCallback) => {
    const options = {
      method: "POST",
      url: "http://localhost:5000/diseno3D",
      headers: { "Content-Type": "application/json", Authorization: getToken() },
      data 
    };
  await axios.request(options).then(successCallback).catch(errorCallback);
}

export const editardiseno3D = async (id,data,successCallback, errorCallback) => {
    const options = {
      method: "PATCH",
      url: `http://localhost:5000/diseno3D/${id}/`, 
      headers: { "Content-Type": "application/json", Authorization: getToken() }, 
      data, 
    }; 
await axios.request(options).then(successCallback).catch(errorCallback);
}

export const eliminardiseno3D = async (id, successCallback, errorCallback) => {
    const options = {
      method: "DELETE",
      url: `http://localhost:5000/diseno3D/${id}/`,
      headers: {"Content-Type": "application/json", Authorization: getToken()},
    };  
await axios.request(options).then(successCallback).catch(errorCallback);  
}

// CRUD PARA USUARIOS... un vendedor es un usuario en esta plataforma
export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = {method:"GET", url:`http://localhost:5000/usuarios/`, headers:{Authorization: getToken()}}
await axios.request(options).then(successCallback).catch(errorCallback);  
}
//CRUD DE VENTAS JESÚS
export const crearVenta = async (data, successCallback, errorCallback) => {
const options = { method: "POST", url: `http://localhost:5000/ventas/`,headers: {"Content-Type": "application/json"},Authorization: getToken(), data };
await axios.request(options).then(successCallback).catch(errorCallback);  
}// Para mandar los datos del vendedor al BackEnd
//   await axios.request(options).then((response)=> {setdiseno3D(response.data);}).catch((error)=> {console.error(error);}); = En este codigo lo que se hace es que si la consulta a la base de datos arrojo un resultado va a ejecutar el .then(resoponse)=>{setdiseno3D(response.data)} pero si hay un error al consultar esa base da datos ejecuta el .cath((error)=>{consolre.error(error)})
// api.js = Va a tener la responsabilidad de hacer todos los querys a la aplicacion, se encarga de enviar las solicitudes y devolver las respuestas
// {"Content-Type": "application/json"} = Este codigo siginifica que estoy enviando la informacion en formato json y el BanckEnd pueda entenderlo