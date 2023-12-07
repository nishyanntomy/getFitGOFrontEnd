import React from 'react';
import TrainerDashboard from './TrainerDashboard';
import ClientDashboard from './ClientDahboard';

interface DashboardProps {
  userType: any;
}

const Dashboard: React.FC<DashboardProps> = ({ userType }) => {
  console.log(userType)
  return (
    <div className="text-center p-8">
      {userType === 'trainer' ? <TrainerDashboard /> : <ClientDashboard />}
    </div>
  );
};

export default Dashboard;
