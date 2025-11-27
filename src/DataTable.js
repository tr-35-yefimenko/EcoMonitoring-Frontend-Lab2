import React from 'react';

const DataTable = ({ data }) => {
  if (!data.length) return <div style={{ padding: '20px' }}>Завантаження...</div>;

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  };

  const thStyle = {
    backgroundColor: '#2E8B57',
    color: '#fff',
    padding: '12px',
    textAlign: 'left'
  };

  const tdStyle = {
    padding: '10px',
    borderBottom: '1px solid #ddd'
  };

  return (
    <div style={{ padding: '0 20px' }}>
      <h2 style={{ color: '#2E8B57' }}>Екологічні показники</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Місто</th>
            <th style={thStyle}>Станція</th>
            <th style={thStyle}>Значення</th>
            <th style={thStyle}>Тип</th>
            <th style={thStyle}>Дата</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td style={tdStyle}>{item.city}</td>
              <td style={tdStyle}>{item.stationId}</td>
              <td style={tdStyle}>
                <span style={{ color: item.value > 50 ? 'red' : 'green', fontWeight: 'bold' }}>
                  {item.value}
                </span>
              </td>
              <td style={tdStyle}>{item.type}</td>
              <td style={tdStyle}>
                {new Date(item.measuredAt).toLocaleString('uk-UA')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;