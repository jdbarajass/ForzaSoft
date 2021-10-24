import PrivateComponent from "componentes/PrivateComponent";
import { ToastContainer, toast } from "react-toastify";
import { Dialog, Tooltip } from "@material-ui/core";
import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import { 
  obtenerUsuarios, 
  editarUsuario,
  crearUsuario,
} from "utils/api";
import ReactLoading from "react-loading";
import { User } from "@auth0/auth0-spa-js";

const Usuarios = () => {

  const [mostrarTabla, setmostrarTabla] = useState(true)
  const [usuarios, setUsuarios] = useState([]); // la respues de los usuarios esta metida en este useState
  const [textoBoton, setTextoBoton] = useState("Crear nuevo usuario");
  const [colorBoton, setColorBoton] = useState("indigo");
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // se encargara de pedir los usuarios
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log("usuarios", respuesta.data);
          setUsuarios(respuesta.data);
          setEjecutarConsulta(false);
          setLoading(false);          
        },
        (err) => {
          console.log(err);
        }
      );
    };
    console.log("consulta", ejecutarConsulta);
    if (ejecutarConsulta){
    fetchUsuarios();
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      setEjecutarConsulta(true);
      setTextoBoton("Crear nuevo usuario");
      setColorBoton("indigo");      
    } else {
      setTextoBoton("Mostrar todos los usuarios");
      setColorBoton("green");      
    }
  }, [mostrarTabla]);

  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      {/* <div>Administar usuarios</div> */}
      <h2 className="text-3xl font-extrabold text-gray-900">
        Administración Usuarios
      </h2>
      <button
          onClick={() => {
            setmostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`} /* w-28 self-end" = w-28 lo que hace es volver el boton un circulo y el self-end envia hacia el final ese circulo...  bg-${ColorBoton}-500 = este codigo es un STRING literal = Que la variable esta cambiando dependiendo del estado de la variable ColorBoton  */
        >
          {textoBoton}
        </button>        
      {/* <PrivateComponent roleList={["admin", "vendedor"]}>
        <button className="bg-red-400">Hola RBAC</button>
      </PrivateComponent> */}
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Estado</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => {
            return (
              <tr key={nanoid()}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <EstadoUsuarios user={user} />
                </td>
                <td>
                  <RolesUsuario user={user} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const RolesUsuario = ({ user }) => {
  // entra un usuario
  const [rol, setRol] = useState(user.rol);
  useEffect(() => {
    // para editar el usuario
    const editUsuario = async () => {
      await editarUsuario(user._id,{ rol },(res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      ); // (user._id,{rol}) Es el usuario que queremos editar y que informacion queremos enviar? el rol
    };
    if (user.rol !== rol) {
      editUsuario();
    }
  }, [rol, user]);
  return (
    <select value={rol} onChange={(e) => setRol(e.target.value)}>
      <option value="" disabled>
        Seleccione un rol
      </option>
      <option value="admin">Admin</option>
      <option value="vendedor">Vendedor</option>
      <option value="sin rol">Sin rol</option>
    </select>
  );
};

const TablaUsuarios =  ({ loading, setEjecutarConsulta, listaUsuarios }) =>{
  const [busqueda, setBusqueda] = useState("");
  const [UsuariosFiltrados, setUsuariosFiltrados] = useState(listaUsuarios);
  useEffect(() => {
    setUsuariosFiltrados(
      listaUsuarios.filter((elemento) => {
        return JSON.stringify(elemento)
        .toLowerCase()
        .includes(busqueda.toLocaleLowerCase());
      })
    );
  }, [busqueda, listaUsuarios]);
  return(
    <div className="flex flex-col items-center justify-center w-full">
    <input
      value={busqueda}
      onChange={(e) => setBusqueda(e.target.value)}
      placeholder="Buscar"
      className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
    />
    {/* self-start= corre a la derecha el input de buscar...border-2=para poner el borde mas grande... focus:outline-none focus:border-indigo-500 = para colocar un color al borde diferente*/}
    <h2 className="text-2xl font-extrabold text-gray-800">
      Todos Los Usuarios
    </h2>
    <div className="hidden md:flex w-full">
      {/* Esto es responsive y el proyecto quedo con 3 etapas que en pantallas pequeñas quedan unos cards para cada diseño 3D, en pantallas medianas queda la tabla y en pantallas grandes queda el sidebar y la tabla */}
      {loading ? (
        <ReactLoading
          type="spokes"
          color="#acb123"
          height={667}
          width={375}
        />
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Estado</th>
              <th>Rol</th>
                <PrivateComponent roleList={["admin"] }>
                <th>Acciones</th>
              </PrivateComponent>
            </tr>
          </thead>
          <tbody>
            {UsuariosFiltrados.map((user) => {
              return (
                <FilaUsuario
                  key={nanoid()}
                  user={user}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
    <div className="flex flex-col w-full m-2 md:hidden">
      {/* Esto es responsive */}
      {UsuariosFiltrados.map((el) => {
        return (
          <div className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
            <span>{el.name}</span>
            <span>{el.email}</span>
            <span>{el.estado}</span>
            <span>{el.rol}</span>
          </div>
        );
      })}
    </div>
  </div>  
  );
};

const FilaUsuario = ({ usuarios, setEjecutarConsulta}) => {

  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [infoNuevoUsuario, setInfoNuevoUsuario] = useState({
    _id: usuarios._id,
    name: usuarios.name,
    email: usuarios.email,
    rol: usuarios.rol,
    estado: usuarios.estado,
  });

};

const EstadoUsuarios = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? "");
  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);
  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value="" disabled>
        Seleccione un estado
      </option>
      <option value="autorizado" className="text-green-500">
        Autorizado
      </option>
      <option value="pendiente" className="text-yellow-500">
        Pendiente
      </option>
      <option value="rechazado" className="text-red-500">
        Rechazado
      </option>
    </select>
  );
};

export default Usuarios;
//  <PrivateComponent roleList={ ["admin","vendedor"]}> = desde aca le doy permisos de administracion a los diferentes roles
// useState(user.estado ?? '' = quiere decir que si las personas no tienen un estado o su estado esta en vacio es decir el objeto vacio entonces que haga cierta cosa

/* const EstadoUsuario = ({ user }) => {
  const [estado, setEstado] = useState(user.estado ?? "");

  useEffect(() => {
    const editUsuario = async () => {
      await editarUsuario(
        user._id,
        { estado },
        (res) => {
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      );
    };
    if (user.estado !== estado) {
      editUsuario();
    }
  }, [estado, user]);

  return (
    <select value={estado} onChange={(e) => setEstado(e.target.value)}>
      <option value="" disabled>
        Seleccione un estado
      </option>
      <option value="autorizado" className="text-green-500">
        Autorizado
      </option>
      <option value="pendiente" className="text-yellow-500">
        Pendiente
      </option>
      <option value="rechazado" className="text-red-500">
        Rechazado
      </option>
    </select>
  );
}; */