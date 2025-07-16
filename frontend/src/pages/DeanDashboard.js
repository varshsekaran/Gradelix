import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './DeanDashboard.css';

function DeanDashboard() {
  const [year, setYear] = useState('2025');
  const [semester, setSemester] = useState('1');
  const [cae, setCae] = useState('1');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleAnalyse = () => {
    if (!file) {
      alert("Please upload a file");
      console.log("No file selected");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);

      let total = data.length;
      let pass = 0;
      let fail = 0;

      data.forEach((row) => {
  let passed = true;

  Object.keys(row).forEach((key) => {
    const header = key.trim().toUpperCase(); 
    if (header !== 'REG NO' && key !== 'NAME OF THE STUDENT') {
      const value = row[key];

      if (
        value === 'A' || 
        value === 'a' || 
        value === '-' || 
        value === '' || 
        value == null || 
        isNaN(value) || 
        parseInt(value) < 25
      ) {
        passed = false;
      }
    }
  });

  if (passed) pass++;
  else fail++;
});


      // Redirect to result page with state
      navigate('/Analysis', {
        state: {
          year,
          semester,
          cae,
          total,
          pass,
          fail
        }
      });
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="hod-dashboard-wrapper">
      <div className="hod-dashboard-card">
        <h1 className="hod-dashboard-title">Dean Dashboard</h1>

        <div className="hod-dashboard-form">
          <label>Enter year</label>
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} className="hod-input" />

          <label>Enter semester</label>
          <input type="text" value={semester} onChange={(e) => setSemester(e.target.value)} className="hod-input" />

          <label>Enter CAE</label>
          <input type="text" value={cae} onChange={(e) => setCae(e.target.value)} className="hod-input" />

          <label>Upload file</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="hod-input" />

          <button onClick={handleAnalyse} className="hod-button">Analyse</button>
        </div>
      </div>
    </div>
  );
}

export default DeanDashboard;
