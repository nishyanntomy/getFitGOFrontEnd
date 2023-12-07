// DietPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DietCard from './diets/DietCard';
import AddDietModal from './diets/AddEditDietModal';

interface Diet {
    dietId: number;
    dietName: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    instruction: string;
    trainerEmail: string;
}

const DietPage: React.FC = () => {
    const [diets, setDiets] = useState<Diet[]>([]);
    const [editingDietId, setEditingDietId] = useState<number | null>(null);
    const [showAddDietModal, setShowAddDietModal] = useState(false);
    const [trainerEmail, setTrainerEmail] = useState('');

    useEffect(() => {
        const storedData = localStorage.getItem('userEmail');
        if (storedData) {
            setTrainerEmail(storedData);
        }
    }, []);

    useEffect(() => {
        const fetchDiets = async () => {
            try {
                const response = await axios.get<Diet[]>('http://127.0.0.1:5000/diet');
                setDiets(response.data);
            } catch (error) {
                console.error('Error fetching diets:', error);
            }
        };

        fetchDiets();
    }, []);

    const deleteDiet = async (id: number) => {
        try {
          const response = await axios.delete<Diet[]>(`http://127.0.0.1:5000/diet?dietId=${id}`);
        } catch (error) {
          console.error('Error deleting data:', error);
        }
        setDiets((prevDiets) => prevDiets.filter((diet) => diet.dietId !== id));
      };

    const handleAddDietClicked = () => {
        setShowAddDietModal(true);
    };

    const handleCancelAddDiet = () => {
        setShowAddDietModal(false);
    };

    const [emptyDiet, setEmptyDiet] = useState<Diet>({
        dietId: 0,
        dietName: '',
        breakfast: '',
        lunch: '',
        dinner: '',
        instruction: '',
        trainerEmail: ''
    });

    const handleSaveDiet = async (newDiet: { dietType: string; breakfast: string; lunch: string; dinner: string; instruction: string }) => {
        try {
            // Make the POST request to add the diet
            const addDietResponse = await axios.post('http://127.0.0.1:5000/routine', {
                dietType: newDiet.dietType,
                trainerEmail: trainerEmail,
                breakfast: newDiet.breakfast,
                lunch: newDiet.lunch,
                dinner: newDiet.dinner,
                instruction: newDiet.instruction
            });
            setDiets((prevDiets) => [
                ...prevDiets,
                { ...emptyDiet, dietType: newDiet.dietType, breakfast: newDiet.breakfast, lunch: newDiet.lunch, dinner: newDiet.dinner, instruction: newDiet.instruction },
            ]);
            setShowAddDietModal(false);
        } catch (error) {
            console.error('Error adding routine:', error);
        }
    };


    const handleEditDiet = (dietId: number) => {
        setEditingDietId(dietId);
        // You can implement a modal or another component for editing diets
        // and pass the diet details to it for editing.
        // For simplicity, we'll just log the dietId for now.
        console.log('Editing Diet with ID:', dietId);
    };

    // Add your code for creating or editing diets here

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Diets</h1>
            <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
                onClick={handleAddDietClicked}
            >
                Add New Diet
            </button>
            {diets.map((diet) => (
                <DietCard key={diet.dietId} diet={diet} onEdit={handleEditDiet} onDelete={() => deleteDiet(diet.dietId)} />
            ))}
            {showAddDietModal && (
                <AddDietModal onSave={handleSaveDiet} onCancel={handleCancelAddDiet} />
            )}
        </div>
    );
};

export default DietPage;
