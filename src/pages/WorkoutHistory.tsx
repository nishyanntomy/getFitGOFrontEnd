import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHistory, FaTimes } from 'react-icons/fa'; // Import icons from react-icons library
import workoutHistoryIcon from '../assets/icons/workoutHistory.png'
interface Workout {
    id: number;
    exercise_id: number;
    email: string;
    reps: number;
    date: string;
    title: string;
    description: string;
    type: string;
    body_part: string;
    equipment: string;
    level: string;
}

const WorkoutHistory: React.FC = () => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [filterDate, setFilterDate] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post<Workout[]>('http://127.0.0.1:5000/view-workouts', {
                    clientEmail: localStorage.getItem('userEmail'), logDate: filterDate
                });
                setWorkouts(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filterDate]);

    const handleClearFilter = () => {
        setFilterDate(null);
    };

    const groupExercisesByMonth = () => {
        const groupedExercises: { [month: string]: Workout[] } = {};

        workouts.forEach((exercise) => {
            const month = new Date(exercise.date).toLocaleString('en-US', { month: 'long', year: 'numeric' });
            if (!groupedExercises[month]) {
                groupedExercises[month] = [];
            }
            groupedExercises[month].push(exercise);
        });

        return groupedExercises;
    };

    const groupedExercises = groupExercisesByMonth();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: 1, padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <img
                        src={workoutHistoryIcon}
                        alt="Banner"
                        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
                    />
                </div>
            </div>

            {/* Heading with Icon */}
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
                Your Workout History
            </h1>

            {/* Date Filter */}
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <label style={{ marginRight: '10px' }}>Filter by Date:</label>
                <input
                    type="date"
                    value={filterDate || ''}
                    onChange={(e) => setFilterDate(e.target.value || null)}
                />
                <FaTimes
                    style={{ marginLeft: '10px', cursor: 'pointer', color: 'red' }}
                    onClick={handleClearFilter}
                />
            </div>

            {/* Display Grouped Workouts */}
            {Object.entries(groupedExercises).map(([month, exercises]) => (
                <div key={month} style={monthCardStyle}>
                    <h2 style={monthHeadingStyle}>{month}</h2>
                    <ul style={{ listStyle: 'none', padding: '0' }}>
                        {exercises.map((exercise) => (
                            <li key={exercise.id} style={workoutItemStyle}>
                                <strong>{exercise.title}</strong>
                                <p>{`Date: ${exercise.date}`}</p>
                                <p>{`Reps: ${exercise.reps}`}</p>
                                <p>{`Type: ${exercise.type}`}</p>
                                <p>{`Body Part: ${exercise.body_part}`}</p>
                                <p>{`Equipment: ${exercise.equipment}`}</p>
                                <p>{`Level: ${exercise.level}`}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

const monthCardStyle = {
    backgroundColor: '#f2f2f2',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '10px',
};

const monthHeadingStyle = {
    fontSize: '1.2rem',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'black',
    color: 'wheat'
};

const workoutItemStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
};

export default WorkoutHistory;