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


export const obtenerVentas = async (setVentas, setEjecutarConsulta) => {
  const options = { method: "GET", url: "http://localhost:5000/ventas/" };
  await axios
    .request(options)
    .then(function (response) {
      setVentas(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  setEjecutarConsulta(false);
};

export const obtenerVehiculosVentas = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/ventas/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const obtenerVehiculos = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/diseno3D/' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const crearVehiculo = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/diseno3D/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarVehiculo = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:5000/diseno3D/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarVehiculo = async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `http://localhost:5000/diseno3D/${id}/`,
    headers: { 'Content-Type': 'application/json' },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA USUARIOS

export const obtenerUsuarios = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuarios' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD PARA CLIENTES
export const crearCliente = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/diseno3D/',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const editarCliente = async (id, data, successCallback, errorCallback) => {
  const options = {
    method: 'PATCH',
    url: `http://localhost:5000/diseno3D/${id}/`,
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

export const eliminarCliente = async (id, successCallback, errorCallback) => {
  const options = {
    method: 'DELETE',
    url: `http://localhost:5000/diseno3D/${id}/`,
    headers: { 'Content-Type': 'application/json' },
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const obtenerClientes = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/clientes' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};


export const obtenerUsuariosVendedor = async (successCallback, errorCallback) => {
  const options = { method: 'GET', url: 'http://localhost:5000/usuariosVendedor' };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// CRUD DE VENTAS

export const crearVenta = async (data, successCallback, errorCallback) => {
  const options = {
    method: 'POST',
    url: 'http://localhost:5000/ventas',
    headers: { 'Content-Type': 'application/json' },
    data,
  };
  await axios.request(options).then(successCallback).catch(errorCallback);
};

// export const obtenerUsuarios = async (setVehiculos, setEjecutarConsulta = () => {}) => {
//   const options = { method: 'GET', url: 'http://localhost:5000/usuarios/' };
//   await axios
//     .request(options)
//     .then(function (response) {
//       setVehiculos(response.data);
//     })
//     .catch(function (error) {
//       console.error(error);
//     });
//   setEjecutarConsulta(false);
// };
