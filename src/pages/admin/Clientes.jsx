import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { Dialog, Tooltip } from '@material-ui/core';
import { obtenerClientes, crearCliente, editarCliente, eliminarCliente } from 'utils/api';
import 'react-toastify/dist/ReactToastify.css';

const Clientes = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [vehiculos, setClientes] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehículo');
  const [colorBoton, setColorBoton] = useState('indigo');
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);

  useEffect(() => {
    console.log('consulta', ejecutarConsulta);
    if (ejecutarConsulta) {
      obtenerClientes(
        (response) => {
          console.log('la respuesta que se recibio fue', response);
          setClientes(response.data);
          setEjecutarConsulta(false);
        },
        (error) => {
          console.error('Salio un error:', error);
        }
      );
     
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Cliente');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Cliente');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col w-full'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Administración de Cliente
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaClientes listaClientes={vehiculos} setEjecutarConsulta={setEjecutarConsulta} />
      ) : (
        <FormularioCreacionClientes
          setMostrarTabla={setMostrarTabla}
          listaClientes={vehiculos}
          setClientes={setClientes}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={1000} />
    </div>
  );
};

const TablaClientes = ({ listaClientes, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState('');
  const [vehiculosFiltrados, setClientesFiltrados] = useState(listaClientes);

  useEffect(() => {
    setClientesFiltrados(
      listaClientes.filter((elemento) => {
        return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
      })
    );
  }, [busqueda, listaClientes]);

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder='Buscar'
        className='border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500'
      />
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los Clientes</h2>
      <div className='hidden md:flex w-full'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre del Cliente</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {vehiculosFiltrados.map((vehiculo) => {
              return (
                <FilaCliente
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
        {vehiculosFiltrados.map((el) => {
          return (
            <div className='bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl'>
              <span>{el.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const FilaCliente = ({ vehiculo, setEjecutarConsulta }) => {
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoCliente, setInfoNuevoCliente] = useState({
    _id: vehiculo._id,
    name: vehiculo.name,
 
  });

  const actualizarCliente = async () => {
    //enviar la info al backend

    await editarCliente(
      vehiculo._id,
      {
        name: infoNuevoCliente.name,
  
      },
      (response) => {
        console.log(response.data);
        toast.success('Vehículo modificado con éxito');
        setEdit(false);
        setEjecutarConsulta(true);
      },
      (error) => {
        toast.error('Error modificando el Cliente');
        console.error(error);
      }
    );
  };

  const deleteVehicle = async () => {
    await eliminarCliente(
      vehiculo._id,
      (response) => {
        console.log(response.data);
        toast.success('Cliente eliminado con éxito');
        setEjecutarConsulta(true);
      },
      (error) => {
        console.error(error);
        toast.error('Error eliminando el Cliente');
      }
    );

    setOpenDialog(false);
  };

  return (
    <tr>
      {edit ? (
        <>
          <td>{infoNuevoCliente._id}</td>
          <td>
            <input
              className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
              type='text'
              value={infoNuevoCliente.name}
              onChange={(e) => setInfoNuevoCliente({ ...infoNuevoCliente, name: e.target.value })}
            />
          </td>

      
        </>
      ) : (
        <>
          <td>{vehiculo._id.slice(20)}</td>
          <td>{vehiculo.name}</td>

        </>
      )}
      <td>
        <div className='flex w-full justify-around'>
          {edit ? (
            <>
              <Tooltip title='Confirmar Edición' arrow>
                <i
                  onClick={() => actualizarCliente()}
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
              <Tooltip title='Editar Cliente' arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className='fas fa-pencil-alt text-yellow-700 hover:text-yellow-500'
                />
              </Tooltip>
              <Tooltip title='Eliminar Cliente' arrow>
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
              ¿Está seguro de querer eliminar el Cliente?
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

const FormularioCreacionClientes = ({ setMostrarTabla, listaClientes, setClientes }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoCliente = {};
    fd.forEach((value, key) => {
      nuevoCliente[key] = value;
    });

    await crearCliente(
      {
        name: nuevoCliente.name,
 
      },
      (response) => {
        console.log(response.data);
        toast.success('Vehículo agregado con éxito');
      },
      (error) => {
        console.error(error);
        toast.error('Error creando un Cliente');
      }
    );

    // const options = {
    //   method: 'POST',
    //   url: 'http://localhost:5000/vehiculos/nuevo/',
    //   headers: { 'Content-Type': 'application/json' },
    //   data: { name: nuevoCliente.name, brand: nuevoCliente.brand, model: nuevoCliente.model },
    // };

    // await axios
    //   .request(options)
    //   .then(function (response) {
    //     console.log(response.data);
    //     toast.success('Vehículo agregado con éxito');
    //   })
    //   .catch(function (error) {
    //     console.error(error);
    //     toast.error('Error creando un vehículo');
    //   });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo Cliente</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del Cliente
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Corolla'
            required
          />
        </label>
               <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar Cliente
        </button>
      </form>
    </div>
  );
};

export default Clientes;
