import React, { useState } from 'react';

interface ClientRegisterProps {}

const ClientRegister: React.FC<ClientRegisterProps> = () => {
  const [clientData, setClientData] = useState({
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
    mobileNumber: '',
    height: 0,
    weight: 0,
    targetWeight: 0,
    aboutMe: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClientRegister = () => {
    // Add client registration logic
    console.log('Client Registration:', clientData);
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
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientHeight">
          Height (cm)
        </label>
        <input
          type="number"
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
          type="number"
          id="clientWeight"
          className="w-full p-2 border border-gray-300 rounded-md"
          placeholder="Enter your weight (in kg)"
          value={clientData.weight}
          onChange={(e) => setClientData({ ...clientData, weight: parseInt(e.target.value) || 0 })}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="clientTargetWeight">
          Target Weight (kg)
        </label>
        <input
          type="number"
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
