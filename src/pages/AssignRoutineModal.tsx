import React, { useState } from 'react';
import { Routine } from './Routines';

interface AssignRoutinesModalProps {
  routines: Routine[];
  onCancel: () => void;
  onSave: (selectedRoutines: Routine[]) => void;
}

const AssignRoutinesModal: React.FC<AssignRoutinesModalProps> = ({ routines, onCancel, onSave }) => {
  const [selectedRoutines, setSelectedRoutines] = useState<Routine[]>([]);

  const handleToggleRoutine = (routineId: number) => {
    const isSelected = selectedRoutines.some((routine) => routine.routine_id === routineId);

    if (isSelected) {
      // Deselect routine if it's already selected
      setSelectedRoutines((prevSelected) => prevSelected.filter((routine) => routine.routine_id !== routineId));
    } else {
      // Select routine if it's not already selected
      const selectedRoutine = routines.find((routine) => routine.routine_id === routineId);
      if (selectedRoutine) {
        setSelectedRoutines((prevSelected) => [...prevSelected, selectedRoutine]);
      }
    }
  };

  const handleSave = () => {
    onSave(selectedRoutines);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Select Routines</h2>
        {routines.map((routine) => (
          <div key={routine.routine_id} className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={selectedRoutines.some((selectedRoutine) => selectedRoutine.routine_id === routine.routine_id)}
                onChange={() => handleToggleRoutine(routine.routine_id)}
                className="mr-2"
              />
              {routine.routine_name}
            </label>
          </div>
        ))}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignRoutinesModal;
