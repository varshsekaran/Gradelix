import React from 'react';
import { useLocation } from 'react-router-dom';
import './Analysis.css'

function Analysis() {
  const location = useLocation();
  const { year, semester, cae, total, pass, fail } = location.state || {};

    if (!location.state) {
    return <p style={{ padding: '2rem', color: 'red' }}>No data received. Please go back and upload a file.</p>;
  }

  console.log("Total:", total);
console.log("Passed:", pass);
console.log("Failed:", fail);
console.log("Received state:", location.state);


  return (
    <div className="analysis-container" style={{ padding: '2rem', color: 'black !important' }}>
      <h2>Analysis </h2>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Semester:</strong> {semester}</p>
      <p><strong>CAE:</strong> {cae}</p>
      <p><strong>Total Students:</strong> {total}</p>
      <p><strong>Passed:</strong> {pass}</p>
      <p><strong>Failed:</strong> {fail}</p>
    </div>
  );
}

export default Analysis;
