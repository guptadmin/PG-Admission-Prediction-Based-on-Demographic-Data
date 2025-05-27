import React, { useState } from "react";
import "./App.css";

const AdmissionForm = () => {
  const [formData, setFormData] = useState({
    greScore: "",
    toeflScore: "",
    universityRating: "",
    sop: "",
    lor: "",
    cgpa: "",
    research: false,
  });

  const [admissionChance, setAdmissionChance] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setAdmissionChance(null);

    // Convert all values to numbers
    const gre = Number(formData.greScore);
    const toefl = Number(formData.toeflScore);
    const universityRating = Number(formData.universityRating);
    const sop = Number(formData.sop);
    const lor = Number(formData.lor);
    const cgpa = Number(formData.cgpa);
    const research = formData.research ? 1 : 0;

    // Validate minimum requirements
    if (gre < 260 || gre > 340) {
      setError("GRE must be between 260-340");
      return;
    }
    if (toefl < 60 || toefl > 120) {
      setError("TOEFL must be between 60-120");
      return;
    }
    if (universityRating < 1 || universityRating > 5) {
      setError("University rating must be 1-5");
      return;
    }
    if (sop < 1 || sop > 5) {
      setError("SOP rating must be 1-5");
      return;
    }
    if (lor < 1 || lor > 5) {
      setError("LOR rating must be 1-5");
      return;
    }
    if (cgpa < 5 || cgpa > 10) {
      setError("CGPA must be between 5-10");
      return;
    }

    // Calculate admission chance (weighted average)
    const chance =
      (gre / 340) * 0.25 +        // GRE weight: 25%
      (toefl / 120) * 0.2 +       // TOEFL weight: 20%
      (universityRating / 5) * 0.1 + // University rating weight: 10%
      (sop / 5) * 0.1 +           // SOP weight: 10%
      (lor / 5) * 0.1 +           // LOR weight: 10%
      (cgpa / 10) * 0.2 +         // CGPA weight: 20%
      research * 0.05;             // Research weight: 5%

    setAdmissionChance((chance * 100).toFixed(2));
  };

  return (
    <div className="admission-container">
      <h1>University Admission Predictor</h1>
      <form onSubmit={handleSubmit} className="admission-form">
        <div className="form-group">
          <label htmlFor="greScore">GRE Score (260-340)</label>
          <input
            type="number"
            id="greScore"
            name="greScore"
            placeholder="GRE Score"
            value={formData.greScore}
            onChange={handleChange}
            min="260"
            max="340"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="toefScore">TOEFL Score (60-120)</label>
          <input
            type="number"
            id="toeflScore"
            name="toeflScore"
            placeholder="TOEFL Score"
            value={formData.toeflScore}
            onChange={handleChange}
            min="60"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="universityRating">University Rating (1-5)</label>
          <input
            type="number"
            id="universityRating"
            name="universityRating"
            value={formData.universityRating}
            onChange={handleChange}
            min="1"
            max="5"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="sop">Statement of Purpose (1-5)</label>
          <input
            type="number"
            id="sop"
            name="sop"
            value={formData.sop}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lor">Letter of Recommendation (1-5)</label>
          <input
            type="number"
            id="lor"
            name="lor"
            value={formData.lor}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="cgpa">CGPA (5-10)</label>
          <input
            type="number"
            id="cgpa"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            min="5"
            max="10"
            step="0.1"
            required
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="research"
              checked={formData.research}
              onChange={handleChange}
            />
            Research Experience
          </label>
        </div>

        <button type="submit" className="submit-btn">
          Predict Admission Chance
        </button>

        {error && <div className="error-message">{error}</div>}

        {admissionChance && (
          <div className="result">
            <h3>Admission Prediction Result</h3>
            <div className="chance">
              Your estimated admission chance: <span>{admissionChance}%</span>
            </div>
            <div className="interpretation">
              {admissionChance >= 80
                ? "Excellent chance! 🎉"
                : admissionChance >= 60
                ? "Good chance! 👍"
                : admissionChance >= 40
                ? "Moderate chance 🤞"
                : "Needs improvement 📈"}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default AdmissionForm;