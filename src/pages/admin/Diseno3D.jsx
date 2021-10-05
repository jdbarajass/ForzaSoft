import React, { useEffect} from "react";

const Diseno3D = () => {
  return (
    <form className="flex flex-col">
      <h2>Formulario de creacion de diseños 3D</h2>
      <input type="text" placeholder="Material" />
      <input type="text" placeholder="Color" />
      <input type="text" placeholder="Tamaño" />
      <button className="bg-indigo-500 text-white">Enviar Datos</button>
      <button className="p-3 button">Agregar al carrito</button>
    </form>
  );
};

export default Diseno3D;
