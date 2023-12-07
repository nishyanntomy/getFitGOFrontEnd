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
    <div className="border-2 border-gray-300 p-4 rounded mb-4">
      <p className="text-xl font-bold mb-2">{clientEmail}</p>
      <p className="mb-2">Request Date: {new Date(requestDate).toLocaleString()}</p>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={() => onAccept(clientEmail)}
      >
        Accept
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => onReject(clientEmail)}
      >
        Reject
      </button>
    </div>
  );
};

export default ClientRequestCard;
