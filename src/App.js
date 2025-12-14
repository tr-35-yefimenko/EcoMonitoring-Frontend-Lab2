import React, { useState, useEffect } from 'react';
import DataTable from './DataTable';
import EcoTaxCalculator from './EcoTaxCalculator';

function App() {
  const [data, setData] = useState([]);
  const [view, setView] = useState('monitor'); // 'monitor' або 'calculator'

  useEffect(() => {
    fetch('/api/measurements')
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <header style={{ backgroundColor: '#2E8B57', padding: '20px', color: 'white', textAlign: 'center' }}>
        <h1>Еко система</h1>
        <div>
          <button onClick={() => setView('monitor')} style={{ marginRight: '10px' }}>Моніторинг (Лаб 2)</button>
          <button onClick={() => setView('calculator')}>Еко калькулятор (Лаб 3)</button>
        </div>
      </header>
      
      <main>
        {view === 'monitor' ? (
          <DataTable data={data} />
        ) : (
          <EcoTaxCalculator />
        )}
      </main>
    </div>
  );
}

export default App;