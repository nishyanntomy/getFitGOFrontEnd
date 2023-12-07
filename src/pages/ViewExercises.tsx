import axios from "axios";
import React, { useEffect, useState } from "react";
import { Exercise } from "./Routines";

const ViewExercises: React.FC = () => {
  const [filters, setFilters] = useState({
    body_part: '',
    level: '',
    equipment: '',
    type: '',
    searchQuery: '',
  });
  const [searchResults, setSearchResults] = useState<Exercise[]>([]);
  const [bodyParts, setBodyParts] = useState<string[][]>([]);
  const [levels, setLevels] = useState<string[][]>([]);
  const [equipments, setEquipments] = useState<string[][]>([]);
  const [exerciseTypes, setExerciseTypes] = useState<string[][]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/filter-values`);
        setBodyParts(response.data.bodyPart);
        setEquipments(response.data.equipment);
        setLevels(response.data.levels);
        setExerciseTypes(response.data.exerciseType);
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
    } catch (error) {
      console.error('Error fetching exercises', error);
    }
  };

  const handleSearchAgainClick = () => {
    setShowResults(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-3/4">
        <h2 className="text-xl font-bold mb-4">View Exercises</h2>

        {!showResults ? (
          <div className="bg-white">
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
          </div>
        ) : (
            <>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border-b">Exercise Name</th>
                  <th className="py-2 px-4 border-b">Body Part</th>
                  <th className="py-2 px-4 border-b">Level</th>
                  <th className="py-2 px-4 border-b">Equipment</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((exercise) => (
                  <tr key={exercise.name} className="border-b">
                    <td className="py-2 px-4">{exercise.name}</td>
                    <td className="py-2 px-4">{exercise.body_part}</td>
                    <td className="py-2 px-4">{exercise.level}</td>
                    <td className="py-2 px-4">{exercise.equipment}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded"
                onClick={handleSearchAgainClick}
              >
                Search Again
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewExercises;