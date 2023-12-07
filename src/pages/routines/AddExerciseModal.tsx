import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Exercise } from "../Routines";

const AddExerciseModal: React.FC<{
    onAddExercises: (selectedExercises: Exercise[]) => void;
    onCancel: () => void;
}> = ({ onAddExercises, onCancel }) => {
    const [filters, setFilters] = useState({
        body_part: '',
        level: '',
        equipment: '',
        type: '',
        searchQuery: '',
    });
    const [searchResults, setSearchResults] = useState<Exercise[]>([]);
    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [bodyParts, setBodyParts] = useState<string[][]>([]);
    const [levels, setLevels] = useState<string[][]>([]);
    const [equipments, setEquipments] = useState<string[][]>([]);
    const [exerciseTypes, setExerciseTypes] = useState<string[][]>([]);

    useEffect(() => {
        if (searchResults.length > 0) {
            setShowResults(true);
        }
    }, [searchResults])

    const handleSearchAgainClick = () => {
        setShowResults(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/filter-values`);
                setBodyParts(response.data.bodyPart);
                setEquipments(response.data.equipment);
                setLevels(response.data.levels);
                setExerciseTypes(response.data.exerciseType);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSearch = async (title: string, type: string, body_part: string, equipment: string, level: string) => {
        try {
            const getExercisesByCriteriaResponse = await axios.post('http://127.0.0.1:5000/exercise', {
                title: title.length ? title : null,
                type: type.length ? type : null,
                body_part: body_part.length ? body_part : null,
                equipment: equipment.length ? equipment : null,
                level: level.length ? level : null
            });
            setSearchResults(getExercisesByCriteriaResponse.data);
            setShowResults(true);
            console.log(getExercisesByCriteriaResponse.data);
        } catch (error) {
            console.error('Error fetching exercises', error);
        }
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
            <div className="bg-white px-8 rounded w-3/4 h-3/4 overflow-auto">
                <h2 className="text-xl pt-8 pb-4 font-bold mb-4 w-full bg-white sticky top-0">Add Exercises</h2>
                {!showResults ?
                    <>
                        {/* Body Type Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Body Part:</label>
                            <select
                                value={filters.body_part}
                                onChange={(e) => setFilters({ ...filters, body_part: e.target.value })}
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Body Part</option>
                                {bodyParts.map((item) => (
                                    <option value={item[0]} key={item[0]}>
                                        {item[0]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exercise Level Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Exercise Level:</label>
                            <select
                                value={filters.level}
                                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Exercise Level</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Expert">Expert</option>
                                <option value="Intermediate">Intermediate</option>
                            </select>
                        </div>

                        {/* Equipment Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Equipment:</label>
                            <select
                                value={filters.equipment}
                                onChange={(e) => setFilters({ ...filters, equipment: e.target.value })}
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Equipment</option>
                                {equipments.map((item) => (
                                    <option value={item[0]} key={item[0]}>
                                        {item[0]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Exercise Types Dropdown */}
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Exercise Type:</label>
                            <select
                                value={filters.equipment}
                                onChange={(e) => setFilters({ ...filters, equipment: e.target.value })}
                                className="p-2 border rounded w-full"
                            >
                                <option value="">Select Exercise Type</option>
                                {exerciseTypes.map((item) => (
                                    <option value={item[0]} key={item[0]}>
                                        {item[0]}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search Input */}
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
                            onClick={() => handleSearch(filters.searchQuery, filters.type, filters.body_part, filters.equipment, filters.level)}
                        >
                            Search
                        </button>
                        <button
                            className="ml-5 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </> : (searchResults.length > 0 ? <>

                        {/* Exercise Table */}
                        <table className="w-full">
                            <thead>
                                <tr>
                                    <th>Exercise Name</th>
                                    <th>Body Part</th>
                                    <th>Level</th>
                                    <th>Equipment</th>
                                    <th>Add</th>
                                </tr>
                            </thead>
                            <tbody>
                                {searchResults.map((exercise) => (
                                    <tr key={exercise.name}>
                                        <td>{exercise.name}</td>
                                        <td>{exercise.body_part}</td>
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
                    </> : <>
                        <div className="text-xl text-grey-400">
                            <p>No Exercises Found!</p>
                        </div>
                    </>)}

                {/* Action Buttons */}
                <div className="w-full bg-white flex justify-end sticky bottom-0 p-3">
                    {searchResults.length > 0 ?
                        <>
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
                        </>
                        :
                        (showResults &&
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                                onClick={handleSearchAgainClick}
                            >
                                Search Again
                            </button>
                        )}
                </div>

            </div>
        </div>
    );
};

export default AddExerciseModal;
