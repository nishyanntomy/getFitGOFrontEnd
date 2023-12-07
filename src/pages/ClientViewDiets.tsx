import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DietCard from './diets/DietCard';

export interface Diet {
    dietId: number;
    dietName: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    instruction: string;
    trainerEmail: string;
}

const ClientViewDiets: React.FC = () => {
    const [diets, setDiets] = useState<Diet[]>([]);


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


    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Diets</h1>
            {diets.map((diet) => (
                <DietCard key={diet.dietId} diet={diet} onEdit={()=> null} onDelete={() => null} />
            ))}
        </div>
    );
};

export default ClientViewDiets;
