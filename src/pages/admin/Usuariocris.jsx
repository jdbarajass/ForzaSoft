import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
//import { ToastContainer, toast } from "react-toastify";
//import 'react-toastify/dist/ReactToastify.css';
import { uuid } from 'uuidv4';
import { v5 as uuidv5 } from 'uuid';

const usersBackend = [
{
    id: uuid(),
    nombres:"Cristian",
    apellidos:"Ariza",
    direccion:"12456",
    telefono:"1234567",
    correoE:"ca@correo.com",
    contrasena:"1234",
    rol:"ventas",
    estado:"aprobado"
},
{
    id: uuid(),
    nombres:"Usuario2",
    apellidos:"Surname2",
    direccion:"12456",
    telefono:"1234567",
    correoE:"u2@correo.com",
    contrasena:"1234",
    rol:"ventas",
    estado:"aprobado"                
},
{
    id: uuid(),
    nombres:"Usuario3",
    apellidos:"Surname3",
    direccion:"12456",
    telefono:"1234567",
    correoE:"u3@correo.com",
    contrasena:"1234",
    rol:"ventas",
    estado:"aprobado"                
},
{
    id: uuid(),
    nombres:"Usuario4",
    apellidos:"Surname4",
    direccion:"12456",
    telefono:"1234567",
    correoE:"u4@correo.com",
    contrasena:"1234",
    rol:"ventas",
    estado:"aprobado",                
}]

const Usuariocris = () => {

    const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     return console.lmog("hola, soy un useEffect que se ejecuta solo una vez cuando la pagina se renderiza, porque tiene el array de dependencias vacío")
    // }, []);

    useEffect(() => {
        //obtener lista de usuarios desde el front end
        setUsers(usersBackend);
    }, []);

    // useEffect(() => {
    //     console.log("este es un useEffect que se ejecuta cada vez que cambia la variable nombres")
    //     console.log("el valor de la variable nombre es ", nombres);
    // }, [nombres]);


    // const cambioDeNombres = (e) => {
    //     setNombres(e.target.value);
    // };
    // const cambioDeApellidos = (e) => {
    //     setApellidos("apellidos:", e.target.value);
    // };
    
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
                Registrar Usuarios
            </h2>

            <FormularioCreacionUsuarios 
                    funcionParaMostrarTabla={setMostrarCamposAdicionales}
                    listaUsuarios={users}
                    funcionParaAgregarUsuario={setUsers}
                />        

            <form className="w-3/4">        
                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <button 
                        onClick={() => 
                            {
                                setMostrarCamposAdicionales(!mostrarCamposAdicionales);
                        }}
                        type="button"
                        // ^ la ausencia de esa linea me hizo perder mucho tiempo
                        className="px-3 btn btn-primary">Listar Usuarios
                    </button>   

                    
                </div>
                {/* <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <Link to="/admin/ListaUsuarios">
                        <button type="button" className="px-3 btn btn-primary">Listar Usuarios</button>   
                    </Link> 
                </div>                */}

                {/* {mostrarCamposAdicionales ? (
                    <TablaUsuarios listaUsuarios={users} />
                ) : (
                    <FormularioCreacionUsuarios 
                    funcionParaMostrarTabla={setMostrarCamposAdicionales}
                    listaUsuarios={users}
                    funcionParaAgregarUsuario={setUsers}
                />
                    )} */}
                    
                
                {mostrarCamposAdicionales && <TablaUsuarios listaUsuarios={users}/>}

                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <Link to="/admin/GestionarUsuarios">
                            <button type="button" className="px-3 btn btn-primary">Gestionar Usuarios</button>   
                        </Link>
                    </div>
                </div>
                {/* <ToastContainer position='bottom-center' autoClose={5000} /> */}
            </form>
        </div>
    );
};

