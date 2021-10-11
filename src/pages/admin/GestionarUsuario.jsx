import React from 'react'

//Permite gestionar el rol del usuario
const Usuarios = () => {
    return (
        <div className="flex flex-col w-full justify-center items-center">
            <h2 className="m-3 text-center text-3xl font-extrabold text-gray-900">
                Gestionar usuarios 
            </h2>
            <form className="mt-8 w-3/4">
                <div>
                    <div>
                        <label htmlFor="ID_usuario">
                        ID del usuario 
                            <input
                                type="text"
                                //placeholder="Ingresar ID del usuario"
                                required
                                className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            />
                        </label>
                    </div>                 
                    <div>
                        <label htmlFor="rol">
                            Rol del usuario 
                            <select name="Rol"
                                className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                <option disabled>Establezca el rol del usuario</option>
                                <option value="Vendedor">Vendedor</option>
                                <option value="Administrador">Administrador</option>
                                <option value="Ejecutivo">Ejecutivo</option>
                                <option value="Operativo">Operativo</option>
                                <option value="Director">Director</option>
                                <option value="Gerente comercial">Gerente comercial</option>
                            </select>                            
                        </label>
                    </div>
                    <div>
                        <label htmlFor="Estado">
                        Estado de aprobación
                            <select name="Estado"
                                className="mb-4 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                                <option disabled>Establezca estado del usuario</option>
                                <option value="Aprobado">Pendiente</option>
                                <option value="Pendiente">Aprobado</option>
                            </select>                            
                        </label>
                    </div>
                    <div className="my-6 flex space-x-3 justify-center bg-indigo-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 p-1 my-2 bg-indigo-700 hover:bg-indigo-900 flex w-full items-center text-white rounded-md">
                        <div className="">
                                <button type="button" class="px-3 btn btn-primary">Guardar cambios</button>   
                        </div>
                    </div>                
                </div>
            </form>
        </div>    
    )

}
export default Usuarios