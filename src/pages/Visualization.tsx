import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement, // Correct registration for PointElement
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement // Correct registration for PointElement
);

interface Exercise {
  exercise_name: string;
  exercise_count: number;
}

const ExercisePage = () => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/top-exercise');
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error('Error fetching exercise data', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: exerciseData.map((exercise) => exercise.exercise_name),
    datasets: [
      {
        label: 'Top Exercises Used by Users',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: exerciseData.map((exercise) => exercise.exercise_count),
      },
    ],
  };

  const chartData2 = {
    labels: exerciseData.map((exercise) => exercise.exercise_name),
    datasets: [
      {
        label: 'Another Chart',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,99,132,1)',
        pointRadius: 5,
        pointBorderWidth: 2,
        pointBorderColor: '#fff',
        fill: false,
        data: exerciseData.map((exercise) => exercise.exercise_count),
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f7f7f7' }}>
      <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2em' }}>Top Exercises</h1>
      {exerciseData.length > 0 ? (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '80%', margin: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
          <div style={{ flex: 1, padding: '20px' }}>
            <Bar data={chartData} />
          </div>
          <div style={{ flex: 1, padding: '20px' }}>
            <Line data={chartData2} />
          </div>
        </div>
      ) : (
        <p style={{ fontSize: '18px', color: '#777' }}>Loading exercise data...</p>
      )}
    </div>
  );
};

export default ExercisePage;
