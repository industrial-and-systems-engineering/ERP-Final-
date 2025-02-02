import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/isloggedin.js';

const UserNavbar = () => {
    const { isAuthenticated, checkAuth } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    const handleLogout = () => {
        Logout(); // Ensure Logout() is defined elsewhere in your code
        navigate('/user');
    };

    return (
        <div className='bg-gray-800 p-4 flex justify-center space-x-4 shadow-lg'>
            <Link
                to="/user"
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
            >
                Home
            </Link>
            <Link
                to="/user/completed"
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
            >
                Completed Products
            </Link>
            <Link
                to="/user/pending"
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
            >
                Pending Form
            </Link>
            <Link
                to="/user/create"
                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out'
            >
                Create Form
            </Link>
            {isAuthenticated && (
                <button
                    onClick={handleLogout}
                    className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 ease-in-out'
                >
                    Sign Out
                </button>
            )}
        </div>
    );
};

export default UserNavbar;
