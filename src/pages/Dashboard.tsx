import React from 'react';
import TrainerDashboard from './TrainerDashboard';
import ClientDashboard from './ClientDahboard';

interface DashboardProps {
  userType: 'trainer' | 'client';
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  return (
    <div className="text-center p-8">
      {userType === 'trainer' ? <TrainerDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default Dashboard;
