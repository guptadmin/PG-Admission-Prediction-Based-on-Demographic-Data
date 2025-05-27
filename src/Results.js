import React from 'react';
import Chart from './Chart';

const Results = ({ prediction, interpretation, universities, formData }) => {
  return (
    <div className="results-container">
      <h2>Admission Prediction Result</h2>

      <div className="prediction-result">
        <p>
          Your estimated admission chance:{' '}
          <strong style={{ color: 'green' }}>{prediction}%</strong>
        </p>
        <p><em>{interpretation} 🎉</em></p>
      </div>

      {universities && universities.length > 0 && (
        <div className="university-list">
          <h3>Top Matching Universities:</h3>
          <ul>
            {universities.map((uni, index) => (
              <li key={index}>
                <strong>{uni.University}</strong> — {uni.PredictedChance}%
              </li>
            ))}
          </ul>
        </div>
      )}

      <Chart data={formData} prediction={prediction} />

      <div className="input-summary">
        <h3>Your Input Summary:</h3>
        <ul>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Results;
