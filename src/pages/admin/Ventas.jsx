import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import {
  crearVenta,
  obtenerProductos,
  obtenerUsuariosVendedor,
  obtenerClientes,
} from "utils/api";
import { useLocalStorage } from "hooks/useLocalStorage";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setVehiculos] = useState([]);
  const [productosTabla, setVehiculosTabla] = useState([]);
  const [clienteid] = useLocalStorage("clienteid", nanoid(8));
  const [vendedorid] = useLocalStorage("vendedorid", nanoid(8));

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuariosVendedor(
        (response) => {
          console.log("respuesta de usuarios", response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchVehiculos = async () => {
      await obtenerProductos(
        (response) => {
          setVehiculos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const fetchClientes = async () => {
      await obtenerClientes(
        (response) => {
          setClientes(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchVehiculos();
    fetchClientes();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log("form data", formData);
    //window.alert(formData.cliente);

    const listaVehiculos = Object.keys(formData)
      .map((k) => {
        if (k.includes("vehiculo")) {
          return productosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    console.log("lista antes de cantidad", listaVehiculos);

    Object.keys(formData).forEach((k) => {
      if (k.includes("cantidad")) {
        const indice = parseInt(k.split("_")[1]);
        listaVehiculos[indice]["cantidad"] = formData[k];
      }
    });

    console.log("lista despues de cantidad", listaVehiculos);

    const datosVenta = {
      cliente: clientes.filter((v) => v._id === formData.cliente)[0],
      vendedor: vendedores.filter((e) => e._id === formData.vendedor)[0],
      totalVenta: formData.valor,
      productos: listaVehiculos,
    };

    console.log("lista productos", listaVehiculos);

    let val = document.getElementById("valor");

    if (val.value > 0) {
      await crearVenta(
        datosVenta,
        (response) => {
          console.log(response);
          window.location.reload(false);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      window.alert("No hay Registros de VENTA");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form
        ref={form}
        onSubmit={submitForm}
        className="flex flex-col h-full w-full mt-8 px-5 py-2"
      >
        <h1 class="text-6xl font-bold tracking-tight text-gray-700">
          Crear una nueva venta
        </h1>
        <label className="flex flex-col mt-8" htmlFor="vendedor">
          <span className="text-2xl font-gray-900 font-bold">Vendedor:</span>
          <select
            name="vendedor"
            className="p-2 border-2 border-gray-700"
            defaultValue=""
            required
          >
            <option disabled value="" name="vendedor">
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return (
                <option key={vendedorid} value={el._id}>{`${el.name}`}</option>
              );
            })}
          </select>
          <span className="text-2xl font-gray-900 mt-6 font-bold">
            Cliente:
          </span>
          <select
            name="cliente"
            className="p-2 border-2 border-gray-700"
            defaultValue=""
            required
          >
            <option disabled value="" name="cliene">
              Seleccione el Cliente
            </option>
            {clientes.map((el) => {
              return (
                <option key={clienteid} value={el._id}>{`${el.name}`}</option>
              );
            })}
          </select>
        </label>
        <span className="text-2xl font-gray-900 mt-6 font-bold">
          Productos:
        </span>
        <TablaVehiculos
          productos={productos}
          setVehiculos={setVehiculos}
          setVehiculosTabla={setVehiculosTabla}
        />

        <label className="flex flex-col">
          <span className="text-2xl font-gray-900 font-semibold">
            Valor Total Venta
          </span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2"
            type="number"
            name="valor"
            id="valor"
            readOnly
            required
          />
        </label>
        <button
          type="submit"
          //className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white rounded-lg'
          className="inline-block px-8 py-3 mx-8 font-semibold text-white transition duraction-200 transform rounded-sm shadow-sm bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Crear Venta
        </button>
      </form>
    </div>
  );
};

const TablaVehiculos = ({ productos, setVehiculos, setVehiculosTabla }) => {
  const [vehiculoAAgregar, setVehiculoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);
  /*
    useEffect(() => {
      console.log(vehiculoAAgregar);
    }, [vehiculoAAgregar]);
  
  
    useEffect(() => {
      console.log('filasTabla', filasTabla);
      setVehiculosTabla(filasTabla);
    }, [filasTabla, setVehiculosTabla]);
  
  */
  useEffect(() => {
    setVehiculosTabla(filasTabla);

    var table = document.getElementById("tabla"),
      rows = table.getElementsByTagName("tr"),
      i,
      j,
      cells,
      customerId;
    var total = 0;
    for (i = 0, j = rows.length; i < j; ++i) {
      cells = rows[i].getElementsByTagName("td");
      if (!cells.length) {
        continue;
      }
      customerId = cells[6].innerHTML;
      total = parseInt(customerId) + total;
      //  alert(customerId);
    }

    let val = document.getElementById("valor");
    val.value = total;
  }, [filasTabla, setVehiculosTabla]);

  const agregarNuevoVehiculo = () => {
    setFilasTabla([...filasTabla, vehiculoAAgregar]);
    setVehiculos(productos.filter((v) => v._id !== vehiculoAAgregar._id));
    setVehiculoAAgregar({});
  };

  const eliminarVehiculo = (vehiculoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== vehiculoAEliminar._id));

    setVehiculos([...productos, vehiculoAEliminar]);
  };

  const modificarVehiculo = (vehiculo, cantidad) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === vehiculo.id) {
          ft.cantidad = cantidad;
          ft.total = vehiculo.valor * cantidad;
        }
        return ft;
      })
    );
  };

  return (
    <div>
      <div className="flex">
        <label
          className="flex flex-col border-2 border-gray-700"
          htmlFor="vehiculo"
        >
          <select
            className="p-2"
            name="producto"
            id="producto"
            value={vehiculoAAgregar._id ?? ""}
            onChange={(e) =>
              setVehiculoAAgregar(
                productos.filter((v) => v._id === e.target.value)[0]
              )
            }
          >
            <option disabled value="">
              Seleccione un producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  required
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} ${el.brand} ${el.model}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            var sel = document.getElementById("producto");
            var text = sel.options[sel.selectedIndex].text;
            if (text !== "Seleccione un producto") {
              agregarNuevoVehiculo();
            }
          }}
          className="inline-block px-8 py-3 mx-8 font-semibold text-white transition duraction-200 transform rounded-sm shadow-sm bg-gray-700 hover:bg-gray-600 rounded-lg"
        >
          Agregar Producto
        </button>
      </div>
      <table className="tabla" id="tabla" name="tabla">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
            <th>Eliminar</th>
            <th className="hidden">Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              /*
              <tr key={nanoid()}>
                <td >{el.id}</td>
                <td>{el.name}</td>
                <td>
                  <label htmlFor={`valor_${index}`}>
                    <input type='number' name={`cantidad_${index}`} />
                  </label>
                </td>
                <td>{el.costo}</td>
                <td>
                  <i
                    onClick={() => eliminarVehiculo(el)}
                    className='fas fa-minus text-red-500 cursor-pointer'
                  />
                </td>
                <input hidden defaultValue={el._id} name={`vehiculo_${index}`} />
              </tr>
            );
          }
          */
              <FilaVehiculo
                key={el._id}
                veh={el}
                index={index}
                eliminarVehiculo={eliminarVehiculo}
                modificarVehiculo={modificarVehiculo}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaVehiculo = ({ veh, index, eliminarVehiculo, modificarVehiculo }) => {
  const [ventaTotal, setVentaTotal] = useState([]);

  useEffect(() => {
    if (ventaTotal != null) {
      var table = document.getElementById("tabla"),
        rows = table.getElementsByTagName("tr"),
        i,
        j,
        cells,
        customerId;
      var total = 0;
      for (i = 0, j = rows.length; i < j; ++i) {
        cells = rows[i].getElementsByTagName("td");
        if (!cells.length) {
          continue;
        }
        customerId = cells[6].innerHTML;
        total = parseInt(customerId) + total;
        //  alert(customerId);
      }
    }
    let val = document.getElementById("valor");
    val.value = total;
  }, [ventaTotal]);

  const [vehiculo, setVehiculo] = useState(veh);

  useEffect(() => {
    console.log("veh", vehiculo);
    // setVentaTotal();
  }, [vehiculo]);

  return (
    <tr name={`fila_${index}`}>
      <td>{`${index + 1}`} </td>
      <td>{vehiculo.name}</td>
      <td>{vehiculo.brand}</td>
      <td>{vehiculo.model}</td>
      <td>
        <label htmlFor={`valor_${index}`}>
          <input
            type="number"
            name={`cantidad_${index}`}
            value={vehiculo.cantidad >= 0 ? vehiculo.cantidad : "0"}
            onChange={(e) => {
              modificarVehiculo(
                vehiculo,
                e.target.value === "" ? "0" : e.target.value
              );
              setVehiculo({
                ...vehiculo,
                cantidad: e.target.value === "" ? "0" : e.target.value,
                total:
                  parseFloat(vehiculo.valor) *
                  parseFloat(e.target.value === "" ? "0" : e.target.value),
              });
              setVentaTotal({ ...ventaTotal, venta: "1" });
            }}
          />
        </label>
      </td>
      <td>{vehiculo.costo}</td>
      <td>
        {vehiculo.cantidad > 0
          ? parseFloat(vehiculo.costo * vehiculo.cantidad)
          : "0"}
      </td>
      <td>
        <i
          onClick={(e) => {
            eliminarVehiculo(vehiculo);

            setVentaTotal({ ...ventaTotal, venta: "1" });
          }}
          className="fas fa-minus text-red-500 cursor-pointer"
        />
      </td>
      <td className="hidden">
        <input hidden defaultValue={vehiculo._id} name={`vehiculo_${index}`} />
      </td>
    </tr>
  );
};

export default Ventas;

/* import { nanoid } from "nanoid";
import React, { useState, useEffect, useRef } from "react";
import {
  crearVenta,
  obtenerProductos,
  obtenerUsuariosVendedor,
  obtenerClientes,
} from "utils/api";
import { useLocalStorage } from "hooks/useLocalStorage";

const Ventas = () => {
  const form = useRef(null);
  const [vendedores, setVendedores] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [productos, setVehiculos] = useState([]);
  const [productosTabla, setVehiculosTabla] = useState([]);
  const [clienteid] = useLocalStorage("clienteid", nanoid(8));
  const [vendedorid] = useLocalStorage("vendedorid", nanoid(8));

  useEffect(() => {
    const fetchVendores = async () => {
      await obtenerUsuariosVendedor(
        (response) => {
          console.log("respuesta de usuarios", response);
          setVendedores(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };
    const fetchVehiculos = async () => {
      await obtenerProductos(
        (response) => {
          setVehiculos(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    const fetchClientes = async () => {
      await obtenerClientes(
        (response) => {
          setClientes(response.data);
        },
        (error) => {
          console.error(error);
        }
      );
    };

    fetchVendores();
    fetchVehiculos();
    fetchClientes();
  }, []);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const formData = {};
    fd.forEach((value, key) => {
      formData[key] = value;
    });

    console.log("form data", formData);

    const listaVehiculos = Object.keys(formData)
      .map((k) => {
        if (k.includes("vehiculo")) {
          return productosTabla.filter((v) => v._id === formData[k])[0];
        }
        return null;
      })
      .filter((v) => v);

    console.log("lista antes de cantidad", listaVehiculos);

    Object.keys(formData).forEach((k) => {
      if (k.includes("cantidad")) {
        const indice = parseInt(k.split("_")[1]);
        listaVehiculos[indice]["cantidad"] = formData[k];
      }
    });

    console.log("lista despues de cantidad", listaVehiculos);

    const datosVenta = {
      cliente: clientes.filter((v) => v._id === formData.cliente)[0],
      vendedor: vendedores.filter((e) => e._id === formData.vendedor)[0],
      totalVenta: formData.valor,
      productos: listaVehiculos,
    };

    console.log("lista productos", listaVehiculos);

    let val = document.getElementById("valor");

    if (val.value > 0) {
      await crearVenta(
        datosVenta,
        (response) => {
          console.log(response);
          window.location.reload(false);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      window.alert("No hay Registros de VENTA");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <form ref={form} onSubmit={submitForm} className="flex flex-col h-full">
        <h1 className="text-3xl font-extrabold text-gray-900 my-3">
          Crear una nueva venta
        </h1>
        <label className="flex flex-col" htmlFor="vendedor">
          <span className="text-2xl font-gray-900">Vendedor:</span>
          <select name="vendedor" className="p-2" defaultValue="" required>
            <option disabled value="" name="vendedor">
              Seleccione un Vendedor
            </option>
            {vendedores.map((el) => {
              return (
                <option key={vendedorid} value={el._id}>{`${el.name}`}</option>
              );
            })}
          </select>
          <span className="text-2xl font-gray-900">Cliente:</span>
          <select name="cliente" className="p-2" defaultValue="" required>
            <option disabled value="" name="cliene">
              Seleccione el Cliente
            </option>
            {clientes.map((el) => {
              return (
                <option key={clienteid} value={el._id}>{`${el.name}`}</option>
              );
            })}
          </select>
        </label>
        <span className="text-2xl font-gray-900">Productos:</span>
        <TablaVehiculos
          productos={productos}
          setVehiculos={setVehiculos}
          setVehiculosTabla={setVehiculosTabla}
        />

        <label className="flex flex-col">
          <span className="text-2xl font-gray-900">Valor Total Venta</span>
          <input
            className="bg-gray-50 border border-gray-600 p-2 rounded-lg m-2 "
            type="number"
            name="valor"
            id="valor"
            readOnly
            required
          />
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

const TablaVehiculos = ({ productos, setVehiculos, setVehiculosTabla }) => {
  const [vehiculoAAgregar, setVehiculoAAgregar] = useState({});
  const [filasTabla, setFilasTabla] = useState([]);

  useEffect(() => {
    setVehiculosTabla(filasTabla);

    var table = document.getElementById("tabla"),
      rows = table.getElementsByTagName("tr"),
      i,
      j,
      cells,
      customerId;
    var total = 0;
    for (i = 0, j = rows.length; i < j; ++i) {
      cells = rows[i].getElementsByTagName("td");
      if (!cells.length) {
        continue;
      }
      customerId = cells[6].innerHTML;
      total = parseInt(customerId) + total;
    }

    let val = document.getElementById("valor");
    val.value = total;
  }, [filasTabla, setVehiculosTabla]);

  const agregarNuevoVehiculo = () => {
    setFilasTabla([...filasTabla, vehiculoAAgregar]);
    setVehiculos(productos.filter((v) => v._id !== vehiculoAAgregar._id));
    setVehiculoAAgregar({});
  };

  const eliminarVehiculo = (vehiculoAEliminar) => {
    setFilasTabla(filasTabla.filter((v) => v._id !== vehiculoAEliminar._id));

    setVehiculos([...productos, vehiculoAEliminar]);
  };

  const modificarVehiculo = (vehiculo, cantidad) => {
    setFilasTabla(
      filasTabla.map((ft) => {
        if (ft._id === vehiculo.id) {
          ft.cantidad = cantidad;
          ft.total = vehiculo.valor * cantidad;
        }
        return ft;
      })
    );
  };

  return (
    <div>
      <div className="flex ">
        <label className="flex flex-col" htmlFor="vehiculo">
          <select
            className="p-2"
            name="producto"
            id="producto"
            value={vehiculoAAgregar._id ?? ""}
            onChange={(e) =>
              setVehiculoAAgregar(
                productos.filter((v) => v._id === e.target.value)[0]
              )
            }
          >
            <option disabled value="">
              Seleccione un producto
            </option>
            {productos.map((el) => {
              return (
                <option
                  required
                  key={nanoid()}
                  value={el._id}
                >{`${el.name} ${el.brand} ${el.model}`}</option>
              );
            })}
          </select>
        </label>
        <button
          type="button"
          onClick={() => {
            var sel = document.getElementById("producto");
            var text = sel.options[sel.selectedIndex].text;
            if (text !== "Seleccione un producto") {
              agregarNuevoVehiculo();
            }
          }}
          className="col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white"
        >
          Agregar Producto
        </button>
      </div>
      <table className="tabla" id="tabla" name="tabla">
        <thead>
          <tr>
            <th>Id</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Cantidad</th>
            <th>Valor Unitario</th>
            <th>Total</th>
            <th>Eliminar</th>
            <th className="hidden">Input</th>
          </tr>
        </thead>
        <tbody>
          {filasTabla.map((el, index) => {
            return (
              <FilaVehiculo
                key={el._id}
                veh={el}
                index={index}
                eliminarVehiculo={eliminarVehiculo}
                modificarVehiculo={modificarVehiculo}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FilaVehiculo = ({ veh, index, eliminarVehiculo, modificarVehiculo }) => {
  const [ventaTotal, setVentaTotal] = useState([]);

  useEffect(() => {
    if (ventaTotal != null) {
      var table = document.getElementById("tabla"),
        rows = table.getElementsByTagName("tr"),
        i,
        j,
        cells,
        customerId;
      var total = 0;
      for (i = 0, j = rows.length; i < j; ++i) {
        cells = rows[i].getElementsByTagName("td");
        if (!cells.length) {
          continue;
        }
        customerId = cells[6].innerHTML;
        total = parseInt(customerId) + total;
      }
    }
    let val = document.getElementById("valor");
    val.value = total;
  }, [ventaTotal]);

  const [vehiculo, setVehiculo] = useState(veh);

  useEffect(() => {
    console.log("veh", vehiculo);
  }, [vehiculo]);

  return (
    <tr name={`fila_${index}`}>
      <td>{`${index + 1}`} </td>
      <td>{vehiculo.name}</td>
      <td>{vehiculo.brand}</td>
      <td>{vehiculo.model}</td>
      <td>
        <label htmlFor={`valor_${index}`}>
          <input
            type="number"
            name={`cantidad_${index}`}
            value={vehiculo.cantidad >= 0 ? vehiculo.cantidad : "0"}
            onChange={(e) => {
              modificarVehiculo(
                vehiculo,
                e.target.value === "" ? "0" : e.target.value
              );
              setVehiculo({
                ...vehiculo,
                cantidad: e.target.value === "" ? "0" : e.target.value,
                total:
                  parseFloat(vehiculo.valor) *
                  parseFloat(e.target.value === "" ? "0" : e.target.value),
              });
              setVentaTotal({ ...ventaTotal, venta: "1" });
            }}
          />
        </label>
      </td>
      <td>{vehiculo.costo}</td>
      <td>
        {vehiculo.cantidad > 0
          ? parseFloat(vehiculo.costo * vehiculo.cantidad)
          : "0"}
      </td>
      <td>
        <i
          onClick={(e) => {
            eliminarVehiculo(vehiculo);

            setVentaTotal({ ...ventaTotal, venta: "1" });
          }}
          className="fas fa-minus text-red-500 cursor-pointer"
        />
      </td>
      <td className="hidden">
        <input hidden defaultValue={vehiculo._id} name={`vehiculo_${index}`} />
      </td>
    </tr>
  );
};

export default Ventas;
 */
