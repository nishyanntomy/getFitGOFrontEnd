import React from 'react';
import { Link } from 'react-router-dom';

interface LandingProps {}

const Landing: React.FC<LandingProps> = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-6">Welcome to GetFitGo!</h2>
        <p className="text-gray-700 mb-6">
          Are you a registered user? Click below to login.
        </p>
        <Link to="/login" className="block bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Login
        </Link>
        <p className="mt-4 text-gray-700 mb-6">
          New user? Click below to register.
        </p>
        <Link
          to="/register"
          className="block bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default Landing;
