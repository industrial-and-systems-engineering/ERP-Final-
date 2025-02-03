import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/isloggedin';
import UserNavbar from '../../components/navbar/UserNavbar.jsx';
import Ucard from '../../components/EquipmentCard/Ucard.jsx';


const Upending = () => {
  const [calibratedForms, setCalibratedForms] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false);
    };

    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      alert('You are not authenticated. Please log in.');
      navigate('/user');
    } else {
      const fetchCalibratedForms = async () => {
        try {
          const response = await fetch('/api/errorform/calibrated/pending');
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setCalibratedForms(data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchCalibratedForms();
    }
  }, [isAuthenticated, navigate, isLoading]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const toggleProductDetails = (product) => {
    setSelectedProduct((prevProduct) => (prevProduct && prevProduct._id === product._id ? null : product));
  };

  return (
    <div className="container mx-auto mt-8 p-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Pending Products</h1>

      {calibratedForms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {calibratedForms.map((form) =>
            form.products.map((product) => (
              <div key={product._id} className="bg-white shadow-md rounded-lg p-4">
                {/* <button
                  className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-700"
                  onClick={() => toggleProductDetails(product)}
                >
                  Product
                </button>
                {selectedProduct && selectedProduct._id === product._id && (
                  <Ucard equipment={selectedProduct} onUpdate={() => { }} />
                )} */}
                <Ucard key={product._id} equipment={product} />
              </div>
            ))
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No calibrated products found.</p>
      )}
    </div>
  );
};

export default Upending;
