import React, { useState, useEffect } from 'react';

const EcoTaxCalculator = () => {
    const [formData, setFormData] = useState({
        pollutant: 'SO2',
        mass: '',
        rate: '',
        kTime: 1,
        kRegion: 1,
        kBenefit: 1
    });
    const [history, setHistory] = useState([]);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = () => {
        fetch('http://localhost:3000/api/ecotax')
            .then(res => res.json())
            .then(data => {
                // ПЕРЕВІРКА: Якщо прийшов масив — зберігаємо, якщо ні — робимо пустий список
                if (Array.isArray(data)) {
                    setHistory(data);
                } else {
                    console.log("Отримано не масив, а:", data);
                    setHistory([]); 
                }
            })
            .catch(err => {
                console.error(err);
                setHistory([]);
            });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/api/ecotax/calculate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert('Помилка сервера: ' + data.error);
            } else {
                fetchHistory();
                alert('Розрахунок успішний!');
            }
        })
        .catch(err => alert('Помилка з\'єднання з сервером.'));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Калькулятор екологічного податку (варіант 3)</h2>
            
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px' }}>
                <div>
                    <label>Речовина: </label>
                    <input name="pollutant" value={formData.pollutant} onChange={handleChange} />
                </div>
                <div>
                    <label>Маса викиду (т): </label>
                    <input type="number" name="mass" value={formData.mass} onChange={handleChange} required />
                </div>
                <div>
                    <label>Ставка податку (грн/т): </label>
                    <input type="number" name="rate" value={formData.rate} onChange={handleChange} required />
                </div>
                <div>
                    <label>К_часу (коефіцієнт): </label>
                    <input type="number" step="0.1" name="kTime" value={formData.kTime} onChange={handleChange} />
                </div>
                <div>
                    <label>К_регіону (коефіцієнт): </label>
                    <input type="number" step="0.1" name="kRegion" value={formData.kRegion} onChange={handleChange} />
                </div>
                <div>
                    <label>К_пільги (коефіцієнт): </label>
                    <input type="number" step="0.1" name="kBenefit" value={formData.kBenefit} onChange={handleChange} />
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Розрахувати</button>
            </form>

            <h3>Історія розрахунків</h3>
            <table border="1" cellPadding="5" style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Речовина</th>
                        <th>Маса</th>
                        <th>Сума податку (грн)</th>
                        <th>Дата</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(history) && history.length > 0 ? (
                        history.map((item) => (
                            <tr key={item._id || Math.random()}>
                                <td>{item.pollutant}</td>
                                <td>{item.mass}</td>
                                <td>{item.taxAmount ? item.taxAmount.toFixed(2) : '-'}</td>
                                <td>{item.date ? new Date(item.date).toLocaleString() : '-'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" style={{textAlign: 'center'}}>Історія порожня</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EcoTaxCalculator;