import axios from 'axios';
import React, { useState, useEffect } from 'react';
import AddRoutineModal from './routines/AddRoutineModal';
import AddExerciseModal from './routines/AddExerciseModal';
import EditRepsModal from './routines/EditRepsModal';
import { FaPlus, FaPencilAlt, FaDumbbell, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


export interface Exercise {
  name: string;
  reps: number;
  body_part: string;
  level: string;
  equipment: string;
  id: number;
  description: string;
}

export interface RoutineExercise {
  exercise_description: string;
  exercise_id: number;
  exercise_title: string;
  reps: number;
}

export interface Routine {
  routine_id: number;
  routine_name: string;
  routine_description: string;
  exercises: RoutineExercise[];
}

const Routines: React.FC = () => {
  interface Data {
    message: string;
  }
 


  const [trainerEmail, setTrainerEmail] = useState('');
  const [currentRoutineId, setCurrentRoutineId] = useState<number | null>(null);
  const [currentExerciseId, setCurrentExerciseId] = useState<number | null>(null);
  useEffect(() => {
    const storedData = localStorage.getItem('userEmail');
    if (storedData) {
      setTrainerEmail(storedData);
    }
  }, []);

const navigate = useNavigate();
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [newRoutine, setNewRoutine] = useState<Routine>({
    routine_id: 0,
    routine_name: '',
    routine_description: '',
    exercises: [],
  });
  const [newExercise, setNewExercise] = useState<RoutineExercise[]>([]);
  const [showAddRoutineModal, setShowAddRoutineModal] = useState(false);
  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Routine[]>(`http://127.0.0.1:5000/routine?trainerEmail=${localStorage.getItem('userEmail')}`);
        setRoutines(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [showEditRepsModal, setShowEditRepsModal] = useState(false);

  const handleEditRepsClick = (routineId: number, exerciseId: number) => {
    console.log('Routine ID:', routineId);
    console.log('Exercise ID:', exerciseId);

    setCurrentRoutineId(routineId);
    setCurrentExerciseId(exerciseId);
    setShowEditRepsModal(true);
  };

  const handleAddRoutineClick = () => {
    setShowAddRoutineModal(true);
  };

  const handleSaveReps = async (newReps: number) => {
    try {
      // Make the POST request to add the routine
      const editRepsResponse = await axios.post('http://127.0.0.1:5000/routine-rep', {
        exerciseId: currentExerciseId,
        routineId: currentRoutineId,
        reps: newReps,
      });

      setRoutines((prevRoutines) => {
        return prevRoutines.map((routine) => {
          if (routine.routine_id === currentRoutineId) {
            routine.exercises = routine.exercises.map((exercise) => {
              if (exercise.exercise_id === currentExerciseId) {
                return { ...exercise, reps: newReps };
              }
              return exercise;
            });
          }
          return routine;
        });
      });

      setShowEditRepsModal(false);
    } catch (error) {
      console.error('Error editing rep: ', error);
    }
  };


  const handleSaveRoutine = async (name: string, description: string) => {
    try {
      // Make the POST request to add the routine
      const addRoutineResponse = await axios.post('http://127.0.0.1:5000/routine', {
        routineName: name,
        routineDescription: description,
        trainerEmail: trainerEmail,
      });
      setRoutines((prevRoutines) => [
        ...prevRoutines,
        { ...newRoutine, routine_name: name, routine_description: description },
      ]);
      setShowAddRoutineModal(false);
    } catch (error) {
      console.error('Error adding routine:', error);
    }
  };

  const handleCancelAddRoutine = () => {
    setShowAddRoutineModal(false);
  };

  const handleCancelEditReps = () => {
    setCurrentExerciseId(null);
    setShowEditRepsModal(false);
  };

  const deleteRoutine = async (id: number) => {
    try {
      const response = await axios.delete<Routine[]>(`http://127.0.0.1:5000/routine?routineId=${id}`);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.routine_id !== id));
  };

  const handleAddExerciseClick = (routineId: number) => {
    
    setCurrentRoutineId(routineId); // Set the current routine ID in state
    setShowAddExerciseModal(true);
  };

  const handleCancelAddExercise = () => {
    setCurrentRoutineId(null); // Reset the current routine ID when canceling
    setShowAddExerciseModal(false);
  };

  const handleAddExercisesToRoutine = async (selectedExercises: Exercise[]) => {
    const selectedIds = selectedExercises.map((item) => item.id);
    try {
      const addRoutineToExerciseResponse = await axios.post('http://127.0.0.1:5000/routine-exercise', {
        exercises: selectedIds,
        routineId: currentRoutineId
      });
      setShowAddExerciseModal(false);
      navigate('/routines');
      window.location.reload();
    } catch (error) {
      console.error('Error adding exercises to routine:', error);
    }



    setCurrentRoutineId(null); // Reset the current routine ID after adding exercises
  };
  


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Your Routines</h1>
      <button
        className="flex items-center bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md mb-4"
        onClick={handleAddRoutineClick}
      >
        <FaPlus className="mr-2" />
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
      {showEditRepsModal && (
        <EditRepsModal onCancel={handleCancelEditReps} onSave={handleSaveReps} />
      )}
      {routines.map((routine) => (
        <div
          key={routine.routine_id}
          className="border-2 border-gray-300 p-4 rounded-md mb-4 shadow-md"
        >
          <h3 className="text-xl font-bold mb-2">{routine.routine_name}</h3>
          <p className="text-gray-600 mb-4">{routine.routine_description}</p>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index} className="mb-2 flex items-center text-gray-700">
                <FaDumbbell className="mr-2" />
                {exercise.exercise_title} - {exercise.reps} reps
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-md ml-auto"
                  onClick={() => handleEditRepsClick(routine.routine_id, exercise.exercise_id)}
                >
                  <FaPencilAlt className="mr-1" />
                  Update Reps
                </button>
              </li>
            ))}
          </ul>
          <div className="flex mt-4">
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md mr-2"
              onClick={() => handleAddExerciseClick(routine.routine_id)}
            >
              <FaPlus className="mr-2" />
              Add Exercise
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => deleteRoutine(routine.routine_id)}
            >
              <FaTrash className="mr-2" />
              Delete Routine
            </button>
          </div>
        </div>
      ))}
    </div>
  );
  
  
            };  

export default Routines;