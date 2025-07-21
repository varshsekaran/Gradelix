import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

import './Analysis.css';

function Analysis() {
  const navigate = useNavigate();
  const location = useLocation();
  const { year, semester, cae, mode, subjectStats } = location.state || {};

  let totalPass = 0;
  let totalStudents = 0;

  if (subjectStats) {
    Object.entries(subjectStats).forEach(([subject, stats]) => {
      totalPass += Number(stats.pass);
      totalStudents += Number(stats.total);
    });
  }

  const overallPercentage = totalStudents > 0
    ? ((totalPass / totalStudents) * 100).toFixed(2)
    : '0.00';

   const [saveName, setSaveName] = useState('');

  

const handleSave = async () => {
  try {
    await axios.post('http://localhost:5000/api/save-cae', {
      name: saveName,
      year,
      semester,
      cae,
      mode,
      subjectStats,
      overallPercentage,
    });

    alert('Analysis saved successfully!');
    navigate('/saved-cae');
  } catch (err) {
    console.error(err);
    alert('Failed to save analysis');
  }
};

  return (
    <div className="analysis-container">
      <h2>Analysis - {mode?.toUpperCase()}</h2>
      <p>
        <strong>Year:</strong> {year} | <strong>Semester:</strong> {semester}{' '}
        {mode === 'cae' && <>| <strong>CAE:</strong> {cae}</>}
      </p>

      <div className="table-wrapper">
        <table className="analysis-table">
          <thead>
            <tr>
              <th>Subject Code</th>
              <th>Total</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Fail</th>
              <th>Pass</th>
              <th>Percentage (%)</th>
            </tr>
          </thead>
          <tbody>
            {subjectStats && Object.keys(subjectStats).length > 0 ? (
              Object.entries(subjectStats).map(([subject, stats]) => (
                <tr key={subject}>
                  <td>{subject}</td>
                  <td>{stats.total}</td>
                  <td>{stats.present}</td>
                  <td>{stats.absent}</td>
                  <td>{stats.fail}</td>
                  <td>{stats.pass}</td>
                  <td>{stats.percentage}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Show this outside table-wrapper but inside scroll container */}
      {totalStudents > 0 && (
        <div style={{
          marginTop: '2rem',
          fontWeight: 'bold',
          fontSize: '18px',
          padding: '12px',
          backgroundColor: '#f3f4f6',
          borderRadius: '8px',
          textAlign: 'center',
           border: '2px solid red'
        }}>
          Overall Pass Percentage: {overallPercentage}%
        </div>
      )}
      {mode === 'cae' && (
  <div style={{ marginTop: '1rem', textAlign: 'center' }}>
    <input
      type="text"
      placeholder="Enter analysis name"
      value={saveName}
      onChange={(e) => setSaveName(e.target.value)}
      style={{ marginRight: '1rem', padding: '8px' }}
    />
    <button onClick={handleSave} style={{ padding: '8px 12px', backgroundColor: '#800033', color: '#fff' }}>
      Save As
    </button>
  </div>
)}

    </div>
  );
}

export default Analysis;
