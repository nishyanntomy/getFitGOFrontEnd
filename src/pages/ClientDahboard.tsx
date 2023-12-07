import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dietIcon  from "../assets/icons/Diets.png"
import WorkoutHistory from "./WorkoutHistory";

// Components for each menu item
const Routines: React.FC = () => <div>Routines Page</div>;
const Clients: React.FC = () => <div>Clients Page</div>;
const PendingRequests: React.FC = () => <div>Pending Client Requests Page</div>;
const Diets: React.FC = () => <div>Diets Page</div>;

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'View Routines', image: 'https://hips.hearstapps.com/hmg-prod/images/hardcore-exercises-royalty-free-image-1637943272.jpg?crop=1.00xw:0.737xh;0,0.186xh&resize=1200:*' },
    { label: 'Search Exercise', image: 'https://kimandkalee.com/wp-content/uploads/2020/01/at-home-LES-MILLS-on-Demand-BODYSTEP-workouts-min.jpg' },
    { label: 'Request Trainer', image: 'https://www.personaltraineredu.org/wp-content/uploads/2022/11/personal-trainer.jpg' },
    { label: 'Workout History', image: 'https://fitbod.me/wp-content/uploads/2023/03/blog_hero.png' },
    { label: 'View Diets', image: 'https://blog.nasm.org/hubfs/popular-diets-4.jpg' },
  ];

  const [selectedMenuItem, setSelectedMenuItem] = useState(menuItems[0]);

  const handleMenuItemClick = (menuItem: any) => {
    setSelectedMenuItem(menuItem);
    navigate(`/${menuItem.label.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>

      {/* Horizontal menu with larger buttons */}
      <div className="flex justify-center mt-8">
        {menuItems.map((menuItem, index) => (
          <button
            style={{ width: '400px', height: '400px' }}
            key={index}
            className={`relative overflow-hidden ${
              selectedMenuItem === menuItem ? 'bg-gray-800' : 'bg-blue-500'
            } text-white border-none w-200 h-200 p-4 m-2 cursor-pointer text-lg rounded transition duration-300 ${
              selectedMenuItem === menuItem ? 'bg-gray-800' : 'hover:bg-blue-700'
            }`}
            onClick={() => handleMenuItemClick(menuItem)}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${menuItem.image})`, opacity: '0.8' }}
            />
            <div className="relative z-10 flex items-center justify-center h-full text-white"
              style={{ fontSize: 'larger',
              fontWeight: 'bold',
              fontFamily: 'fantasy'}}>
              {menuItem.label}
            </div>
          </button>
        ))}
      </div>

      {/* Render selected page */}
      <div className="mt-8">
        {selectedMenuItem.label === 'View Routines' && <Routines />}
        {selectedMenuItem.label === 'Search Exercise' && <Clients />}
        {selectedMenuItem.label === 'Request Trainer' && <PendingRequests />}
        {selectedMenuItem.label === 'View Diets' && <Diets />}
        {selectedMenuItem.label === 'Workout History' && <WorkoutHistory />}
      </div>
    </div>
  );
};

export default ClientDashboard;
