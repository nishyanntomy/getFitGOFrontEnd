import React, { useState } from 'react';

interface AssignDietsModalProps {
  dietTypes: String[];
  onCancel: () => void;
  onSave: (selectedDietType: string) => void;
}

const AssignDietsModal: React.FC<AssignDietsModalProps> = ({ dietTypes, onCancel, onSave }) => {
  const [selectedDietType, setSelectedDietType] = useState('');


  const handleSave = () => {
    onSave(selectedDietType);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Select Diets</h2>
         {/* Diet Type Dropdown */}
         <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Diet Type:</label>
                            <select
                                value={selectedDietType}
                                onChange={(e) => setSelectedDietType(e.target.value)}
                                name="dietType"
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Diet Type</option>
                                {dietTypes?.map((item) => (
                                    <option value={item[0]} key={item[0]}>
                                        {item[0]}
                                    </option>
                                ))}
                            </select>
                        </div>
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

export default AssignDietsModal;
