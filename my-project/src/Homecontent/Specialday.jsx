import React, { useState } from 'react';
import axios from 'axios';
import './Specialday.css'

function Specialday() {
  const [selectedDay, setSelectedDay] = useState(''); 
  const [suggestedColorforspecialday, setSuggestedColorforspecialday] = useState('');
  const [error, setError] = useState(null);

  const suggestColorsforspecial = () => {
    axios.post('http://localhost:3000/api/suggest-colors-specialday', { selectedDay: selectedDay }) 
      .then(response => {
        const suggestedColorforspecialday = response.data.suggestedColorforspecialday;
        setSuggestedColorforspecialday(suggestedColorforspecialday);
        setError(null);
      })
      .catch(error => {
        setError(error.response.data.message || 'An error occurred');
        setSuggestedColorforspecialday('');
      });
  };

  return (
    <div className='specialday-container'>
      <h3>Choose the dress color based on your Special Days</h3>
      <h2>The Special Days are:</h2>
      <div className='radio-container'>
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Christmas"
          checked={selectedDay === 'Christmas'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Christmas
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Pongal"
          checked={selectedDay === 'Pongal'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Pongal
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Diwali"
          checked={selectedDay === 'Diwali'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Diwali
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Bakrid"
          checked={selectedDay === 'Bakrid'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Bakrid
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Ramzan"
          checked={selectedDay === 'Ramzan'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Ramzan
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Thanksgiving"
          checked={selectedDay === 'Thanksgiving'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Thanksgiving
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Valentine"
          checked={selectedDay === 'Valentine'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Valentine
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Easter"
          checked={selectedDay === 'Easter'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Easter
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Halloween"
          checked={selectedDay === 'Halloween'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Halloween
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="NewYear"
          checked={selectedDay === 'NewYear'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        NewYear
      </label>
      </div>
      <br />
      
      <button onClick={suggestColorsforspecial}>Suggest Colors</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Suggested Dress Color:</h2>
      <p className="suggested-color1" >{suggestedColorforspecialday}</p>
    </div>
  );
}

export default Specialday