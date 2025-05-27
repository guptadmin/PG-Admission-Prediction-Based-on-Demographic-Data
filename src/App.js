import React, { useState, useEffect } from 'react';
import PersonalInfo from './components/PersonalInfo';
import Form from './Form';
import Results from './Results';
import './App.css';

function App() {
  const [step, setStep] = useState(1); // 1 = Personal Info, 2 = Form, 3 = Results
  const [personalInfo, setPersonalInfo] = useState(null);
  const [formData, setFormData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handlePersonalInfoNext = (info) => {
    setPersonalInfo(info);
    setStep(2);
  };

  const handleSubmit = async (data) => {
    setLoading(true);
    setFormData(data);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, country: data.country || 'USA' })
      });

      const result = await response.json();

      if (!result.error) {
        setPrediction(result.percent);
        setInterpretation(result.interpretation);
        setUniversities(result.universities || []);
        setStep(3);
      } else {
        alert(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Prediction error:', error);
      alert('Server error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToPersonalInfo = () => {
    setStep(1);
  };

  const handleBackToForm = () => {
    setPrediction(null);
    setInterpretation('');
    setUniversities([]);
    setStep(2);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  return (
    <div className="app">
      {step !== 1 && (
        <div className="toggle-container">
          <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
            {darkMode ? '🌙' : '☀️'}
          </button>
        </div>
      )}

      {step > 1 && (
        <button 
          className="back-icon-btn" 
          onClick={step === 2 ? handleBackToPersonalInfo : handleBackToForm}
        >
          ←
        </button>
      )}

      {step === 1 && <PersonalInfo onNext={handlePersonalInfoNext} />}
      {step === 2 && !prediction && <Form onSubmit={handleSubmit} />}
      {step === 3 && prediction && (
        <Results
          prediction={prediction}
          interpretation={interpretation}
          universities={universities}
          formData={formData}
        />
      )}

      {loading && <div className="loader">Calculating...</div>}
    </div>
  );
}

export default App;
