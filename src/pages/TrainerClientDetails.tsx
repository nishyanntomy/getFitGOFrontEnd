import React, { useState, useEffect } from 'react';
import axios from 'axios';
import userIcon from '../assets/icons/userIcon.png';
import { useParams } from 'react-router-dom';
import AssignRoutineModal from './AssignRoutineModal';
import AssignDietModal from './AssignDietModal';
import { Routine } from './Routines';
import { FaTrash } from 'react-icons/fa';
import { Diet } from './Diets';

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

const TrainerClientDetails = () => {
    const [clientData, setClientData] = useState<ClientData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAssignRoutineModal, setShowAssignRoutineModal] = useState(false);
    const [showAssignDietModal, setShowAssignDietModal] = useState(false);
    const [assignedRoutines, setAssignedRoutines] = useState<Routine[]>([]);
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [dietTypes, setDietTypes] = useState<String[]>([]);
    const [assignedDietType, setAssignedDietType] = useState('');
    const { clientEmail } = useParams();

    const handleAssignRoutineClick = () => {
        setShowAssignRoutineModal(true);
    };

    const handleAssignDietClick = () => {
        setShowAssignDietModal(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/diet-type`);
                setDietTypes(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []);

    const handleAssignDietSave = async (selectedDietType: String) => {
        try {
            await axios.post('http://127.0.0.1:5000/diet-assign', {
                trainerEmail: localStorage.getItem('userEmail'),
                clientEmail: clientEmail,
                dietName: selectedDietType
            });
        } catch (err) {
            console.error('Error assigning diets', err);
            setError('Error assigning diets');
        }
        setShowAssignDietModal(false);
    };

    const fetchAssignedDietType = async () => {
        try {
            const response = await axios.get<string>(`http://127.0.0.1:5000/view-assigned-diet?clientEmail=${clientEmail}`);
            setAssignedDietType(response.data);
        } catch (err) {
            console.error('Error fetching assigned diet', err);
            setError('Error fetching assigned diet');
        } finally {
            setLoading(false);
        }
    };

    const handleAssignRoutineSave = async (selectedRoutines: Routine[]) => {
        try {
            await axios.post('http://127.0.0.1:5000/routine-assign', {
                trainerEmail: localStorage.getItem('userEmail'),
                clientEmail: clientEmail,
                routines: selectedRoutines.map((routine) => routine.routine_id),
            });
            fetchAssignedRoutines();
        } catch (err) {
            console.error('Error assigning routines', err);
            setError('Error assigning routines');
        }
        setShowAssignRoutineModal(false);
    };

    const fetchAssignedRoutines = async () => {
        try {
            const response = await axios.get<Routine[]>(`http://127.0.0.1:5000/view-assigned-routine?clientEmail=${clientEmail}`);
            setAssignedRoutines(response.data);
        } catch (err) {
            console.error('Error fetching assigned routines', err);
            setError('Error fetching assigned routines');
        } finally {
            setLoading(false);
        }
    };

    const unassignRoutine = async (id: number) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/routine-unassign?id=${id}`);
            setAssignedRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.routine_id !== id));
        } catch (error) {
            console.error('Error unassigning:', error);
            setError('Error unassigning routine');
        }
    };

    const unassignDiet = async (name: string) => {
        try {
            await axios.delete(`http://127.0.0.1:5000/diet-unassign?dietName=${name}`);
            setAssignedDietType('');
        } catch (error) {
            console.error('Error unassigning:', error);
            setError('Error unassigning routine');
        }
    };

    useEffect(() => {
        const fetchClientDetails = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/view-client?clientEmail=${clientEmail}`);
                setClientData(response.data);
            } catch (err) {
                console.error('Error fetching client details', err);
                setError('Error fetching client details');
            } finally {
                setLoading(false);
            }
        };

        fetchClientDetails();
    }, [clientEmail]);

    useEffect(() => {
        fetchAssignedRoutines();
    }, [clientEmail]);

    useEffect(() => {
        const fetchAllRoutines = async () => {
            try {
                const response = await axios.get<Routine[]>(`http://127.0.0.1:5000/routine?trainerEmail=${localStorage.getItem('userEmail')}`);
                setRoutines(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Error fetching routines');
            }
        };

        fetchAllRoutines();
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

                {/* Assigned Routines Card */}
                <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Assigned Routines</h3>
                    <button
                        style={{ marginBottom: '10px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={handleAssignRoutineClick}
                    >
                        + Assign Routine
                    </button>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {assignedRoutines.map((routine) => (
                            <li key={routine.routine_id} style={{ marginBottom: '10px', color: '#666', position: 'relative' }}>
                                {routine.routine_name}
                                <button
                                    style={{ position: 'absolute', right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                                    onClick={() => unassignRoutine(routine.routine_id)}
                                >
                                    <FaTrash />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Assigned Diets Card */}
                <div style={{ marginBottom: '20px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#333', textAlign: 'center' }}>Assigned Diets</h3>
                    <button
                        style={{ marginBottom: '10px', color: '#666', background: 'none', border: 'none', cursor: 'pointer' }}
                        onClick={handleAssignDietClick}
                    >
                        + Assign Diet
                    </button>
                    <div className='flex'>
                        <p>{assignedDietType}</p>
                    {/* <button
                                    style={{ position: 'absolute', right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}
                                    onClick={() => unassignDiet(assignedDietType)}
                                >
                                    <FaTrash />
                                </button> */}
                                </div>
                </div>
            </div>

            {/* Assign Routine Modal */}
            {showAssignRoutineModal && (
                <AssignRoutineModal routines={routines} onCancel={() => setShowAssignRoutineModal(false)} onSave={handleAssignRoutineSave} />
            )}

            {/* Assign Diet Modal */}
            {showAssignDietModal && (
                <AssignDietModal dietTypes={dietTypes} onCancel={() => setShowAssignDietModal(false)} onSave={handleAssignDietSave} />
            )}
        </div>
    );
};

export default TrainerClientDetails;
