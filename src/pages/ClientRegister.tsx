import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ClientRegisterProps { }

const ClientRegister: React.FC<ClientRegisterProps> = () => {
  const navigate = useNavigate();
  const [clientData, setClientData] = useState({
    username: '',
    email: '',
    password: '',
    age: 0,
    firstName: '',
    lastName: '',
    gender: '',
    address: {
      streetNumber: '',
      streetName: '',
      city: '',
      state: '',
    },
    bodyType: '',
    mobileNumber: '',
    height: 0,
    weight: 0,
    bmi: 0,
    level: '',
    targetWeight: 0,
    aboutMe: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  interface ClientRegistrationData {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    streetNo: string;
    streetName: string;
    city: string;
    state: string;
    mobileNumber: string;
    height: number;
    weight: number;
    bodyType: string;
    bmi: number;
    targetWeight: number;
    level: string;
    aboutMe: string;
  }

  const clientPostData: ClientRegistrationData = {
    username: clientData.username,
    password: clientData.password,
    email: clientData.email,
    firstName: clientData.firstName,
    lastName: clientData.lastName,
    gender: clientData.gender,
    streetNo: clientData.address.streetNumber,
    streetName: clientData.address.streetName,
    city: clientData.address.city,
    state: clientData.address.state,
    mobileNumber: clientData.mobileNumber,
    height: clientData.height,
    weight: clientData.weight,
    bodyType: clientData.bodyType,
    bmi: clientData.bmi,
    targetWeight: clientData.targetWeight,
    level: clientData.level,
    aboutMe: clientData.aboutMe,
  };
  

  const handleClientRegister = async () => {
    try {
      // Register a trainer by sending a POST request to /register-trainer
      const registerClientResponse = await axios.post('http://127.0.0.1:5000/register-client', clientPostData);
      console.log(registerClientResponse.data);
      navigate('/login');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Client Registration</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientFirstName">
          First Name
        </label>
        <input
          type="text"
          id="clientFirstName"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your first name"
          value={clientData.firstName}
          onChange={(e) => setClientData({ ...clientData, firstName: e.target.value })}
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
          value={clientData.lastName}
          onChange={(e) => setClientData({ ...clientData, lastName: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientGender">
          Gender
        </label>
        <select
          id="clientGender"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={clientData.gender}
          onChange={(e) => setClientData({ ...clientData, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientStreetNumber">
          Street Number
        </label>
        <input
          type="text"
          id="clientStreetNumber"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your street number"
          value={clientData.address.streetNumber}
          onChange={(e) =>
            setClientData({
              ...clientData,
              address: { ...clientData.address, streetNumber: e.target.value },
            })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientStreetName">
          Street Name
        </label>
        <input
          type="text"
          id="clientStreetName"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your street name"
          value={clientData.address.streetName}
          onChange={(e) =>
            setClientData({
              ...clientData,
              address: { ...clientData.address, streetName: e.target.value },
            })
          }
        />
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
          value={clientData.address.city}
          onChange={(e) =>
            setClientData({
              ...clientData,
              address: { ...clientData.address, city: e.target.value },
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
          value={clientData.address.state}
          onChange={(e) =>
            setClientData({
              ...clientData,
              address: { ...clientData.address, state: e.target.value },
            })
          }
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
          value={clientData.mobileNumber}
          onChange={(e) => setClientData({ ...clientData, mobileNumber: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientEmail">
          Email
        </label>
        <input
          type="text"
          id="clientEmail"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your email"
          value={clientData.email}
          onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientEmail">
          Username
        </label>
        <input
          type="text"
          id="clientUsername"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your username"
          value={clientData.username}
          onChange={(e) => setClientData({ ...clientData, username: e.target.value })}
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
            value={clientData.password}
            onChange={(e) => setClientData({ ...clientData, password: e.target.value })}
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
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientEmail">
          Body Type
        </label>
        <input
          type="text"
          id="clientBodyType"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your body type"
          value={clientData.bodyType}
          onChange={(e) => setClientData({ ...clientData, bodyType: e.target.value })}
        />
      </div>
      {/* Exercise Level Dropdown */}
      <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Exercise Level:</label>
                            <select
                                value={clientData.level}
                                onChange={(e) => setClientData({ ...clientData, level: e.target.value })}
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Exercise Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Expert">Expert</option>
                                <option value="Intermediate">Intermediate</option>
                            </select>
                        </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientHeight">
          Height (cm)
        </label>
        <input
          type="numeric"
          id="clientHeight"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your height (in cm)"
          value={clientData.height}
          onChange={(e) => setClientData({ ...clientData, height: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientWeight">
          Weight (kg)
        </label>
        <input
          type="numeric"
          id="clientWeight"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your weight (in kg)"
          value={clientData.weight}
          onChange={(e) => setClientData({ ...clientData, weight: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientBMI">
          BMI
        </label>
        <input
          type="numeric"
          id="clientBMI"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your BMI"
          value={clientData.bmi}
          onChange={(e) => setClientData({ ...clientData, bmi: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientTargetWeight">
          Target Weight (kg)
        </label>
        <input
          type="numeric"
          id="clientTargetWeight"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your target weight (in kg)"
          value={clientData.targetWeight}
          onChange={(e) =>
            setClientData({ ...clientData, targetWeight: parseInt(e.target.value) || 0 })
          }
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientAboutMe">
          About Me
        </label>
        <textarea
          id="clientAboutMe"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Write a brief description about yourself"
          value={clientData.aboutMe}
          onChange={(e) => setClientData({ ...clientData, aboutMe: e.target.value })}
        />
      </div>
      <button
        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
        onClick={handleClientRegister}
      >
        Register as Client
      </button>
    </div>
  );
};

export default ClientRegister;
