import React from "react";
import Navbar from "componentes/Navbar";
import Footer from "componentes/Footer";

const PublicLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <Navbar />
      <main className="h-full overflow-y-scroll bg-blue-400">{children}</main>
      <Footer />
    </div>
  );
};

export default PublicLayout;

// "flex flex-col justify-between h-screen"> {/* En esta linea de codigo lo que hace es dejar el navbar arriba footer abajo y contenido en el medio */}
//{/*El codigo overflow-y-scroll sirve para que el contenido se desplace en el main un scroll  el codigo h-full sirve para que el contenido ocupe todo el tamaño de la pantalla y no solo un pedacito */}
//            {/* El children basicamente es el contenido de la pagina que puede ir //////variando segun sea la pagina */}
