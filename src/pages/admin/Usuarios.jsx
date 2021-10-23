import PrivateComponent from "componentes/PrivateComponent";
import { nanoid } from "nanoid";
import React, { useState, useEffect } from "react";
import { obtenerUsuarios, editarUsuario } from "utils/api";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]); // la respues de los usuarios esta metida en este useState
  useEffect(() => {
    // se encargara de pedir los usuarios
    const fetchUsuarios = async () => {
      await obtenerUsuarios(
        (respuesta) => {
          console.log("usuarios", respuesta.data);
          setUsuarios(respuesta.data);
        },
        (err) => {
          console.log(err);
        }
      );
    };
    fetchUsuarios();
  }, []);
  return (
    <div>
      <div>Admin usuarios</div>
      <PrivateComponent roleList={["admin", "vendedor"]}>
        <button className="bg-red-400">Hola RBAC</button>
      </PrivateComponent>
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