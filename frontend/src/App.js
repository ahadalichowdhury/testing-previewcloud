import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [backendMessage, setBackendMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use API_URL from environment or default
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
    
    fetch(`${apiUrl}/hello`)
      .then(response => response.json())
      .then(data => {
        setBackendMessage(data.message);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello ahad ali from previewcloud</h1>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: '#ff6b6b' }}>Error: {error}</p>}
        {backendMessage && <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>{backendMessage}</p>}
      </header>
    </div>
  );
}

export default App;

