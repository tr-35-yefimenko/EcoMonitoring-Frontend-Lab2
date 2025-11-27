import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/measurements')
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <header style={{ backgroundColor: '#2E8B57', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>🌿 Система екомоніторингу</h1>
      </header>
      <main>
        <DataTable data={data} />
      </main>
    </div>
  );
}

export default App;