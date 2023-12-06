// WorkoutPage.tsx

import axios from 'axios';
import React, { useState, useEffect } from 'react';

interface Exercise {
  name: string;
  reps: number;
  bodyType: string;
  level: string;
  equipment: string;
}

interface Routine {
  id: number;
  name: string;
  description: string;
  exercises: Exercise[];
}

const AddRoutineModal: React.FC<{ onSave: (name: string) => void; onCancel: () => void }> = ({
    onSave,
    onCancel,
  }) => {
    const [routineName, setRoutineName] = useState('');
  
    const handleSave = () => {
      onSave(routineName);
      setRoutineName('');
    };
  
    return (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded">
          <h2 className="text-xl font-bold mb-4">Add New Routine</h2>
          <input
            type="text"
            placeholder="Routine Name"
            value={routineName}
            onChange={(e) => setRoutineName(e.target.value)}
            className="mb-4 p-2 border rounded w-full"
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

const AddExerciseModal: React.FC<{
  onAddExercises: (selectedExercises: Exercise[]) => void;
  onCancel: () => void;
}> = ({ onAddExercises, onCancel }) => {
  const [filters, setFilters] = useState({
    bodyType: '',
    level: '',
    equipment: '',
    searchQuery: '',
  });
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);

  // Mock API call to fetch exercises based on filters
  const fetchExercisesFromApi = async (): Promise<Exercise[]> => {
    // Assume the API call returns an array of exercises based on filters
    return [
      { name: 'Exercise 1', reps: 10, bodyType: 'Upper Body', level: 'Beginner', equipment: 'Dumbbells' },
      { name: 'Exercise 2', reps: 15, bodyType: 'Lower Body', level: 'Intermediate', equipment: 'Resistance Bands' },
      // Add more exercises as needed
    ];
  };

  const handleSearch = async () => {
    const results = await fetchExercisesFromApi();
    setSearchResults(results);
  };

  const handleAddSelectedExercises = () => {
    onAddExercises(selectedExercises);
    setSelectedExercises([]);
  };

  const handleCheckboxChange = (exercise: Exercise) => {
    const isChecked = selectedExercises.some((selectedExercise) => selectedExercise.name === exercise.name);

    if (isChecked) {
      setSelectedExercises((prevSelected) => prevSelected.filter((selected) => selected.name !== exercise.name));
    } else {
      setSelectedExercises((prevSelected) => [...prevSelected, exercise]);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Add Exercises</h2>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Body Type:</label>
          {/* Add your Body Type dropdown here */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Exercise Level:</label>
          {/* Add your Exercise Level dropdown here */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Equipment:</label>
          {/* Add your Equipment dropdown here */}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2">Search by Name:</label>
          <input
            type="text"
            placeholder="Search"
            value={filters.searchQuery}
            onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            className="p-2 border rounded w-full"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleSearch}
        >
          Search
        </button>
        <table className="w-full">
          <thead>
            <tr>
              <th>Exercise Name</th>
              <th>Body Type</th>
              <th>Level</th>
              <th>Equipment</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((exercise) => (
              <tr key={exercise.name}>
                <td>{exercise.name}</td>
                <td>{exercise.bodyType}</td>
                <td>{exercise.level}</td>
                <td>{exercise.equipment}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedExercises.some((selected) => selected.name === exercise.name)}
                    onChange={() => handleCheckboxChange(exercise)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={handleAddSelectedExercises}
          >
            Add Selected
          </button>
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const WorkoutPage: React.FC = () => {
    interface Data {
        message: string;
    }
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [newRoutine, setNewRoutine] = useState<Routine>({
    id: 0,
    name: '',
    description: '',
    exercises: [],
  });
  const [isAddingRoutine, setIsAddingRoutine] = useState(false);
  const [isAddingExercise, setIsAddingExercise] = useState(false);

  const fetchExercisesFromApi = async (): Promise<Exercise[]> => {
    // Assume the API call returns an array of exercises based on filters
    return [
      { name: 'Exercise 1', reps: 10, bodyType: 'Upper Body', level: 'Beginner', equipment: 'Dumbbells' },
      { name: 'Exercise 2', reps: 15, bodyType: 'Lower Body', level: 'Intermediate', equipment: 'Resistance Bands' },
      // Add more exercises as needed
    ];
  };

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get<Data>('http://127.0.0.1:5000/diet');
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
}, []);
  
  useEffect(() => {
    const fetchExercises = async () => {
        try {
            const response = await axios.get<Data>('http://localhost:5000/api/diet');
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
      // Assume the API call returns an array of exercises
      const exercises = await fetchExercisesFromApi();
      setNewRoutine((prevRoutine) => ({ ...prevRoutine, exercises }));
    };

    if (isAddingExercise) {
      fetchExercises();
    }
  }, [isAddingExercise]);

  const handleAddRoutineClick = () => {
    setIsAddingRoutine(true);
  };

  const handleSaveRoutine = (name: string) => {
    setRoutines((prevRoutines) => [...prevRoutines, { ...newRoutine, name, id: Date.now() }]);
    setNewRoutine({
      id: 0,
      name: '',
      description: '',
      exercises: [],
    });
    setIsAddingRoutine(false);
  };

  const handleCancelAddRoutine = () => {
    setIsAddingRoutine(false);
  };

  const deleteRoutine = (id: number) => {
    setRoutines((prevRoutines) => prevRoutines.filter((routine) => routine.id !== id));
  };

  const handleAddExerciseClick = () => {
    setIsAddingExercise(true);
  };

  const handleCancelAddExercise = () => {
    setIsAddingExercise(false);
  };

  const handleAddExercisesToRoutine = (selectedExercises: Exercise[]) => {
    setNewRoutine((prevRoutine) => ({
      ...prevRoutine,
      exercises: [...prevRoutine.exercises, ...selectedExercises],
    }));
    setIsAddingExercise(false);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Gym Trainer Workouts</h1>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleAddRoutineClick}
      >
        Add New Routine
      </button>
      {isAddingRoutine && (
        <AddRoutineModal onSave={handleSaveRoutine} onCancel={handleCancelAddRoutine} />
      )}
      {routines.map((routine) => (
        <div
          key={routine.id}
          className="border-2 border-gray-300 p-4 rounded mb-4"
        >
          <h3 className="text-xl font-bold mb-2">{routine.name}</h3>
          <p className="mb-4">{routine.description}</p>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                {exercise.name} - {exercise.reps} reps
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => deleteRoutine(routine.id)}
          >
            Delete Routine
          </button>
        </div>
      ))}
      {isAddingExercise && (
        <AddExerciseModal
          onAddExercises={handleAddExercisesToRoutine}
          onCancel={handleCancelAddExercise}
        />
      )}
      {routines.map((routine) => (
        <div
          key={routine.id}
          className="border-2 border-gray-300 p-4 rounded mb-4"
        >
           <h3 className="text-xl font-bold mb-2">{routine.name}</h3>
          <p className="mb-4">{routine.description}</p>
          <ul>
            {routine.exercises.map((exercise, index) => (
              <li key={index} className="mb-2">
                {exercise.name} - {exercise.reps} reps
              </li>
            ))}
          </ul>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={() => deleteRoutine(routine.id)}
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

export default WorkoutPage;
