import { Link } from "react-router-dom";
import React, { useEffect } from 'react';

const Usuario = () => {


    useEffect(() => {
            return console.log("hola, soy un useEffect")
    }, [])

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
                Registrar Usuarios
            </h2>
            <form className="mt-8 w-3/4">
                <div>
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Nombres"
                        required
                    />

                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Apellidos"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Dirección"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="text"
                        placeholder="Teléfono"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="email"
                        placeholder="Correo electrónico"
                        required
                    />
                    <input
                        className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                        type="password"
                        placeholder="Contraseña"
                        required
                    />

                </div>

                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <Link to="/admin">
                            <button type="button" className="px-3 btn btn-primary">Guardar</button>   
                        </Link>
                    </div>
                </div>
                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <Link to="/admin/GestionarUsuarios">
                            <button type="button" className="px-3 btn btn-primary">Listar Usuarios</button>   
                        </Link>
                    </div>
                </div>
                <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                    <div className="">
                        <Link to="/admin/GestionarUsuarios">
                            <button type="button" className="px-3 btn btn-primary">Gestionar Usuarios</button>   
                        </Link>
                    </div>
                </div>
                <TablaUsuarios/>
            </form>
        </div>
    );
};

const TablaUsuarios = () =>{
    return(
        <div className="flex flex-col items-center justify-center">
            <h2 className = "text-2xl font-extrabold text-gray-800">Todos los usuarios</h2>
            <table cellPadding="10" cellSpacing="10">
                <thead className="font-extrabold">
                    <tr>
                        <td>Nombres</td>
                        <td>Apellidos</td>
                        <td>Dirección</td>
                        <td>Teléfono</td>
                        <td>Correo electrónico</td>
                        <td>Contraseña</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Cristian</td>
                        <td>Ariza</td>
                        <td>abc1</td>
                        <td>123456</td>
                        <td>ca@correo.com</td>
                        <td>1234</td>
                    </tr>
                    <tr>
                        <td>User2</td>
                        <td>SurnameU2</td>
                        <td>abc1</td>
                        <td>123456</td>
                        <td>u2@correo.com</td>
                        <td>1234</td>                        
                    </tr>
                    <tr>
                        <td>User3</td>
                        <td>SurnameU3</td>
                        <td>abc1</td>
                        <td>123456</td>
                        <td>u3@correo.com</td>
                        <td>1234</td>                        
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Usuario;

