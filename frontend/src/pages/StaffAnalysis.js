import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import './StaffAnalysis.css'


function StaffAnalysis() {
  const [analysis, setAnalysis] = useState([]);
   const [savedAnalysis, setSavedAnalysis] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: '' });

// Remove the first row where subject codes are misinterpreted
const cleanedData = jsonData.filter(row => {
  const values = Object.values(row).map(v => v.toString().toUpperCase());
  return !(values.includes('REGISTER NO') || values.includes('REG NO'));
});
    const response = await axios.get('http://localhost:5000/api/staff-subject');

    const staffSubjectMap = {};
    response.data.forEach(entry => {
      staffSubjectMap[entry['SUBJECT CODE'].trim()] = entry['STAFF NAME'].trim();
    });

    const result = {};

    jsonData.forEach(row => {
      for (const key in row) {
        if (key !== 'REGISTER NO' && key !== 'NAME') {
          const subjectCode = key.trim();
          const mark = parseFloat(row[key]);
          const staff = staffSubjectMap[subjectCode];
      if (!staff) continue;


          if (!result[staff]) {
            result[staff] = { total: 0, pass: 0, subjectCode };
          }
          if (!isNaN(mark)) {
        result[staff].total++;
     if (mark > 25) result[staff].pass++;
    }
  
      //result[staff].total++;
      //if (mark >= 50) result[staff].pass++;
    }
  }
});
    const finalData = Object.entries(result).map(([staff, { total, pass, subjectCode }]) => ({
      staff,
      subjectCode,
      pass,
      fail: total - pass,
      percentage: ((pass / total) * 100).toFixed(2) + '%',
    }));

    setAnalysis(finalData);
  
   
  };

  return (
    <div className="staffanalysis-container" style={{ padding: '20px' }}>
      <h2>Staff Subject-Wise Analysis</h2>
      

{savedAnalysis.length > 0 && (
  <div style={{ marginTop: '10px' }}>
    {savedAnalysis.map((item, idx) => (
      <button key={idx} style={{ margin: '5px' }}>
        {item.staff} ({item.subjectCode})
      </button>
    ))}
  </div>
)}
      <input type="file" onChange={handleFileUpload} accept=".xlsx, .xls" />

      {analysis.length > 0 && (
        <div className='stafftable-wrapper'>
        <table className="staffanalysis-table" border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Staff</th>
              <th>Subject Code</th>
              <th>Pass</th>
              <th>Fail</th>
              <th>Pass Percentage</th>
            </tr>
          </thead>
          <tbody>
            {analysis.map((item, idx) => (
              <tr key={idx}>
                <td>{item.staff}</td>
                <td>{item.subjectCode}</td>
                <td>{item.pass}</td>
                <td>{item.fail}</td>
                <td>{item.percentage}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );
}

export default StaffAnalysis;
