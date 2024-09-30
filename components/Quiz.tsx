import React, { useState } from 'react';

export default function Quiz({ word }) {
  const [userAnswer, setUserAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (answer) => {
    setUserAnswer(answer);
    setIsCorrect(answer === word.quizCorrect);
    // Send result to API
    fetch('/api/quiz-result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word: word.word, correct: answer === word.quizCorrect }),
    });
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mt-4">Quiz:</h3>
      <p>{word.quizSentence}</p>
      <div className="mt-2">
        <button onClick={() => handleAnswer(true)} className="mr-2 px-4 py-2 bg-blue-500 text-white rounded">Correct</button>
        <button onClick={() => handleAnswer(false)} className="px-4 py-2 bg-red-500 text-white rounded">Incorrect</button>
      </div>
      {isCorrect !== null && (
        <p className={isCorrect ? "text-green-500" : "text-red-500"}>
          {isCorrect ? "Correct!" : "Incorrect. Try again!"}
        </p>
      )}
    </div>
  );
}