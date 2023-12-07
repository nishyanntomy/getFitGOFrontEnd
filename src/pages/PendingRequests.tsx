// PendingRequestsPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientRequestCard from './pending-requests/ClientRequestCard';

interface ClientRequest {
  clientEmail: string;
  trainerEmail: string;
  requestDate: string;
}

const PendingRequests: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<ClientRequest[]>([]);

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        const response = await axios.get<ClientRequest[]>(`http://127.0.0.1:5000/view-pending-request?trainerEmail=${localStorage.getItem('userEmail')}`);
        setPendingRequests(response.data);
      } catch (error) {
        console.error('Error fetching pending requests:', error);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleAcceptRequest = async (clientEmail: string) => {
    // Implement the logic to accept the client request (make API call if needed)
    console.log(`Accepted request from ${clientEmail}`);
  };

  const handleRejectRequest = async (clientEmail: string) => {
    // Implement the logic to reject the client request (make API call if needed)
    console.log(`Rejected request from ${clientEmail}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Pending Client Requests</h1>
      {pendingRequests.map((request, index) => (
        <ClientRequestCard
          key={index}
          request={request}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      ))}
    </div>
  );
};

export default PendingRequests;
