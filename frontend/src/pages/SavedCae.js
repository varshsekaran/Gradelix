import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SavedCae() {
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/saved-cae')
      .then(res => setSavedAnalyses(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLoad = (item) => {
    navigate('/analysis', { state: item });
  };

  return (
    <div className="savedcae-container" style={{ padding: '2rem' }}>
      <h2>Saved CAE Analyses</h2>
      {savedAnalyses.length === 0 ? (
        <p>No saved analyses found.</p>
      ) : (
        savedAnalyses.map(item => (
          <button
            key={item._id}
            onClick={() => handleLoad(item)}
            style={{
              display: 'block',
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#eee',
              border: '1px solid #ccc',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            {item.name}
          </button>
        ))
      )}
    </div>
  );
}

export default SavedCae;
