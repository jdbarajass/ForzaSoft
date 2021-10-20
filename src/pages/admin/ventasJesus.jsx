import React, { useState, useEffect, useRef } from "react";
import { obtenerdiseno3D, obtenerUsuarios, crearVenta } from "utils/api";
import { nanoid } from "nanoid";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setvendedores] = useState([]); // Todos los vendedores los tenemos que traer de un estado
  const [diseno3D, setdiseno3D] = useState([]);
  const [diseno3DSeleccionados, setdiseno3DSeleccionados] = useState([]);
  useEffect(() => {
    // un useEffect vacio se ejecuta una sola vez cuando empieza el programa
    const fetchVendedores = async () => {
      // se coloca asi es porque dentro de un useeffect no puede colocar un async pero en una funcion si
      await obtenerUsuarios(
        (response) => {
          setvendedores(response.data);
        },
        (error) => {
          console.log(error);
        }
      ); // le pasamos los 2 callbakc el succesCallback y el errorCallback
    };
    const fetchdiseno3D = async (response) => {
      await obtenerdiseno3D(
        (response) => {
          setdiseno3D(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }; // vamos a obtener los diseños 3D
    fetchVendedores();
    fetchdiseno3D();
  }, []);

  const agregarNuevodiseno3D = async (response) => {
    setdiseno3DSeleccionados([...diseno3DSeleccionados, DropDowndiseno3D]); //...diseno3Dseleccionados = esta linea de codigo quiere decir que mantenga lo que habia antes en diseno3DSeleccionados pero adeamas de eso le voy a agregar un nuevo elemento que va despues de la coma, que es la nueva instancia del DropDowndiseno3D
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);
    const formData = {}; // Esta variable formData saca un objeto con el nombre del input y al frente el valor que yo ingrese en el formulario
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    const infoConsolidada = {
      valor: formData.valor,
      vendedor: vendedores.filter((v) => v._id === formData.vendedor)[0],
      diseno3D: diseno3D.filter((v) => v._id === formData.diseno3D)[0],
    };
    console.log(infoConsolidada);
    await crearVenta(
      infoConsolidada,
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className="flex h-full w-full overflow-y-scroll items-center justify-center">
      <form ref={form} onsubmit={submitForm} className="flex flex-col">
        <h1 className="text-3xl font-extrabold text-gray-900 my-2">
          Crear una nueva venta
        </h1>
        <label className="flex flex-col" htmlFor="vendedor">
          <span className="text-2xl font-gray-900">Vendedor</span>
          <select name="vendedor" className="p-2" defaultValue={""} required>
            <option disabled value={""}>
              Selecione un vendedor
            </option>
            {diseno3D.map((el) => {
              return (
                <option
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} ${el.lastname}`}</option>
              );
            })}
          </select>
        </label>
        <div className="flex flex-col">
          <span>Seleccion de diseno3D</span>
          <button
            type="button"
            onclick={() => {
              agregarNuevodiseno3D();
            }}
            className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
          >
            agregar nuevo diseno3D
          </button>
        </div>

        <label htmlFor="" className="flex flex-col">
          <span className="text-2xl font-gray-900">Valor total venta</span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="valor"
          ></input>
        </label>
        <button
          type="submit"
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

export default Ventas;
// value = {-1} este valor puede ser cualquiera pero lo importante es colocarlo y tambien en el select defaultValue = {-1}
//value={el._id} = para que cada .map tenga su propia opcion diferente
// formData.vendedor)[0] = que me arroje el primer dato del .filter
// value={-1} defaultValue={-1} = para que me quede requerido el DropDowndiseno3D debo colocar value={""} defaultValue={""} con comillas y cada vez que lo quiera enviar o darle submit debo llenar ese espacio
// yarn add @auth0/auth0-react = para instalar auth0 
