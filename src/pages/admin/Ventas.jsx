import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
//Estos import que siguen son de reac-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid"; //esta libreria es para manejar los key... yarn add nanoid

const Ventas = () => {
  const [MostrarTabla, setMostrarTabla] = useState(true); //Rendedirazion Condicional
  const [venta, setventa] = useState([]);
  const [TextoBoton, setTextoBoton] = useState("Crear nuevo diseño 3D");
  const [ColorBoton, setColorBoton] = useState("indigo"); //Variable para cambiar el valor del color del boton const [ColorBoton, setColorBoton] La variable es ColorBoton y la que actualiza el estado es setColorBoton y el useState ("indigo") es el estado en el que empieza mi variable
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true)
  useEffect(() => {

            const obtenerventa = async () => {
              // Se creo una variable para poder sincronizar los datos que entrega el Backend
              const options = {
                method: "GET",
                url: "https://vast-waters-45728.herokuapp.com/venta/",
              };
              await axios
                .request(options)
                .then(function (response) {
                  setventa(response.data);
                })
                .catch(function (error) {
                  console.error(error);
                });
            };

    if (ejecutarConsulta) {
      obtenerventa();
      setEjecutarConsulta(false)
    }
  }, [ejecutarConsulta]);
  
  useEffect(() => {
    if (MostrarTabla) {
    setEjecutarConsulta(true)
    }
  }, [MostrarTabla]);

  useEffect(() => {
    if (MostrarTabla) {
      setTextoBoton("Crear nuevo diseño 3D");
      setColorBoton("indigo");
    } else {
      setTextoBoton("Mostrar todos los diseños");
      setColorBoton("green");
    }
  }, [MostrarTabla]);
  return (
    <div className="flex h-full w-full flex-col items-center justify-start p-8">
      {/* justify-start es para que se vayan para arriba  y el p-8 es el padding que sirve para separarse del top*/}
      <div className="flex flex-col w-full">
        {/* el w-full me ayuda a que la tabla tome todo el tamaño completo de la pagina*/}
        <h2 className="text-3xl font-extrabold text-gray-900 ">
          Página de administracion de diseños 3D
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!MostrarTabla);
          }}
          className={`text-white bg-${ColorBoton}-500 p-5 rounded-full m-6 w-28 self-end`} /* w-28 self-end" = w-28 lo que hace es volver el boton un circulo y el self-end envia hacia el final ese circulo...  bg-${ColorBoton}-500 = este codigo es un STRING literal = Que la variable esta cambiando dependiendo del estado de la variable ColorBoton  */
        >
          {TextoBoton}
        </button>
      </div>
      {MostrarTabla ? (
        <Tablaventa listaventa={venta} setEjecutarConsulta={setEjecutarConsulta } />
      ) : (
        <FormularioCreacionventa
          setMostrarTabla={setMostrarTabla}
          listaVehiculos={venta}
          setventa={setventa}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />{" "}
      {/* es la posicion en la que quiero que aparezca el mensaje y el autoClose en cuantos milisegundos quiere que se vaya ese msn ... el contenedor es ToastContainer pero la funcion como tal es toast*/}
    </div>
  );
};

