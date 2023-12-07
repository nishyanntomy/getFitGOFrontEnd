import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setEmail } from '../actions';

interface TrainerRegisterProps {}

const TrainerRegister: React.FC<TrainerRegisterProps> = () => {
  const navigate = useNavigate();

  const [trainerData, setTrainerData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: {
      city: '',
      state: '',
    },
    mobileNumber: '',
    aboutMe: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  interface TrainerRegistrationData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    state: string;
    city: string;
    mobileNumber: string;
    aboutMe: string;
}

const trainerPostData: TrainerRegistrationData = {
  username: trainerData.username,
  password: trainerData.password,
  email: trainerData.email,
  firstName: trainerData.firstName,
  lastName: trainerData.lastName,
  gender: trainerData.gender,
  state: trainerData.address.state,
  city: trainerData.address.city,
  mobileNumber: trainerData.mobileNumber,
  aboutMe: trainerData.aboutMe
};


  const handleTrainerRegister = async () => {
    try {
      // Register a trainer by sending a POST request to /register-trainer
      const registerTrainerResponse = await axios.post('http://127.0.0.1:5000/register-trainer', trainerPostData);
      console.log(registerTrainerResponse.data);
      navigate('/login');
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Trainer Registration</h2>
      <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientFirstName">
          First Name
        </label>
        <input
          type="text"
          id="clientFirstName"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your first name"
          value={trainerData.firstName}
          onChange={(e) => setTrainerData({ ...trainerData, firstName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientLastName">
          Last Name
        </label>
        <input
          type="text"
          id="clientLastName"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your last name"
          value={trainerData.lastName}
          onChange={(e) => setTrainerData({ ...trainerData, lastName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientGender">
          Gender
        </label>
        <select
          id="clientGender"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={trainerData.gender}
          onChange={(e) => setTrainerData({ ...trainerData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientCity">
          City
        </label>
        <input
          type="text"
          id="clientCity"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your city"
          value={trainerData.address.city}
          onChange={(e) =>
            setTrainerData({
              ...trainerData,
              address: { ...trainerData.address, city: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientState">
          State
        </label>
        <input
          type="text"
          id="clientState"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your state"
          value={trainerData.address.state}
          onChange={(e) =>
            setTrainerData({
              ...trainerData,
              address: { ...trainerData.address, state: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainerAbout">
          About Me
        </label>
        <input
          type="text"
          id="trainerAbout"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Tell us about yourself"
          value={trainerData.aboutMe}
          onChange={(e) => setTrainerData({ ...trainerData, aboutMe: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientMobileNumber">
          Mobile Number
        </label>
        <input
          type="text"
          id="clientMobileNumber"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your mobile number"
          value={trainerData.mobileNumber}
          onChange={(e) => setTrainerData({ ...trainerData, mobileNumber: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainerEmail">
          Email
        </label>
        <input
          type="text"
          id="trainerEmail"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
          value={trainerData.email}
          onChange={(e) => setTrainerData({ ...trainerData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="trainerUsername">
          Username
        </label>
        <input
          type="text"
          id="trainerUsername"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your username"
          value={trainerData.username}
          onChange={(e) => setTrainerData({ ...trainerData, username: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientPassword">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="clientPassword"
            className="w-full p-2 border border-gray-300 rounded-md pr-10"
            placeholder="Enter your password"
            value={trainerData.password}
            onChange={(e) => setTrainerData({ ...trainerData, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 px-2 py-1 bg-gray-300 text-gray-700 rounded-md"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        onClick={handleTrainerRegister}
      >
        Register as Trainer
      </button>
    </div>
  );
};

export default TrainerRegister;
