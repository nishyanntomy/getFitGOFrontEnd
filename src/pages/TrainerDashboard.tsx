import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { RoutinesIcon } from "assets/icons";


// Components for each menu item
const Routines: React.FC = () => <div>Routines Page</div>;
const Clients: React.FC = () => <div>Clients Page</div>;
const PendingRequests: React.FC = () => <div>Pending Client Requests Page</div>;
const Diets: React.FC = () => <div>Diets Page</div>;

const TrainerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    navigate(`/${menuItem.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-8">Trainer Dashboard</h1>

      {/* Horizontal menu with fixed-size buttons */}
      <div className="flex justify-center mt-8">
        {['Routines', 'Clients', 'Pending Client Requests', 'Diets'].map((menuItem, index) => (
          <button
            key={index}
            className={`${
              selectedMenuItem === menuItem ? 'bg-gray-800' : 'bg-blue-500'
            } text-white border-none px-8 py-4 mx-2 cursor-pointer text-lg rounded transition duration-300 ${
              selectedMenuItem === menuItem ? 'bg-gray-800' : 'hover:bg-blue-700'
            } flex-shrink-0`}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            {/* <img
              src={RoutinesIcon}
              alt={menuItem}
              className="w-6 h-6 object-fit-fill mr-2"
            /> */}
            {menuItem}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrainerDashboard;
