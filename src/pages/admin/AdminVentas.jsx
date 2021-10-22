import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerVentas, editarVenta, eliminarVenta } from 'utils/api';

import 'react-toastify/dist/ReactToastify.css';

const Vehiculos = () => {
 // const [mostrarTabla, setMostrarTabla] = useState(true);
  const [productos, setVehiculos] = useState([]);
 // const [textoBoton, setTextoBoton] = useState('Crear Nuevo Venta');
 // const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerVentas(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setVehiculos(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error('Salio un error:', error);
        }
      );
      
    }
  }, [ejecutarConsulta]);
/*
  useEffect(() => {
    //obtener lista de Ventas desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);
*/
/*
  useEffect(() => {
    if (mostrarTabla) {
   //   setTextoBoton('Crear Nuevo Venta');
   //   setColorBoton('indigo');
    } else {
   //   setTextoBoton('Mostrar Todos los Ventas');
   //   setColorBoton('green');
    }
  }, [mostrarTabla]);

  */
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de Ventas
        </h2>
    
        </div>
      {
        <TablaVehiculos listaVehiculos={productos} setEjecutarConsulta={setEjecutarConsulta} />
      }
      <ToastContainer position='bottom-center' autoClose={1000} />
    </div>
  );
};

const TablaVehiculos = ({ listaVehiculos, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [productosFiltrados, setVehiculosFiltrados] = useState(listaVehiculos);

  useEffect(() => {
    setVehiculosFiltrados(
      listaVehiculos.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaVehiculos]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Ventas</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre del Vendedor</th>
              <th>Nombre del Cliente</th>
              <th>Valor Venta</th>
              <th>Productos</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((vehiculo) => {
              return (
                <FilaVehiculo
                  key={nanoid()}
                  vehiculo={vehiculo}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='flex flex-col w-full m-2 md:hidden'>
        {productosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.vendedor.name}</span>
              <span>{el.totalVenta}</span>
              <span>{el.cliente.name}</span>
              <span>{el.productos.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaVehiculo = ({ vehiculo, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoVehiculo, setInfoNuevoVehiculo] = useState({
    _id: vehiculo._id,
    name: vehiculo.vendedor.name,
    totalVenta: vehiculo.totalVenta,
    cliente: vehiculo.cliente,
    productos: vehiculo.productos,
  });

    const actualizarVehiculo = async () => {
    //enviar la info al backend

    await editarVenta(
      vehiculo._id,
      {
        name: infoNuevoVehiculo.name,
        totalVenta: infoNuevoVehiculo.totalVenta,
        cliente: infoNuevoVehiculo.cliente,
      },
      (response) => {
        console.log(response.data);
        toast.success('Venta modificada con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificanda el Venta');
        console.error(error);
      }
    );
  };

  const deleteVehicle = async () => {
    await eliminarVenta(
      vehiculo._id,
      (response) => {
      //  console.log(response.data);
        toast.success('Venta eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
       // console.error(error);
        toast.error('Error eliminando el Venta');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoVehiculo._id.slice(20)}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.name}
              onChange={(e) => setInfoNuevoVehiculo({ ...infoNuevoVehiculo, name: e.target.value })}
            />
          </td>
         
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.cliente.name}
              onChange={(e) =>
                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, cliente: e.target.value })
              }
            />
          </td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoVehiculo.totalVenta}
              onChange={(e) =>
                setInfoNuevoVehiculo({ ...infoNuevoVehiculo, totalVenta: e.target.value })
              }
            />
          </td><td></td>

        </>
      ) : (
        <>
          <td>{vehiculo._id.slice(20)}</td>
          <td>{vehiculo.vendedor.name}</td>
          <td>{vehiculo.cliente.name}</td>
          <td>{vehiculo.totalVenta}</td>
          <td>

            <div className='flex h-full w-full flex-col items-center justify-start p-8'>
              <div className='flex flex-col w-full'>
            
              </div><div id="divproductos" name="divproductos" style={style.ventana} >
                <table className='tablaproductos' id='tablaproductos' name='tabla'>
                  <thead>
                    <tr>

                      <th>Nombre</th>
                      <th>Valor Unitario</th>
                      <th>Cantidad</th>
                      <th className='hidden'>Input</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehiculo.productos.map(item => (


                      <tr>

                        <td className="text-center">{item.name}</td>
                        <td className="text-center">{item.costo}</td>
                        <td className="text-center">{item.cantidad}</td>
                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>
            </div>
          </td>

        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarVehiculo()}
                  className='fas fa-check text-green-700 hover:text-green-500'
                />
              </Tooltip>
              <Tooltip title='Cancelar edición' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-ban text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title='Editar Venta' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Venta' arrow>
                <i
                  onClick={() => setOpenDialog(true)}
                  className='fas fa-trash text-red-700 hover:text-red-500'
                />
              </Tooltip>
            </>
          )}
        </div>
        <Dialog open={openDialog}>
          <div className='p-8 flex flex-col'>
            <h1 className='text-gray-900 text-2xl font-bold'>
              ¿Está seguro de querer eliminar el Venta?
            </h1>
            <div className='flex w-full items-center justify-center my-4'>
              <button
                onClick={() => deleteVehicle()}
                className='mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md'
              >
                Sí
              </button>
              <button
                onClick={() => setOpenDialog(false)}
                className='mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md'
              >
                No
              </button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};


export default Vehiculos;

const style = {
  fondo: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    background: "black",
    opacity: 0.5,
  },
  ventana: {
    position: "relative",
    background: "#fff",
    border: 1,
    boxShadow: "2px 2px 10px rgba(0,0,0,3)",
    zIndex: 10,
  },
  modal: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    opacity: 100,
  },
};