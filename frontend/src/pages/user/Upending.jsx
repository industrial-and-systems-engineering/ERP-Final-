import React, { useEffect, useState, useRef } from 'react';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/isloggedin';
import UserNavbar from '../../components/navbar/UserNavbar.jsx';

const Upending = () => {
  const [calibratedForms, setCalibratedForms] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setIsLoading(false); // Set loading to false after authentication check
    };

    verifyAuth();
  }, [checkAuth]);

  useEffect(() => {

    if (hasCheckedAuth.current) return;
    hasCheckedAuth.current = true;
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
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <UserNavbar />
      <h1 className="text-2xl font-bold text-center">Pending Products</h1>

      {/* Show product buttons if data exists */}
      {calibratedForms.length > 0 ? (
        <div className="space-y-2">
          {calibratedForms.map((form, formIndex) =>
            form.products.map((product, productIndex) => (
              <button
                key={product._id}
                className="bg-blue-500 text-white p-3 w-full rounded-lg hover:bg-blue-700"
                onClick={() => toggleProductDetails(product)}
              >
                Product {formIndex + 1}-{productIndex + 1}
              </button>
            ))
          )}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No calibrated products found.</p>
      )}

      {/* Show selected product details */}
      {selectedProduct && (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-gray-100">
          <h2 className="text-lg font-bold">Product Details</h2>
          <p><strong>Job No:</strong> {selectedProduct.jobNo}</p>
          <p><strong>Description:</strong> {selectedProduct.instrumentDescription}</p>
          <p><strong>Serial No:</strong> {selectedProduct.serialNo}</p>
          <p><strong>Parameter:</strong> {selectedProduct.parameter}</p>
          <p><strong>Ranges:</strong> {selectedProduct.ranges}</p>
          <p><strong>Accuracy:</strong> {selectedProduct.accuracy}</p>
          <p><strong>Calibrated:</strong> {selectedProduct.isCalibrated ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Upending;