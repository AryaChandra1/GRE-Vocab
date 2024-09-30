import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function Dashboard() {
  const [quizData, setQuizData] = useState(null);

  useEffect(() => {
    fetch('/api/quiz-data')
      .then(res => res.json())
      .then(data => setQuizData(data));
  }, []);

  if (!quizData) return <div>Loading...</div>;

  const chartData = {
    labels: quizData.dates,
    datasets: [
      {
        label: 'Correct Answers',
        data: quizData.correct,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      },
      {
        label: 'Incorrect Answers',
        data: quizData.incorrect,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }
    ]
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mt-8">Your Progress</h2>
      <Line data={chartData} />
    </div>
  );
}