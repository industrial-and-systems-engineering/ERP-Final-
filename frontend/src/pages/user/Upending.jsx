import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../utils/isloggedin';
import UserNavbar from '../../components/navbar/UserNavbar.jsx';

const Upending = () => {
  const [calibratedForms, setCalibratedForms] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const hasCheckedAuth = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
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
          const response = await fetch('/errorform/pending');
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
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <UserNavbar />
      <h1>Completed Products</h1>
      {calibratedForms.length === 0 ? (
        <p className="text-gray-500 text-center">No calibrated products found.</p>
      ) : (
        <div>
          {calibratedForms.map((product) => (
            <div key={product.id} onClick={() => setSelectedProduct(product)}>
              <p>{product.instrumentDescription}</p>
            </div>
          ))}
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
      )}
    </div>
  );
};

export default Upending;