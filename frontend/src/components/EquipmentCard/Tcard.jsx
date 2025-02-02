import React, { useState } from 'react';
import { usePendingEquipmentsStore } from '../../utils/pendingEquipments';

const Tcard = ({ equipment }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [result, setResult] = useState({
        calibrationDetails: equipment.calibrationDetails || ""
    });
    const { updateEquipment } = usePendingEquipmentsStore();

    const handleUpdateClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = async () => {
        const response = await updateEquipment(equipment._id, result);
        if (response.success) {
            setIsEditing(false);
        }
        alert(response.message);
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
                                value={result.calibrationDetails}
                                onChange={(e) => setResult({ ...result, calibrationDetails: e.target.value })}
                                className="mt-2 p-2 border rounded"
                                placeholder="Enter calibration details"
                            />
                            <button
                                onClick={handleSaveClick}
                                className="mt-2 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="mt-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                            >
                                Cancel
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