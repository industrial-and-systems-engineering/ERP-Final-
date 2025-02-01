import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../utils/isloggedin";
import UserNavbar from "../../components/navbar/UserNavbar.jsx";

const ErrorDetectorForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const hasCheckedAuth = useRef(false);
  const [authChecked, setAuthChecked] = useState(false);

  const [formData, setFormData] = useState({
    srfNo: "",
    date: "",
    probableDate: "",
    organization: "",
    address: "",
    contactPerson: "",
    mobileNumber: "",
    telephoneNumber: "",
    emailId: "",
  });

  const [tableRows, setTableRows] = useState([
    {
      jobNo: "",
      instrumentDescription: "",
      serialNo: "",
      parameter: "",
      ranges: "",
      accuracy: "",
    },
  ]);

  const emptyRow = {
    jobNo: "",
    instrumentDescription: "",
    serialNo: "",
    parameter: "",
    ranges: "",
    accuracy: "",
  };

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setAuthChecked(true);
    };

    if (!hasCheckedAuth.current) {
      verifyAuth();
      hasCheckedAuth.current = true;
    }
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      alert("You are not authenticated. Please log in.");
      navigate("/user");
    }
  }, [authChecked, isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const requestData = { ...formData, products: tableRows };
  
    console.log("Submitting form data:", JSON.stringify(requestData, null, 2));
  
    fetch("/api/errorform", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Response from backend:", data);
  
      // Reset form state
      setFormData({
        srfNo: "",
        date: "",
        probableDate: "",
        organization: "",
        address: "",
        contactPerson: "",
        mobileNumber: "",
        telephoneNumber: "",
        emailId: "",
      });
  
      setTableRows([{ ...emptyRow }]);
  
      if (data.redirectURL) {
        navigate(data.redirectURL);
      } else {
        alert("Form submitted successfully!");
      }
    })
    .catch((err) => {
      console.error("Error submitting form:", err);
      alert("Error submitting form. Please try again.");
    });
  };

  if (!authChecked) {
    return <div className="text-center p-8">Verifying authentication...</div>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <UserNavbar />
      <form onSubmit={handleSubmit}>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 border-2 border-black flex items-center justify-center font-bold">
            ED
          </div>
          <h1 className="text-xl font-semibold">ERROR DETECTOR</h1>
        </div>

        <div className="text-center border-b-2 border-black pb-2 mb-6">
          <h2 className="text-lg font-semibold">SERVICE REQUEST FORM (SRF)</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="flex flex-col">
              <label className="font-semibold capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type="text"
                value={value}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                className="p-2 border rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg">2. Product Description:</h3>
          <div className="overflow-x-auto bg-gray-100 p-4 rounded-md shadow-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white">
                  {Object.keys(emptyRow).map((header) => (
                    <th key={header} className="p-2 uppercase text-sm">{header.replace(/([A-Z])/g, ' $1')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, index) => (
                  <tr key={index} className="border-t">
                    {Object.keys(emptyRow).map((key) => (
                      <td key={key} className="p-2">
                        <input
                          type="text"
                          value={row[key]}
                          onChange={(e) =>
                            setTableRows((prevRows) =>
                              prevRows.map((r, i) => (i === index ? { ...r, [key]: e.target.value } : r))
                            )
                          }
                          className="p-1 border rounded-md w-full"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              type="button"
              onClick={() => setTableRows([...tableRows, emptyRow])}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Row
            </button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold text-lg">3. Decision Rules</h3>
          <div className="flex flex-col gap-2 mt-2">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> No decision on conformative statement
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4" /> Simple conformative decision
            </label>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white text-lg rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ErrorDetectorForm;