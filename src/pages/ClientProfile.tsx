import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userIcon from '../assets/icons/userIcon.png';

interface ClientData {
    aboutMe: null | string;
    bodyParts: string[];
    bodyType: null | string;
    clientEmail: string;
    dietType: string[];
    equipments: string[];
    firstName: string;
    gender: null | string;
    height: null | number;
    lastName: string;
    level: null | string;
    routines: string[];
    targetWeight: null | number;
    trainerEmail: string;
    weight: null | number;
}

const ClientProfile = () => {
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/view-client?clientEmail=' + localStorage.getItem('userEmail'));
                setClientData(response.data);
            } catch (err) {
                console.error('Error fetching client details', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClientDetails();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div style={{ display: 'flex', maxWidth: '1200px', margin: '50px', justifyContent: 'center', alignContent: 'center' }}>
            {/* Profile Details Card */}
            <div style={{ flex: 1, padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img
                        src={userIcon}
                        alt="User"
                        style={{ width: '200px', height: '200px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px' }}
                    />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '5px', color: '#333' }}>{clientData?.firstName} {clientData?.lastName}</h2>
                    <p style={{ color: '#666' }}>{clientData?.gender}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <div style={{ flex: 1, marginRight: '10px' }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333' }}>About Me</h3>
                        <p style={{ color: '#666' }}>{clientData?.aboutMe || 'No information available.'}</p>
                    </div>

                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: '#333' }}>Additional Details</h3>
                        <ul style={{ listStyle: 'none', padding: '0', marginBottom: '20px' }}>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Email:</strong> {clientData?.clientEmail}</li>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Height:</strong> {clientData?.height}</li>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Weight:</strong> {clientData?.weight}</li>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Target Weight:</strong> {clientData?.targetWeight}</li>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Body Type:</strong> {clientData?.bodyType}</li>
                            <li style={{ marginBottom: '10px', color: '#666' }}><strong>Level:</strong> {clientData?.level}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div style={{ flex: 1, marginLeft: '20px', display: 'flex', flexDirection: 'column' }}>
                {/* Equipments Card */}
                <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Equipments</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {clientData?.equipments.map((equipment, index) => (
                            <li key={index} style={{ marginBottom: '10px', color: '#666' }}>{equipment}</li>
                        ))}
                    </ul>
                </div>

                {/* Body Parts Card */}
                <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Focuses on Body Parts</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {clientData?.bodyParts.map((bodyPart, index) => (
                            <li key={index} style={{ marginBottom: '10px', color: '#666' }}>{bodyPart}</li>
                        ))}
                    </ul>
                </div>

                {/* Routines Card */}
                <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center', overflow: 'auto', height: '50px' }}>Assigned Routines</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {clientData?.routines.map((routine, index) => (
                            <li key={index} style={{ marginBottom: '10px', color: '#666' }}>{routine}</li>
                        ))}
                    </ul>
                </div>

                {/* Diets Card */}
                <div style={{ padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Assigned Diet Type</h3>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                       {clientData?.dietType}
                    </ul>
                </div>
                
            </div>
        </div>
    );
};

export default ClientProfile;