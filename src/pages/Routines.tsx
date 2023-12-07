import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddRoutineModal from './routines/AddRoutineModal';
import AddExerciseModal from './routines/AddExerciseModal';

export interface Exercise {
  name: string;
  reps: number;
  body_part: string;
  level: string;
  equipment: string;
  id: number
}

interface Routine {
  routine_id: number;
  routine_name: string;
  routine_description: string;
  exercises: Exercise[];
}


const Routines: React.FC = () => {
  interface Data {
    message: string;
  }

  const [trainerEmail, setTrainerEmail] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem('userEmail');
    if (storedData) {
      setTrainerEmail(storedData);
    }
  }, []);

  const [routines, setRoutines] = useState<Routine[]>([]);
  const [newRoutine, setNewRoutine] = useState<Routine>({
    routine_id: 0,
  routine_name: '',
  routine_description: '',
  exercises: []
  });
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Routine[]>(`http://127.0.0.1:5000/routine?trainerEmail=${localStorage.getItem('userEmail')}`);
        setRoutines(response.data)
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddRoutineClick = () => {
    setShowAddRoutineModal(true);
  };

  const handleSaveRoutine = async (name: string, description: string) => {
    try {
      // Make the POST request to add the routine
      const addRoutineResponse = await axios.post('http://127.0.0.1:5000/routine', {
        routineName: name,
        routineDescription: description,
        trainerEmail: trainerEmail
      });

      console.log(addRoutineResponse.data);

      // Update state with the new routine
      setRoutines((prevRoutines) => [
        ...prevRoutines,
        { ...newRoutine, name, description, id: Date.now(), exercises: [] },
      ]);

      setShowAddRoutineModal(false);
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const handleCancelAddRoutine = () => {
    setShowAddRoutineModal(false);
  };

  const deleteRoutine = async (id: number) => {
    try {
      const response = await axios.delete<Routine[]>(`http://127.0.0.1:5000/routine?routineId=${id}`);
      console.log(response.data);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.routine_id !== id));
  };

  const handleAddExerciseClick = () => {
    setShowAddExerciseModal(true);
  };

  const handleCancelAddExercise = () => {
    setShowAddExerciseModal(false);
  };

  const handleAddExercisesToRoutine = async (selectedExercises: Exercise[]) => {
    const selectedIds = selectedExercises.map((item) => item.id);
    try {
      // Make the POST request to add the routine
      const addRoutineToExerciseResponse = await axios.post('http://127.0.0.1:5000/routine-exercise', {
        exercises: selectedIds,
        routineId: 2
      });

      console.log(addRoutineToExerciseResponse.data);

      setNewRoutine((prevRoutine) => ({
        ...prevRoutine,
        exercises: [...prevRoutine.exercises, ...selectedExercises],
      }));

      setShowAddRoutineModal(false);
    } catch (error) {
      console.error('Error adding exercises to routine:', error);
    }
    
    setShowAddExerciseModal(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Routines</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddRoutineClick}
      >
        Add New Routine
      </button>
      {showAddRoutineModal && (
        <AddRoutineModal onSave={handleSaveRoutine} onCancel={handleCancelAddRoutine} />
      )}
      {showAddExerciseModal && (
        <AddExerciseModal
          onAddExercises={handleAddExercisesToRoutine}
          onCancel={handleCancelAddExercise}
        />
      )}
      {routines.map((routine) => (
        <div
          key={routine.routine_id}
          className="border-2 border-gray-300 p-4 rounded mb-4"
        >
          <h3 className="text-xl font-bold mb-2">{routine.routine_name}</h3>
          <p className="mb-4">{routine.routine_description}</p>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                {exercise.name} - {exercise.reps} reps
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => deleteRoutine(routine.routine_id)}
          >
            Delete Routine
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleAddExerciseClick}
          >
            Add Exercise
          </button>
        </div>
      ))}
    </div>
  );
};

export default Routines;
