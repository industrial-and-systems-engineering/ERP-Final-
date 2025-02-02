import { create } from 'zustand';
import { useCalibratedEquipmentsStore } from './calibratedEquipments';

export const usePendingEquipmentsStore = create((set) => ({
    pendingEquipments: [],
    setEquipment: (pendingEquipments) => set({ pendingEquipments }),

    fetchPendingEquipments: async () => {
        const response = await fetch('/api/technician/pending-equipments');
        const equipments = await response.json();
        set((state) => ({ pendingEquipments: [...equipments.data] }));
    },

    updateEquipment: async (id, details) => {
        const responseCalibrated = await fetch('/api/technician/calibrated-equipments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedEquipment),
        });
        const newCalibratedEquipment = await responseCalibrated.json();

        const { setCalibratedEquipments } = useCalibratedEquipmentsStore.getState();
        setCalibratedEquipments((state) => [...state.calibratedEquipments, newCalibratedEquipment]);

        set((state) => ({
            pendingEquipments: state.pendingEquipments.map((equipment) => {
                if (equipment.id === id) {
                    return updatedEquipment;
                }
                return equipment;
            }),
        }));
    },
}));