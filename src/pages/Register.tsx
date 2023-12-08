import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClientRegister from './ClientRegister';
import TrainerRegister from './TrainerRegister';

interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const [registrationType, setRegistrationType] = useState('');
  

  const backgroundStyle = {
    backgroundImage: 'url(https://wallpapers.com/images/featured/barbell-am7v48yepmncv6c6.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust the opacity by changing the last value
  };

  return (
    <div style={backgroundStyle} className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Register</h2>
        <p className="text-gray-700 mb-6">Choose your registration type:</p>
        <div className='mb-6'>
          <button
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 mr-4"
            onClick={() => setRegistrationType('client')}
          >
            Register as Client
          </button>
          <button
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
            onClick={() => setRegistrationType('trainer')}
          >
            Register as Trainer
          </button>
        </div>
        {registrationType === 'client' && <ClientRegister />}
        {registrationType === 'trainer' && <TrainerRegister />}

        <p className="mt-4 text-gray-700">
          Already registered? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
