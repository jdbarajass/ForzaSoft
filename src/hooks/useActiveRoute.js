//Esto es un hook personalizado es un componente generico que se puede usar en todo el proyecto siempre que se ise reac-router-dom
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
// Hook personalizado useActiveRoute ... el archivo no es .jsx porque no tiene HTML e importante deben empezar con use para que se sepa que es un hook
const useActiveRoute = (ruta) => {
  // le paso la ruta como parametro
  const location = useLocation(); // Los hooks me devuelven o funciones o estados, entonces cada vez que cambia de ubicacion
  const [isActive, setisActive] = useState(false); // Así se crean una nueva variable
  // el useeffect lo uso para saber cuando un estado esta cambiando
  useEffect(() => {
    if (location.pathname.includes(ruta)) {
      // Lo que evalua en esta linea de codigo es que si la ruta es igual al location.pathname que es lo que selecione con el boton entonces que el unico que se cambie de color sea el boton que pulse (pathname es basicamente la ruta)
      setisActive(true);
    } else {
      setisActive(false);
    }
  }, [location, ruta]); // Quiero saber cada vez que cambia location
  return isActive;
};

export default useActiveRoute;
