import React from 'react';

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

interface TrainerCardProps {
  trainer: Trainer;
  onRequestClick: (email: string) => void;
}

const TrainerCard: React.FC<TrainerCardProps> = ({ trainer, onRequestClick }) => {
  return (
    <div className="bg-white p-4 shadow-lg rounded-lg max-w-md mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">{`${trainer.firstName} ${trainer.lastName}`}</h2>
      <p className="text-gray-600">{`Gender: ${trainer.gender}`}</p>
      <p className="text-gray-600">{`Location: ${trainer.city}, ${trainer.state}`}</p>
      <p className="text-gray-600">{`Mobile Number: ${trainer.mobileNumber}`}</p>
      <p className="text-gray-600">{`About Me: ${trainer.aboutMe}`}</p>
      <button
        onClick={() => onRequestClick(trainer.email)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Request Trainer
      </button>
    </div>
  );
};

export default TrainerCard;

