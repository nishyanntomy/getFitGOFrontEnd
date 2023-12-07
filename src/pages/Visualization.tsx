import React, { useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  DoughnutController,
  Title,
  Tooltip,
  Legend,
  PointElement
);

interface Exercise {
  exercise_name: string;
  exercise_count: number;
}

interface BodyPart {
  part_name: string;
  part_count: number;
}

const ExercisePage = () => {
  const [exerciseData, setExerciseData] = useState<Exercise[]>([]);
  const [bodyPartData, setBodyPartData] = useState<BodyPart[]>([]);
  const [loadingExercise, setLoadingExercise] = useState(true);
  const [loadingBodyPart, setLoadingBodyPart] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/top-exercise');
        const data = await response.json();
        setExerciseData(data);
      } catch (error) {
        console.error('Error fetching exercise data', error);
      } finally {
        setLoadingExercise(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/top-body-parts');
        const data = await response.json();
        setBodyPartData(data);
      } catch (error) {
        console.error('Error fetching body part data', error);
      } finally {
        setLoadingBodyPart(false);
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
    labels: bodyPartData.map((bodyPart) => bodyPart.part_name),
    datasets: [
      {
        label: 'Top Body Parts Used by Users',
        data: bodyPartData.map((bodyPart) => bodyPart.part_count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f7f7f7' }}>
      <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '2em' }}>Top Exercises</h1>
      {loadingExercise || loadingBodyPart ? (
        <p style={{ fontSize: '18px', color: '#777' }}>Loading exercise data...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%', margin: 'auto', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#fff' }}>
          <div style={{ padding: '20px', width: '100%' }}>
            <Bar data={chartData} />
          </div>
          <div style={{ padding: '20px', width: '100%' }}>
            <Doughnut data={chartData2} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExercisePage;