const Tablaventa = ({ listaventa, setEjecutarConsulta }) => {
  useEffect(() => {
    console.log(
      "este es el listado de vehiculos en el componente de tabla",
      listaventa
    );
  }, [listaventa]);

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-2xl font-extrabold text-gray-800">
        Todos los diseños 3D
      </h2>
      <table className="tabla">
        <thead>
          {/* los th son los headers de la tabla es decir los que estarán arriba de la misma */}
          <tr>
            <th>Cliente</th>
            <th>Factura</th>
            <th>Valor</th>
            <th>Fecha</th>
            <th>Vendedor</th>
          </tr>
        </thead>
        <tbody>
          {listaventa.map((venta) => {
            /* siempre que pongamos un .map y en el haya un HTML el primer elemento padre de ese .map tiene que llevar si o  un prop que se llama key. Debo garantizar que el key sea unico dentro del parent de ese .map */
            return (
              <Filaventa
                key={nanoid()}
                venta={venta}
                setEjecutarConsulta={setEjecutarConsulta}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  ); /* La etiqueta de tabla siempre tiene 2 etiquetas un thead y un body */
};

const Filaventa = ({ venta, setEjecutarConsulta }) => {
  /* Cuando necesite modificar algo que esta dentro de un .map necesito otro componente para poder modificar estas cosas porque sino se complica el code */
  const [edit, setEdit] = useState(false);
  const [infoNuevoventa, setinfoNuevoventa] = useState({// se coloca asi porque vamos a manejar un solo estado en todo el formulario
    cliente: venta.cliente,
    factura: venta.factura,
    valor: venta.valor,
    fecha: venta.fecha,
    vendedor: venta.vendedor,
  })
  const actualizarventa = async() => {
    console.log(infoNuevoventa)
    // Con el siguiente codigo lo que me permite es enviar la informacion al backend actulizarla despues de que ya la he editado
    const options = {
      method: "PATCH",
      url: "https://vast-waters-45728.herokuapp.com/venta/update", // debe tener al final el update
      headers: { "Content-Type": "application/json" },
      data: {...infoNuevoventa, id:venta._id},// debo enviarle el _id y es con venta._id con el guion al piso bajo
    };

    await axios.request(options).then(function (response) { console.log(response.data); toast.success("Diseno modificado con éxito"); setEdit(false); setEjecutarConsulta(true)}).catch(function (error) { toast.error("Error al modificar el vehiculo"); console.error(error)})
    // setEdit(false)= lo que hace es que cuando oprima el icono del check vuelve al estado anterior que es el lapiz de modificar
  }

  const eliminarVentas = async() => {// Esta funcion hace que se elimine el registro que seleccione
    const options = {
      method: "DELETE",
      url: "https://vast-waters-45728.herokuapp.com/venta/delete/",
      headers: { "Content-Type": "application/json" },
      data: { id: venta._id },
    };
    await axios.request(options).then(function (response) { console.log(response.data); toast.success("Diseño 3D eliminado con éxito"); setEjecutarConsulta=(true) }).catch(function (error) { console.error(error); toast.error("Error al eliminar el diseño 3D")})
  }
  return (
    <tr>
      {
        // Renderizacion condicional
        edit ? (
          <>
            <td>
              <input
                className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
                type="text"
                value={infoNuevoventa.name}
                onChange={(e) =>
                  setinfoNuevoventa({
                    ...infoNuevoventa,
                    name: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
                type="text"
                value={infoNuevoventa.brand}
                onChange={(e) =>
                  setinfoNuevoventa({
                    ...infoNuevoventa,
                    brand: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
                type="text"
                value={infoNuevoventa.model}
                onChange={(e) =>
                  setinfoNuevoventa({
                    ...infoNuevoventa,
                    model: e.target.value,
                  })
                }
              />
            </td>
          </>
        ) : (
          <>
            <td>{venta.cliente}</td>
            <td>{venta.factura}</td>
            <td>{venta.valor}</td>
            <td>{venta.fecha}</td>
            <td>{venta.vendedor}</td>
          </>
        )
      }
      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <i
              onClick={() => actualizarventa()}
              className="far fa-check-square text-green-700 hover:text-green-500"
            />
          ) : (
            <i
              onClick={() => setEdit(!edit)} // setEdit(!edit)} se setea el edit en el estado anterior
              className="fas fa-edit text-yellow-700 hover:text-yellow-500" // Este código me sirve para colocar el lapicito de editar en la columna de acciones, y text-yellow-700 hover:text-yellow-500 Este codigo sirve para poner el icono de un color y que cuando el mouse pase por ese lado lo coloque de otro color y el onclick lo que sirve es que cuando haga click el icono lo pueda cambiar por otro
            />
          )}
          <i onclick={() => eliminarVentas() } class="far fa-trash-alt text-red-700 hover:text-red-400"></i>
        </div>
      </td>
    </tr>
  );
};

const FormularioCreacionventa = ({
  setMostrarTabla,
  listaventa,
  setventa,
}) => {
  const form = useRef(null);
  const submitForm = async (e) => {
    //Axios trae la informacion del formulario cuando damos click en y hacemos submit, la convertimos en un objeto con new FormData despues creamos las opciones del axios
    //El codigo async = Es para dar a entender que es asincrono es decir que debo esperar a que de parte del BACKEND me envien una respuesta y para ayudar al usuario a esperar colocamos un logo que esta cargando hasta obtener una respuesta despues le pasamos las opciones a axios.request(options) generamos la respuesta con response.data y mostramos el mensaje de toast.success("El diseño fue agregado con éxito")
    e.preventDefault(); //prevedir el evento por defecto que es redirigir a alguna parte
    const fd = new FormData(form.current);
    const nuevodiseno = {};
    fd.forEach((value, key) => {
      nuevodiseno[key] = value;
    });

    const options = {
      method: "POST", // lo que quiero crear. Este es el metodo y puede ser GET POST PUT/PATH ó DELETE en este caso se uso POST porque queremos crear un nuevo diseño 3D
      url: "https://vast-waters-45728.herokuapp.com/venta/create", //Donde esta el api
      headers: { "Content-Type": "application/json" },
      data: { name: "Renault", brand: "Sandero", model: 2020 }, // Datos que vienen del formulario es decir datos que le vamos a enviar a la base de datos
    };

    await axios // await = Se debe colocar con el sync para que espere una respuesta del BACKEND
      .request(options)
      .then(function (response) {
        console.log(response.data); //console.log(response.data) esta parte de codigo muestra si es satisfactorio la creacion del diseño3D
        toast.success("El diseño fue agregado con éxito");
      })
      .catch(function (error) {
        console.error(error);
        toast.error("El diseño NO fue agregado con éxito");
      }); // console.error(error) y esta parte de codigo muestra una ventana emergente si hay algun tipo de error en la creacion del diseño3D
    setMostrarTabla(true);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-extrabold text-gray-800 m-2">
        Crear una
      </h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        {/* grid grid-cols-2 Grid en 2 columnas */}
        <label className="flex flex-col" htmlFor="nombre">
          Cliente
          <input
            name="nombre"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="text"
            placeholder="Cliente"
            required
          />
        </label>
        <label className="flex flex-col" htmlFor="color">
          Color del materia
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="color"
            required
            defaultValue={0}
          >
            {/* la estructura para hacer un seleccionador es label select y despues option*/}
            <option disabled value={0}>
              Selecione una opcion
            </option>{" "}
            {/* disable es para que no pueda seleccionar esa opcion */}
            <option>Amarillo</option>
            <option>Azul</option>
            <option>Negro</option>
            <option>Blanco</option>
            <option>Rojo</option>
          </select>
        </label>
        <label className="flex flex-col" htmlFor="material">
          Material del diseño
          <select
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            name="material"
            required
          >
            {/* la estructura para hacer un seleccionador es label select y despues option*/}
            <option disabled>Selecione una opcion</option>{" "}
            {/* disable es para que no pueda seleccionar esa opcion */}
            <option>Filamento ABS</option>
            <option>Filamento flexible</option>
            <option>Filamento PC</option>
            <option>Filamentos PETG</option>
            <option>Filamento fibra de carbono</option>
          </select>
        </label>
        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white m-2"
        >
          Guardar Diseño
        </button>
        {/* col-span-2 para que ocupe 2 columnas el boton completo shadow-md pone una sombra abajo del boton */}
      </form>
    </div>
  );
};


// Renderización condicional = Es basicamente hacer lo mismo de dirigirnos a una ruta nueva como con el Roote, pero esta vez solo con un botón y no con un link como tal
// text-2xl font-extrabold= el text-2xl lo que hace es agrandar un poco el texto y el font-extrabold lo pone en negrita
// useEffect(() => {Ejecuta lo que haya a acá dentro}, [MostrarTabla]); = Este useEffect ejecutalo que hay dentro de los corchetes si cambia la variable MostrarTabla
//useEffect(() => {Ejecuta lo que haya a acá dentro}, []);= Este useEffect solo se ejecuta una vez en todo el programa y para que se vuelva a ejecutar debemos recargar la página
//useEffect(() => {Ejecuta lo que haya a acá dentro}, ); = Este useEffect no es recomendable usarlo
//      toast.success("Diseño 3D creado con éxito"); //Cuando le coloco success es que me mostrará un mensaje de que fue agregado con éxito el mensaje varia dependiendo lo que vaya dentro del parentesis, pero la forma que toma si, depende de lo que ponga despues del punto de toas. puede ser .info y en fin agregar más dependiendo la documentacion de toastify
//    funcioParaMostrarLaTabla(true);
//  funcioParaAgregarUnDiseno([...listaVentas, { nombre: nombre, color: color, material: material }]); //[...listaVentas]= lo que hago con esto es hacer un append lo que significa los 3 puntos es un express operator y significa que ponga todo lo que ya habia mas lo nuevo que sigue que es despues de los 3 puntos
//}
// Tablaventa y formularioCrecionventa tienen renderizacion condicional

export default Ventas
