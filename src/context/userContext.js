import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export const useUser = () => {
  return useContext(UserContext);
};
// es un contexto que va a tener toda la informacion del usuario
