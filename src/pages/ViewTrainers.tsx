import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TrainerCard from './TrainerCard';

interface Trainer {
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  state: string;
  city: string;
  mobileNumber: string;
  aboutMe: string;
}

const ViewTrainers: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [requestSent, setRequestSent] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/view-trainer');
        setTrainers(response.data);
      } catch (error) {
        console.error('Error fetching trainers:', error);
      }
    };

    fetchTrainers();
  }, []);

  const handleRequestTrainer = async (trainerEmail: string, clientEmail: string) => {
    try {
      await axios.post('http://127.0.0.1:5000/request-trainer', {
        clientEmail: clientEmail,
        trainerEmail: trainerEmail,
      });
      setRequestSent(trainerEmail);
    } catch (error) {
      console.error('Error requesting trainer:', error);
    }
  };

  return (
    <div className="trainers-page container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">All Trainers</h1>
      {trainers.map((trainer) => (
        <TrainerCard
          key={trainer.email}
          trainer={trainer}
          onRequestClick={() => handleRequestTrainer(trainer.email, localStorage.getItem('userEmail') ?? '')}
        />
      ))}
      {requestSent && (
        <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
          Request sent to {requestSent}. We'll notify you once the trainer accepts.
        </div>
      )}
    </div>
  );
};

export default ViewTrainers;