const TablaUsuarios = ({ listaUsuarios }) =>{
    useEffect(() => {
        console.log("este es el listado de usuarios en el componente de tabla", listaUsuarios);
    }, [listaUsuarios])
    return(
        <div className="flex flex-col items-center justify-center">
            <h2 className = "text-2xl font-extrabold text-gray-800">Todos los usuarios</h2>
            <table cellPadding="10" cellSpacing="10">
                <thead className="font-extrabold">
                    <tr>
                        <td>ID</td>
                        <td>Nombres</td>
                        <td>Apellidos</td>
                        <td>Dirección</td>
                        <td>Teléfono</td>
                        <td>Correo electrónico</td>
                        <td>Contraseña</td>
                        <td>Rol</td>
                        <td>Estado</td>
                    </tr>
                </thead>
                <tbody>
                    {listaUsuarios.map((user)=>{
                        return(
                            <tr>
                                <td>{user.id}</td>
                                <td>{user.nombres}</td>
                                <td>{user.apellidos}</td>
                                <td>{user.direccion}</td>
                                <td>{user.telefono}</td>
                                <td>{user.correoE}</td>
                                <td>{user.contrasena}</td>
                                <td>{user.rol}</td>
                                <td>{user.estado}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

const FormularioCreacionUsuarios = ( {
    funcionParaMostrarTabla,
    funcionParaAgregarUsuario,
    listaUsuarios,
    }) => {
    
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoE, setCorreoE] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [rol, setRol] = useState('');
    const [estado, setEstado] = useState('');
    //const [id, setId] = useState('');
    
    const enviarDatosAlBackend = () => {
        //console.log("El valor de la variable Nombres es ", nombres, "El valor de la variable Apellidos es ", apellidos, "El valor de la variable dirección es ", direccion, "El valor de la variable teléfono es ", telefono, "El valor de la variable correo electrónico es ", correoE, "El valor de la variable contraseña es ", contrasena, "El valor de la variable estado es ", estado, "El valor de la variable rol es ", rol);
        //toast.success("Usuario creado con éxito");
        funcionParaMostrarTabla(true);
        const MY_NAMESPACE = 'c4f37b4d-f1f0-4d66-91a5-4e90c0df08fc';
        funcionParaAgregarUsuario([...listaUsuarios,{id:uuidv5(nombres+apellidos+direccion+telefono+correoE, MY_NAMESPACE), nombres:nombres, apellidos:apellidos, direccion: direccion, telefono: telefono, correoE: correoE, contrasena: contrasena, rol: rol, estado: estado}]);
        console.log(listaUsuarios);
    };

    return(
    <form className="mt-8 w-3/4">
    <div>
        <input
            value = {nombres}
            onChange = {(e) => {
                setNombres(e.target.value);
                }}
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="text"
            placeholder="Nombres"
            required
            name = "nombres"
            />

        <input 
            value = {apellidos}
            onChange = {(e) => {
                setApellidos(e.target.value);
                }}
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="text"
            placeholder="Apellidos"
            required
            name="apellidos"
        />
        <input
            value = {direccion}
            onChange = {(e) => {
                setDireccion(e.target.value);
            }}                    
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="text"
            placeholder="Dirección"
            required
            name = "direccion"
        />
        <input
            value = {telefono}
            onChange = {(e) => {
                setTelefono(e.target.value);
            }}                      
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            type="text"
            placeholder="Teléfono"
            required
            name = "telefono"
        />
        <input
            value = {correoE}
            type="email" 
            onChange = {(e) => {
                setCorreoE(e.target.value);
            }}                      
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Correo electrónico"
            required
            name = "correoE"
            />
        <input
            value = {contrasena}
            type="password"
            onChange = {(e) => {
                setContrasena(e.target.value);
            }}                      
            className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Contraseña"
            required
            name = "contrasena"
            />
        <label htmlFor="Rol_usuario" className="block text-gray-500 text-sm font-bold mb-2">
            Seleccionar rol del usuario
            <select
                value = {rol}
                onChange = {(e) => {
                    setRol(e.target.value);
                }}
                type="text"
                className="cursor-pointer mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                name="Rol"
                required                      
                >
                <option disabled selected hidden>Establezca el rol del usuario</option>
                <option value="Vendedor">Vendedor</option>
                <option value="Administrador">Administrador</option>
                <option value="Ejecutivo">Ejecutivo</option>
                <option value="Operativo">Operativo</option>
                <option value="Director">Director</option>
                <option value="Gerente comercial">Gerente comercial</option>
            </select>            
        </label>

        <label htmlFor="Estado_usuario" className="block text-gray-500 text-sm font-bold mb-2">
            Seleccionar estado del usuario
            <select
                value = {estado}
                onChange = {(e) => {
                    setEstado(e.target.value);
                }}
                type="text"
                className="cursor-pointer mb-4 rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                required                      
                name="rol"
                >
                <option disabled>Establezca el estado del rol del usuario</option>
                <option value="Pendiente">Pendiente</option>
                <option value="Aprobado">Aprobado</option>
            </select>
        </label>
    </div>

    <div className="mt-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 mb-0 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
            <button onClick={enviarDatosAlBackend} type="submit" className="px-3 btn btn-primary">Guardar</button>   
    </div>
    {/* <span className="text-gray-500">Usuario agregado con éxito</span>
    <span className="text-red-500">Error al agregar usuario</span> */}
    </form>
    )
}

export default Usuariocris;