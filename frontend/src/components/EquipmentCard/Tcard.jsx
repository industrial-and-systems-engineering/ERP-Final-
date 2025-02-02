// import React from 'react';

// const Tcard = ({ equipment }) => {
//     return (
//         <div className="equipment-card">
//             <p><strong>Job No:</strong> {equipment.jobNo}</p>
//             <p><strong>Instrument Description:</strong> {equipment.instrumentDescription}</p>
//             <p><strong>Serial No:</strong> {equipment.serialNo}</p>
//             <p><strong>Parameter:</strong> {equipment.parameter}</p>
//             <p><strong>Ranges:</strong> {equipment.ranges}</p>
//             <p><strong>Accuracy:</strong> {equipment.accuracy}</p>
//             {!equipment.isCalibrated ? (<div>
//                 <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Update</button>
//             </div>) :
//                 (<div>
//                     <p><strong>Calibration Details:</strong> {equipment.calibrationDetails}</p>
//                 </div>)}
//         </div>
//     );
// };

// export default Tcard
// ;
import React, { useState } from 'react';
import { usePendingEquipmentsStore } from '../../utils/pendingEquipments';

const Tcard = ({ equipment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [calibrationDetails, setCalibrationDetails] = useState(equipment.calibrationDetails || '');

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const { updateEquipment } = usePendingEquipmentsStore.getState();
        updateEquipment(equipment.id, { ...equipment, calibrationDetails, isCalibrated: true });
        setIsEditing(false);
    };

    return (
        <div className="equipment-card">
            <p><strong>Job No:</strong> {equipment.jobNo}</p>
            <p><strong>Instrument Description:</strong> {equipment.instrumentDescription}</p>
            <p><strong>Serial No:</strong> {equipment.serialNo}</p>
            <p><strong>Parameter:</strong> {equipment.parameter}</p>
            <p><strong>Ranges:</strong> {equipment.ranges}</p>
            <p><strong>Accuracy:</strong> {equipment.accuracy}</p>
            {!equipment.isCalibrated ? (
                <div>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={calibrationDetails}
                                onChange={(e) => setCalibrationDetails(e.target.value)}
                                className="mt-2 p-2 border rounded"
                                placeholder="Enter calibration details"
                            />
                            <button
                                onClick={handleSaveClick}
                                className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={handleUpdateClick}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                        >
                            Update
                        </button>
                    )}
                </div>
            ) : (
                <div>
                    <p><strong>Calibration Details:</strong> {equipment.calibrationDetails}</p>
                </div>
            )}
        </div>
    );
};

export default Tcard;