// ClientRequestCard.tsx
import React from 'react';

interface ClientRequest {
  clientEmail: string;
  trainerEmail: string;
  requestDate: string;
}

interface ClientRequestCardProps {
  request: ClientRequest;
  onAccept: (clientEmail: string) => void;
  onReject: (clientEmail: string) => void;
}

const ClientRequestCard: React.FC<ClientRequestCardProps> = ({ request, onAccept, onReject }) => {
  const { clientEmail, requestDate } = request;

  return (
    <div className="border-2 border-gray-300 p-4 rounded mb-4 flex justify-between items-center shadow-md bg-white">
      <div>
        <p className="text-xl font-bold mb-2">{clientEmail}</p>
        <p className="mb-2">Request Date: {new Date(requestDate).toLocaleString()}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onAccept(clientEmail)}
          className="bg-green-300 hover:bg-green-400 text-white py-2 px-4 rounded focus:outline-none transition duration-300"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(clientEmail)}
          className="bg-red-300 hover:bg-red-400 text-white py-2 px-4 rounded focus:outline-none transition duration-300"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default ClientRequestCard;
