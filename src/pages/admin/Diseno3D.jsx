import React, { useEffect, useState, useRef } from "react";
import axios from "axios";// axios es front y express es back pero son como hermanos ya que uno envia las solicitudes (axios) y el otro las recibe (express)
//Estos import que siguen son de reac-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { nanoid } from "nanoid"; //esta libreria es para manejar los key... yarn add nanoid
import { Tooltip } from "@material-ui/core";
import {Dialog} from "@material-ui/core";

const Diseno3D = () => {
  const [MostrarTabla, setMostrarTabla] = useState(true); //Rendedirazion Condicional
  const [diseno3D, setdiseno3D] = useState([]);
  const [TextoBoton, setTextoBoton] = useState("Crear nuevo diseño 3D");
  const [ColorBoton, setColorBoton] = useState("indigo"); //Variable para cambiar el valor del color del boton const [ColorBoton, setColorBoton] La variable es ColorBoton y la que actualiza el estado es setColorBoton y el useState ("indigo") es el estado en el que empieza mi variable
  const [ejecutarConsulta, setEjecutarConsulta] = useState(true);
  useEffect(() => {
    const obtenerdiseno3D = async () => {
      // Se creo una variable para poder sincronizar los datos que entrega el Backend
      const options = {
        method: "GET",
        url: "https://vast-waters-45728.herokuapp.com/vehicle/",
      };
      await axios
        .request(options)
        .then(function (response) {
          setdiseno3D(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    if (ejecutarConsulta) {
      obtenerdiseno3D();
      setEjecutarConsulta(false);
    }
  }, [ejecutarConsulta]);

  useEffect(() => {
    if (MostrarTabla) {
      setEjecutarConsulta(true);
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
        <Tabladiseno3D
          listadiseno3D={diseno3D}
          setEjecutarConsulta={setEjecutarConsulta}
        />
      ) : (
        <FormularioCreaciondiseno3D
          setMostrarTabla={setMostrarTabla}
          listadiseno3D={diseno3D}
          setdiseno3D={setdiseno3D}
        />
      )}
      <ToastContainer position="bottom-center" autoClose={5000} />{" "}
      {/* es la posicion en la que quiero que aparezca el mensaje y el autoClose en cuantos milisegundos quiere que se vaya ese msn ... el contenedor es ToastContainer pero la funcion como tal es toast*/}
    </div>
  );
};

const Tabladiseno3D = ({ listadiseno3D, setEjecutarConsulta }) => {
  const [busqueda, setBusqueda] = useState("")
  const [diseno3DFiltrados,setDiseno3DFiltrados]= useState(listadiseno3D) // En este caso este estado tendra un estado que esta entrando como prop, es decir este estado tendra todos los diseños 3D que vienen del backend
  useEffect(() => {
    setDiseno3DFiltrados(
      listadiseno3D.filter((elemento) => {
          return JSON.stringify(elemento).toLowerCase().includes(busqueda.toLowerCase());
        })    
    );
    // .filter()= es una funcion de los objetos de JavaScript, que si los objetos de esa lista coinciden de una vez va filtrando en tiempo real lo que estoy buscando. Esta funcion devuelve un array con los objetos que cumplen esa condicion, pero yo quiero buscar no por una columna en especifico sino por cualquier elemento de la tabla entonces debo convertir en donde voy a buscar convertirlo en un objeto JSONstringify para buscar mejor el elemento, en este casi se convertira con la funcion JSON en todo mis diseños 3D practicamente con JSON.stringify estoy conviertiendo el objeto en un string y con la funcion inlcudes busco en todo el objeto la coincidencia ... toLowerCase()= lo que hace es converntirme todo lo que esta en mayuscula pasarlo a minisculas
  }, [busqueda, listadiseno3D])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <input
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar"
        className="border-2 border-gray-700 px-3 py-1 self-start rounded-md focus:outline-none focus:border-indigo-500"
      />
      {/* self-start= corre a la derecha el input de buscar...border-2=para poner el borde mas grande... focus:outline-none focus:border-indigo-500 = para colocar un color al borde diferente*/}
      <h2 className="text-2xl font-extrabold text-gray-800">
        Todos los diseños 3D
      </h2>
      <div className="hidden md:flex w-full">
        {" "}
        {/* Esto es responsive y el proyecto quedo con 3 etapas que en pantallas pequeñas quedan unos cards para cada diseño 3D, en pantallas medianas queda la tabla y en pantallas grandes queda el sidebar y la tabla */}
        <table className="tabla">
          <thead>
            {/* los th son los headers de la tabla es decir los que estarán arriba de la misma */}
            <tr>
              <th>Nombre del diseño 3D</th>
              <th>Color del materia</th>
              <th>Material del diseño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {diseno3DFiltrados.map((diseno3D) => {
              /* siempre que pongamos un .map y en el haya un HTML el primer elemento padre de ese .map tiene que llevar si o  un prop que se llama key. Debo garantizar que el key sea unico dentro del parent de ese .map */
              return (
                <Filadiseno3D
                  key={nanoid()}
                  diseno3D={diseno3D}
                  setEjecutarConsulta={setEjecutarConsulta}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col w-full m-2 md:hidden">
        {/* Esto es responsive */}
        {diseno3DFiltrados.map((el) => {
          return (
            <div className="bg-gray-400 m-2 shadow-xl flex flex-col p-2 rounded-xl">
              <span>{el.name}</span>
              <span>{el.brand}</span>
              <span>{el.model}</span>
            </div>
          );
        })}
      </div>
    </div>
  ); /* La etiqueta de tabla siempre tiene 2 etiquetas un thead y un body */
};

const Filadiseno3D = ({ diseno3D, setEjecutarConsulta }) => {
  /* Cuando necesite modificar algo que esta dentro de un .map necesito otro componente para poder modificar estas cosas porque sino se complica el code */
  const [edit, setEdit] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);// Se deja en true mientras, para ir haciendo pruebas e ir mirando de forma rapida como va quedando el mensaje, pero debe inicializar en false
  const [infoNuevodiseno3D, setinfoNuevodiseno3D] = useState({
    // se coloca asi porque vamos a manejar un solo estado en todo el formulario
    name: diseno3D.name,
    brand: diseno3D.brand,
    model: diseno3D.model,
  });
  const actualizardiseno3D = async () => {
    console.log(infoNuevodiseno3D);
    // Con el siguiente codigo lo que me permite es enviar la informacion al backend actulizarla despues de que ya la he editado
    const options = {
      method: "PATCH",
      url: "https://vast-waters-45728.herokuapp.com/vehicle/update", // debe tener al final el update
      headers: { "Content-Type": "application/json" },
      data: { ...infoNuevodiseno3D, id: diseno3D._id }, // debo enviarle el _id y es con diseno3D._id con el guion al piso bajo
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Diseno modificado con éxito");
        setEdit(false);
        setEjecutarConsulta(true);
      })
      .catch(function (error) {
        toast.error("Error al modificar el diseño 3D");
        console.error(error);
      });
    // setEdit(false)= lo que hace es que cuando oprima el icono del check vuelve al estado anterior que es el lapiz de modificar
  };

  const eliminarDiseno3D = async () => {
    // Esta funcion hace que se elimine el registro que seleccione
    const options = {
      method: "DELETE",
      url: "https://vast-waters-45728.herokuapp.com/vehicle/delete/",
      headers: { "Content-Type": "application/json" },
      data: { id: diseno3D._id },
    };
    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success("Diseño 3D eliminado con éxito");
        setEjecutarConsulta(true);        
      })
      .catch(function (error) {
        console.error(error);
        toast.error("Error al eliminar el diseño 3D");
      });
    setOpenDialog(false);
  };
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
                value={infoNuevodiseno3D.name}
                onChange={(e) =>
                  setinfoNuevodiseno3D({
                    ...infoNuevodiseno3D,
                    name: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
                type="text"
                value={infoNuevodiseno3D.brand}
                onChange={(e) =>
                  setinfoNuevodiseno3D({
                    ...infoNuevodiseno3D,
                    brand: e.target.value,
                  })
                }
              />
            </td>
            <td>
              <input
                className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
                type="text"
                value={infoNuevodiseno3D.model}
                onChange={(e) =>
                  setinfoNuevodiseno3D({
                    ...infoNuevodiseno3D,
                    model: e.target.value,
                  })
                }
              />
            </td>
          </>
        ) : (
          <>
            <td>{diseno3D.name}</td>
            <td>{diseno3D.brand}</td>
            <td>{diseno3D.model}</td>
          </>
        )
      }
      <td>
        <div className="flex w-full justify-around">
          {edit ? (
            <>
              <Tooltip title="Confirmar Edición" arrow>
                <i
                  onClick={() => actualizardiseno3D()}
                  className="far fa-check-square text-green-700 hover:text-green-500"
                />
              </Tooltip>
              <Tooltip title="Cancelar Edición" arrow>
                <i
                  onClick={() => setEdit(!edit)}
                  className="fas fa-ban text-yellow-700 hover:text-yellow-500"
                />
              </Tooltip>
            </>
          ) : (
            <>
              {" "}
              {/*<></>=fragmento vacio porque todos los componentes deben tener un padre */}
              <Tooltip title="Editar Diseño 3D" arrow>
                <i
                  onClick={() => setEdit(!edit)} // setEdit(!edit)} se setea el edit en el estado anterior ... arrow = Es basicamente la flechita la guia del Tooltip
                  className="fas fa-edit text-yellow-700 hover:text-yellow-500" // Este código me sirve para colocar el lapicito de editar en la columna de acciones, y text-yellow-700 hover:text-yellow-500 Este codigo sirve para poner el icono de un color y que cuando el mouse pase por ese lado lo coloque de otro color y el onclick lo que sirve es que cuando haga click el icono lo pueda cambiar por otro
                />
              </Tooltip>
              <Tooltip title="Eliminar Diseño 3D" arrow>
                {/* Este Tooltip sirve para que cuando el usuario se coloque encima del icono de eliminar, aparezca el mensaje de title="Eliminar Diseño 3D" */}
                <i
                  onclick={() => setOpenDialog(true)}
                  className="far fa-trash-alt text-red-700 hover:text-red-400"
                />
              </Tooltip>
            </>
          )}
        </div>
        {/*El dialogo es una ventana emergente en este caso saldra para confirmar si de verdad queremos eliminar un registro. Los dialogos deben tener un prop que se llama open y este debe tener adentro un estado que cambie de true a false que es para que se muestre o no se quite */}
        <Dialog open={openDialog}>
          hola mundo soy un dialogo
          <div className="p-8 flex flex-col">{/* flex flex-1-col= para que me muestre uno debajo del otro */}
            <h1 className="text-gray-900 text-2xl font-bold">¿Está seguro de eliminar el diseño?</h1>
            <div className="flex w-full items-center justify-center my-4">
              <button onclick={()=>eliminarDiseno3D()} className="mx-2 px-4 py-2 bg-green-500 text-white hover:bg-green-700 rounded-md shadow-md">Si</button>
              <button onclick={()=> setOpenDialog(false)} className="mx-2 px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md shadow-md">No</button>
            </div>
          </div>
        </Dialog>
      </td>
    </tr>
  );
};

const FormularioCreaciondiseno3D = ({
  setMostrarTabla,
  listadiseno3D,
  setdiseno3D,
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
      url: "https://vast-waters-45728.herokuapp.com/vehicle/create", //Donde esta el api
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
        Crear Un Nuevo Diseño 3D
      </h2>
      <form ref={form} onSubmit={submitForm} className="flex flex-col">
        {/* grid grid-cols-2 Grid en 2 columnas */}
        <label className="flex flex-col" htmlFor="nombre">
          Nombre de su diseño 3D
          <input
            name="nombre"
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="text"
            placeholder="Nombre del diseño 3D"
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

export default Diseno3D;
// Renderización condicional = Es basicamente hacer lo mismo de dirigirnos a una ruta nueva como con el Roote, pero esta vez solo con un botón y no con un link como tal
// text-2xl font-extrabold= el text-2xl lo que hace es agrandar un poco el texto y el font-extrabold lo pone en negrita
// useEffect(() => {Ejecuta lo que haya a acá dentro}, [MostrarTabla]); = Este useEffect ejecutalo que hay dentro de los corchetes si cambia la variable MostrarTabla
//useEffect(() => {Ejecuta lo que haya a acá dentro}, []);= Este useEffect solo se ejecuta una vez en todo el programa y para que se vuelva a ejecutar debemos recargar la página
//useEffect(() => {Ejecuta lo que haya a acá dentro}, ); = Este useEffect no es recomendable usarlo
//      toast.success("Diseño 3D creado con éxito"); //Cuando le coloco success es que me mostrará un mensaje de que fue agregado con éxito el mensaje varia dependiendo lo que vaya dentro del parentesis, pero la forma que toma si, depende de lo que ponga despues del punto de toas. puede ser .info y en fin agregar más dependiendo la documentacion de toastify
//    funcioParaMostrarLaTabla(true);
//  funcioParaAgregarUnDiseno([...listaDiseno3D, { nombre: nombre, color: color, material: material }]); //[...listaDiseno3D]= lo que hago con esto es hacer un append lo que significa los 3 puntos es un express operator y significa que ponga todo lo que ya habia mas lo nuevo que sigue que es despues de los 3 puntos
//}
// Tabladiseno3D y formularioCreciondiseno3D tienen renderizacion condicional
// /* "hidden md:block"= Este codigo lo que hace es que de pantallas medianas en adelante va a mostrarme algo */
