import React from "react";
import Sidebar from "componentes/Sidebar";
import SidebarResponsive from "componentes/SidebarResponsive";

const PrivateLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      <div className="flex flex-col md:flex-row flex-nowrap h-full w-full">
        <Sidebar />
        <SidebarResponsive />
        <main className="flex w-full  overflow-y-scroll items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
// Display flex o flex = Que pueda ocupar todo el espacio en la pantalla
// w-screen h-screen = Este codigo dice que ocupe todo el alto y el ancho del view port
// <main className="flex w-full bg-blue-400">{children}</main>; = este codigo es para que  /// todo el contenido de la pagina ocupe toda la pantalla y ademas tenga ese color azul
// Y esta plantilla del PribeteLayout lo que hace es que tenga mi sidebar a un lado y mi    //contenido al otro lado
// overflow-y-scroll =Este codigo sirve para que el sidebar se quede quieto y mi contenido  //sea el que se mueva de lado a lado
// md:flex-row = Lo que hace es que ubica el icono de hamburger en la parte superior cuando es menor a una pantalla mediana
