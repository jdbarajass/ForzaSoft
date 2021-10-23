import { useUser } from "context/userContext";
import React from "react";

const PrivateComponent = ({ roleList, children }) => {
  // debe recibir como props una lista de roles y el children, entonces lo que va a hacer es que si el rol que se asigno puede ver todo el contenido le va a mostrar los children, sino le va a mostrar un componente vacio
  const { userData } = useUser();
  console.log("User Data en el PrivateComponent",userData);
  if (roleList.includes(userData.rol)) {
    return children;
  }
  // return <div>No tiene permisos</div>;
  return <></>;
};

export default PrivateComponent;
