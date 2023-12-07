import { setEmail } from '../actions';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const LoginPage: React.FC<LoginProps> = () => {
  const navigate = useNavigate(); // React Router hook for navigation
  
  const [email, setTrainerEmail] = useState('');
  const [password, setPassword] = useState('');

  interface LoginData {
    email: string;
    password: string;
  }

  const loginPostData: LoginData = {
    email: email,
    password: password
  }

  const handleLogin = async () => {
    localStorage.setItem('userEmail', loginPostData.email);
    try {
      // Register a trainer by sending a POST request to /register-trainer
      const loginResponse = await axios.post('http://127.0.0.1:5000/login', loginPostData);
      console.log(loginResponse.data);
      navigate('/dashboard');
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            id="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setTrainerEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
        <button
          className="w-full mt-4 bg-gray-300 text-gray-700 p-2 rounded-md hover:bg-gray-400"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
