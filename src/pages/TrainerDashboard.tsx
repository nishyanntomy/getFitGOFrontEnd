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
  const menuItems = [
    { label: 'Routines', image: 'https://hips.hearstapps.com/hmg-prod/images/hardcore-exercises-royalty-free-image-1637943272.jpg?crop=1.00xw:0.737xh;0,0.186xh&resize=1200:*' },
    { label: 'Clients', image: 'https://kimandkalee.com/wp-content/uploads/2020/01/at-home-LES-MILLS-on-Demand-BODYSTEP-workouts-min.jpg' },
    { label: 'Pending Client Requests', image: 'https://www.personaltraineredu.org/wp-content/uploads/2022/11/personal-trainer.jpg' },
   { label: 'Diets', image: 'https://blog.nasm.org/hubfs/popular-diets-4.jpg' }
  ];
  const [selectedMenuItem, setSelectedMenuItem] = useState('');

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
    navigate(`/${menuItem.toLowerCase().replace(/\s+/g, '-')}`);
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-8">Trainer Dashboard</h1>
  
      {/* Horizontal menu with longer buttons */}
      <div className="flex justify-center mt-8">
        {menuItems.map((menuItem, index) => (
          <button

            key={index}
            className={`${
              selectedMenuItem === menuItem.label ? 'bg-gray-800' : 'bg-blue-500'
            } text-white border-none px-8 py-24 mx-2 cursor-pointer text-lg rounded transition duration-300 ${
              selectedMenuItem === menuItem.label ? 'bg-gray-800' : 'hover:bg-blue-700'
            }`}
            onClick={() => handleMenuItemClick(menuItem.label)}
            style={{
              height: '400px', // Adjusted width
              width:'400px',
              backgroundImage: `url(${menuItem.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: '0.8',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end', // Align text and image to the bottom
            }}
          >
            {/* You can customize the styling for the text */}
            <span className="text-center mb-2">{menuItem.label}</span>
            {/* You may want to customize the styling for the image */}
            {/* <img
              src={RoutinesIcon}
              alt={menuItem}
              className="w-6 h-6 object-fit-fill mr-2"
            /> */}
          </button>
        ))}
      </div>
    </div>
  );
  
  
  
  
  
          };

export default TrainerDashboard;
