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
    try {
      // Implement the logic to accept the client request (make API call if needed)
      const response = await axios.post('http://127.0.0.1:5000/handle-pending-request', {
        clientEmail: clientEmail,
        trainerEmail: localStorage.getItem('userEmail'),
        isAccepted: true
      });

      console.log(`Accepted request from ${clientEmail}`);
      // After accepting, filter out the accepted request
      setPendingRequests(prevRequests => prevRequests.filter(request => request.clientEmail !== clientEmail));
    } catch (error) {
      console.error("Error Accepting");
    }
  };

  const handleRejectRequest = async (clientEmail: string) => {
    try {
      // Implement the logic to reject the client request (make API call if needed)
      const response = await axios.post('http://127.0.0.1:5000/handle-pending-request', {
        clientEmail: clientEmail,
        trainerEmail: localStorage.getItem('userEmail'),
        isAccepted: false
      });

      console.log(`Rejected request from ${clientEmail}`);
      // After rejecting, filter out the rejected request
      setPendingRequests(prevRequests => prevRequests.filter(request => request.clientEmail !== clientEmail));
    } catch (error) {
      console.error("Error Rejecting");
    }
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
