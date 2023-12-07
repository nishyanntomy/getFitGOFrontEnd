import React from "react";
import { useState } from "react";

const AddRoutineModal: React.FC<{ onSave: (name: string, description: string) => void; onCancel: () => void; }> = ({
    onSave,
    onCancel
  }) => {
    const [routineName, setRoutineName] = useState('');
    const [routineDescription, setRoutineDscription] = useState('');
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded">
          <h2 className="text-xl font-bold mb-4">Add New Routine</h2>
          <input
            type="text"
            placeholder="Routine Name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <input
            type="text"
            placeholder="Routine Description"
            value={routineDescription}
            onChange={(e) => setRoutineDscription(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => onSave(routineName, routineDescription)}
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
  
  export default AddRoutineModal;