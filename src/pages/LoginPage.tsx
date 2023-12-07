import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

interface LoginData {
  username: string;
  password: string;
}

const LoginPage: React.FC<LoginProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [email, setTrainerEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginPostData: LoginData = {
    username: email,
    password: password,
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage('Email and password are required.');
      return;
    }
    localStorage.setItem('userEmail', loginPostData.username);

    try {
      const loginResponse = await axios.post('http://127.0.0.1:5000/login', loginPostData);
      console.log(loginResponse.data);
      if (loginResponse.data===1) {
        const userType = 'client';

        localStorage.setItem('user_type', userType);
        // Optionally, you can set other variables in local storage based on the response
        
        // Navigate to the dashboard page
        navigate('/dashboard');
      } else if(loginResponse.data===2){
        const userType = 'trainer';

        localStorage.setItem('user_type', userType);
        
        // Handle unsuccessful login (e.g., invalid credentials)
      }
      navigate('/dashboard');
    } catch (error) {
      if ((error as any).response && ((error as any).response).status === 401) {
        // Set the error message for invalid credentials
        setErrorMessage('Invalid credentials');
        console.log('Invalid credentials');
      } else {
        // Set a generic error message for other errors
        setErrorMessage('An error occurred. Please try again.');
      }
      console.error('Error fetching data:', error);
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-fixed z-0" style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <img
          src="https://wallpapers.com/images/featured/barbell-am7v48yepmncv6c6.jpg"
          alt="Background"
          className="object-cover w-full h-full opacity-100"
        />
      </div>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md relative z-10">
        <h2 className="text-4xl font-bold text-center mb-6">GETFITGO</h2>
        {errorMessage && (
          <div className="mb-4 text-red-500">
            <p>{errorMessage}</p>
          </div>
        )}
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
