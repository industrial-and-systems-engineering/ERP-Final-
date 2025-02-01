import React from 'react'
import { Outlet } from 'react-router-dom'

const Thomepage = () => {
    return (
        <div>
            <h1>Technician Homepage</h1>
            <Outlet />
        </div>
    )
}

export default Thomepage
