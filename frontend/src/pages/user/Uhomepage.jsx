import React from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from '../../components/navbar/UserNavbar.jsx'

const Uhomepage = () => {
    return (
        <div>
            <UserNavbar />
            <h1>User Homepage</h1>
            <Outlet />
        </div>
    )
}

export default Uhomepage
