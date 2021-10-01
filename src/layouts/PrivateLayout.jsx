import Sidebar from 'componentes/Sidebar'   
import React from 'react'

const PrivateLayout = ({children}) => {
    return (
        <div>
            <Sidebar />
            { children}
        </div>
    )
}

export default PrivateLayout;
