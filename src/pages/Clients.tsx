import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Clients = () => {
    const [clients, setClients] = useState<Client[]>([]);

    interface Client {
        clientEmail: string;
        firstName: string;
        lastName: string;
        gender: string;
        height: number;
        weight: number;
        targetWeight: number;
        bodyType: string;
        aboutMe: string;
        level: string;
        trainerEmail: string;
    }
    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axios.get<Client[]>(`http://127.0.0.1:5000/view-trainer-clients?trainerEmail=${localStorage.getItem('userEmail')}`);
                setClients(response.data);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        fetchClients();
    }, []);

    return (
        <div className="min-h-screen bg-cover bg-center bg-no-repeat" style={{
            backgroundImage: `url(${'https://hips.hearstapps.com/hmg-prod/images/hardcore-exercises-royalty-free-image-1637943272.jpg?crop=1.00xw:0.737xh;0,0.186xh&resize=1200:*'},
})` }}>
            <div className="container mx-auto p-8 bg-white bg-opacity-80">
                <h1 className="text-4xl font-bold mb-8 text-black-600">My Clients</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {clients.map((client, index) => (
                        <Link to={`/client/${client.clientEmail}`} key={client.clientEmail}>
                            <div className={`border-2 border-gray-300 p-4 rounded mb-4 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105`}>
                                <h3 className="text-xl font-bold mb-2">{`${client.firstName} ${client.lastName}`}</h3>
                                <p>{`Level: ${client.level}`}</p>
                                <p>{`Body Type: ${client.bodyType}`}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Clients;
