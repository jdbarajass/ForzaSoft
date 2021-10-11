import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Toast } from "react-toastify/dist/components";

const Usuario = () => {
    
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoE, setCorreoE] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [estado, setEstado] = useState('');
    const [rol, setRol] = useState('');
    const [ID, setID] = useState('');
    
    const [mostrarCamposAdicionales, setMostrarCamposAdicionales] = useState(false);
    
    const [users, setUsers] = useState([]);

    // useEffect(() => {
    //     return console.lmog("hola, soy un useEffect que se ejecuta solo una vez cuando la pagina se renderiza, porque tiene el array de dependencias vacío")
    // }, []);

    useEffect(() => {
        //obtener lista de usuarios desde el front end
        setUsers(usersBackend);
    }, []);

    useEffect(() => {
        console.log("este es un useEffect que se ejecuta cada vez que cambia la variable nombres")
        console.log("el valor de la variable nombre es ", nombres);
    }, [nombres]);

    const enviarDatosAlBackend = () => {
        console.log("El valor de la variable Nombres es ", nombres, "El valor de la variable Apellidos es ", apellidos, "El valor de la variable dirección es ", direccion, "El valor de la variable teléfono es ", telefono, "El valor de la variable correo electrónico es ", correoE, "El valor de la variable contraseña es ", contrasena, "El valor de la variable estado es ", estado, "El valor de la variable rol es ", rol);
        toast.success("Mensaje")
    };

    const cambioDeNombres = (e) => {
        setNombres(e.target.value);
    };
    const cambioDeApellidos = (e) => {
        setApellidos("apellidos:", e.target.value);
    };
    
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
                Registrar Usuarios
            </h2>
            <form className="mt-8 w-3/4">
                <div>
                    <input onChange={cambioDeNombres}
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Nombres"
                        required
                    />

                    <input onChange={cambioDeApellidos}
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Apellidos"
                        required
                    />
                    <input
                        onChange = {(e) => {
                            setDireccion(e.target.value);
                        }}                    
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Dirección"
                        required
                    />
                    <input
                        onChange = {(e) => {
                            setTelefono(e.target.value);
                        }}                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Teléfono"
                        required
                    />
                    <input
                        type="email" required
                        onChange = {(e) => {
                            setCorreoE(e.target.value);
                        }}                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                    />
                    <input
                        type="password" required
                        onChange = {(e) => {
                            setContrasena(e.target.value);
                        }}                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="password"
                        placeholder="Contraseña"
                        required
                        />
                    {/* <input
                        onChange = {(e) => {
                            setRol(e.target.value);
                        }}                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Rol"
                        required
                    /> */}
                    <select
                        onChange = {(e) => {
                            setRol(e.target.value);
                        }}
                        type="text"
                        required                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        //name="Rol"
                        >
                        <option disabled selected hidden>Establezca el rol del usuario</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Ejecutivo">Ejecutivo</option>
                        <option value="Operativo">Operativo</option>
                        <option value="Director">Director</option>
                        <option value="Gerente comercial">Gerente comercial</option>
                    </select>                      
                    <select
                        onChange = {(e) => {
                            setEstado(e.target.value);
                        }}
                        type="text"
                        required                      
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-700 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        //name="Rol"
                        >
                        <option disabled selected hidden>Establezca el estado del rol del usuario</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aprobado">Aprobado</option>
                    </select>
                </div>

                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <button onClick={enviarDatosAlBackend} type="button" className="px-3 btn btn-primary">Guardar</button>   
                    </div>
                </div>
                <span className="text-gray-500">Usuario agregado con éxito</span>
                <span className="text-red-500">Error al agregar usuario</span>

                <ToastContainer position='bottom-center' autoClose={5000} />

                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                            <button onClick={() => setMostrarCamposAdicionales(!mostrarCamposAdicionales)} type="button" className="px-3 btn btn-primary">Listar Usuarios</button>   
                    </div>
                </div>
                {mostrarCamposAdicionales && <TablaUsuarios listaUsuarios={users}/>}
                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <Link to="/admin/GestionarUsuarios">
                            <button type="button" className="px-3 btn btn-primary">Gestionar Usuarios</button>   
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};

const TablaUsuarios = ({ listaUsuarios }) =>{
    useEffect(() => {
        console.log("este el el listado de usuarios en el componente de tabla", listaUsuarios);
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


export default Usuario;


const usersBackend = [
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
                nombres:"Usuario4",
                apellidos:"Surname4",
                direccion:"12456",
                telefono:"1234567",
                correoE:"u4@correo.com",
                contrasena:"1234",
                rol:"ventas",
                estado:"aprobado",                
            }
        ]