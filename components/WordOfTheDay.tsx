import React from 'react';

export default function WordOfTheDay({ word }) {
  return (
    <div>
      <h2 className="text-2xl font-bold">{word.word}</h2>
      <p>{word.definition}</p>
      <h3 className="text-xl font-semibold mt-4">Example Sentences:</h3>
      <ul>
        <li>{word.sentence1}</li>
        <li>{word.sentence2}</li>
      </ul>
    </div>
  );
}