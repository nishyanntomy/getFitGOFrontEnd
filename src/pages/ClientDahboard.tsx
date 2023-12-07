import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Components for each menu item
const Routines: React.FC = () => <div>Routines Page</div>;
const Clients: React.FC = () => <div>Clients Page</div>;
const PendingRequests: React.FC = () => <div>Pending Client Requests Page</div>;
const Diets: React.FC = () => <div>Diets Page</div>;

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();

  const menuItems = ['View Routines','Search Exercise', 'Request Trainer','Add Workout Activity', 'View Diets'];

    const [selectedMenuItem, setSelectedMenuItem] = useState('Routines');
  
    const handleMenuItemClick = (menuItem: string) => {

      setSelectedMenuItem(menuItem);
      if (menuItem==='View Routines'){
      navigate('/routines');
      };

    };
  
    return (
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold mb-8">Client Dashboard</h1>
  
        {/* Horizontal menu with larger buttons */}
        <div className="flex justify-center mt-8">
          {menuItems.map((menuItem, index) => (
            <button
              key={index}
              className={`${
                selectedMenuItem === menuItem ? 'bg-gray-800' : 'bg-blue-500'
              } text-white border-none px-8 py-4 mx-2 cursor-pointer text-lg rounded transition duration-300 ${
                selectedMenuItem === menuItem ? 'bg-gray-800' : 'hover:bg-blue-700'
              }`}
              onClick={() => handleMenuItemClick(menuItem)}
            >
              {/* <img
                src={`path-to-${menuItem.toLowerCase().replace(/\s+/g, '-')}-image.png`}
                alt={menuItem}
                className="w-8 h-8 mr-2"
              /> */}
              {menuItem}
            </button>
          ))}
        </div>
  
        {/* Render selected page */}
        <div className="mt-8">
          {selectedMenuItem === 'View Routines' && <Routines />}
          {selectedMenuItem === 'Clients' && <Clients />}
          {selectedMenuItem === 'Pending Client Requests' && <PendingRequests />}
          {selectedMenuItem === 'View Diets' && <Diets />}
        </div>
      </div>
    );
  };
  export default ClientDashboard;
  