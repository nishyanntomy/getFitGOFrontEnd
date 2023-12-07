import React, { useState } from 'react';

interface EditRepsModalProps {
  onCancel: () => void;
  onSave: (newReps: number) => void;
}

const EditRepsModal: React.FC<EditRepsModalProps> = ({ onCancel, onSave }) => {
  const [newReps, setNewReps] = useState<number>(0);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Edit Reps</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">New Rep Count:</label>
          <input
            type="number"
            value={newReps}
            onChange={(e) => setNewReps(parseInt(e.target.value, 10))}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => onSave(newReps)}
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

export default EditRepsModal;
