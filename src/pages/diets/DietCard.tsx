import React from 'react';

interface Diet {
    dietId: number;
    dietName: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    instruction: string;
    trainerEmail: string;
}

interface DietCardProps {
    diet: Diet;
    onEdit: (dietId: number) => void;
    onDelete: (dietId: number) => void;
}

const DietCard: React.FC<DietCardProps> = ({ diet, onEdit, onDelete }) => {
    const { dietName, breakfast, lunch, dinner, instruction } = diet;

    return (
        <div className="border-2 border-gray-300 p-4 rounded mb-4">
            <h2 className="text-xl font-bold mb-2">{dietName}</h2>
            <p>Breakfast: {breakfast}</p>
            <p>Lunch: {lunch}</p>
            <p>Dinner: {dinner}</p>
            <p>Instruction: {instruction}</p>
            {diet.trainerEmail == localStorage.getItem('userEmail') && 
            <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={() => onDelete(diet.dietId)}
            >
                Delete Diet
            </button>
}
        </div>
    );
};

export default DietCard;
