import React from 'react';

const UserNavbar = () => {
    return (
        <div className='bg-gray-200 p-4 flex justify-center'>
            <button className='bg-blue-500 p-2 border-2'>Home</button>
            <button>Profile</button>
            <button>Settings</button>
            <button>Logout</button>
        </div>
    );
}

export default UserNavbar;