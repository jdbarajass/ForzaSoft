import React, { useEffect, useState } from "react";

const Diseno3D = () => {
  const [mostrarTabla, setmostrarTabla] = useState(true); //Rendedirazion Condicional
  const [textoBoton, setTextoBoton] = useState("Crear nuevo diseño 3D");
  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton("Crear nuevo diseño 3D");
    } else {
      setTextoBoton("Mostrar todos los diseños");
    }
  }, [mostrarTabla]);
  return (
    <div className="flex h-full min-w-full flex-col items-center justify-start">
      {" "}
      {/* justify-start es para que se vayan para arriba  y el p-8 es el padding que sirve para separarse del top*/}
      <div className="flex flex-col">
        <h2 className="text-3xl font-extrabold text-gray-900 ">
          Página de administracion de diseños 3D
        </h2>
        <button
          onClick={() => {
            setmostrarTabla(!mostrarTabla);
          }}
          className="text-white bg-indigo-500 p-5 rounded-full m-6 w-28 self-end" /* w-28 self-end" = w-28 lo que hace es volver el boton un circulo y el self-end envia hacia el final ese circulo */
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? <TablaDiseno3D /> : <FormularioCreacionDiseno3D />}
    </div>
  );
};

const TablaDiseno3D = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-extrabold text-gray-800">
          Todos los diseños 3D
        </h2>
        <table className="flex flex-col justify-center flex-root">
          <thead>
            <tr>
              <th>Nombre del diseño 3D</th>
              <th>Nombre del material</th>
              <th>Tamaño de la pieza</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dato 1</td>
              <td>Dato 2</td>
              <td>Dato 3</td>
            </tr>
          </tbody>
        </table>
      </div>
    ); /* La etiqueta de tabla siempre tiene 2 etiquetas un thead y un body */
};

const FormularioCreacionDiseno3D = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold">Crear nuevo vehiculo</h2>
      <form className="grid grid-cols-2">
        {" "}
        {/* Grid en 2 columnas */}
        <input
          className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <input
          className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
          type="text"
        />
        <button className="col-span-2 bg-green-400 p-2 rounded-full shadow-md">
          Guardar Diseño
        </button>
        {/* col-span-2 para que ocupe 2 columnas el boton completo shadow-md pone una sombra abajo del boton */}
      </form>
    </div>
  );
};

export default Diseno3D;
// Renderización condicional = Es basicamente hacer lo mismo de dirigirnos a una ruta nueva como con el Roote, pero esta vez solo con un botón y no con un link como tal
// text-2xl font-extrabold= el text-2xl lo que hace es agrandar un poco el texto y el font-extrabold lo pone en negrita
// useEffect(() => {Ejecuta lo que haya a acá dentro}, [mostrarTabla]); = Este useEffect ejecutalo que hay dentro de los corchetes si cambia la variable mostrarTabla
//useEffect(() => {Ejecuta lo que haya a acá dentro}, []);= Este useEffect solo se ejecuta una vez en todo el programa y para que se vuelva a ejecutar debemos recargar la página
//useEffect(() => {Ejecuta lo que haya a acá dentro}, ); = Este useEffect no es recomendable usarlo