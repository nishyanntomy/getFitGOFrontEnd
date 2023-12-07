import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface AddDietModalProps {
  onCancel: () => void;
  onSave: (newDiet: { dietType: string; breakfast: string; lunch: string; dinner: string; instruction: string }) => void;
}

const AddDietModal: React.FC<AddDietModalProps> = ({ onCancel, onSave }) => {
  const [newDiet, setNewDiet] = useState({
    dietType: '',
    breakfast: '',
    lunch: '',
    dinner: '',
    instruction: '',
  });
  const [dietTypes, setDietTypes] = useState<string[][]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewDiet((prevDiet) => ({ ...prevDiet, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/diet-type`);
            setDietTypes(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Add New Diet</h2>
         {/* Diet Type Dropdown */}
         <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Diet Type:</label>
                            <select
                                value={newDiet.dietType}
                                onChange={handleChange}
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

        <label className="block mb-2">
          Breakfast:
          <input
            type="text"
            name="breakfast"
            value={newDiet.breakfast}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Lunch:
          <input
            type="text"
            name="lunch"
            value={newDiet.lunch}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-2">
          Dinner:
          <input
            type="text"
            name="dinner"
            value={newDiet.dinner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <label className="block mb-4">
          Instruction:
          <textarea
            name="instruction"
            value={newDiet.instruction}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </label>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => onSave(newDiet)}
          >
            Add Diet
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDietModal;
