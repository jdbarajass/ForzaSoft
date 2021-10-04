import React from 'react'

//Permite gestionar el rol del usuario
function Usuarios() {
    return (
        <section>
            <h1>Gestión de usuarios y roles</h1>  
            <div>
                <input placeholder="ingresar ID del usuario"/>
                <div class="spacedItem">
                    <select name="Roles">
                        <option value="">Establezca rol del usuario</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Administrador">Admin</option>
                        <option value="Ejecutivo">Ejecutivo</option>
                        <option value="Operativo">Operativo</option>
                        <option value="Director">Director</option>
                        <option value="Gerente comercial">Gerente comercial</option>
                    </select>
                </div>
                <div>
                    <select name="Estado">
                        <option value="">Establezca estado del usuario</option>
                        <option value="Aprobado">Aprobado</option>
                        <option value="Pendiente">Pendiente</option>
                    </select>
                </div>
                <div>
                    <button>Guardar cambios</button>
                </div>
            </div>
        </section>           
    
    )

}
export default Usuarios