import React, { useState } from 'react';
import axios from 'axios';
import './Weekday.css'

function Weekday() {
  const [selectedDay, setSelectedDay] = useState(''); 
  const [suggestedColorforweekday, setSuggestedColorforweekday] = useState('');
  const [error, setError] = useState(null);

  const suggestColorsforweekday = () => {
    axios.post('http://localhost:3000/api/suggest-colors-weekday', { selectedDay: selectedDay }) 
      .then(response => {
        const suggestedColorforweekday = response.data.suggestedColorforweekday;
        setSuggestedColorforweekday(suggestedColorforweekday);
        setError(null);
      })
      .catch(error => {
        setError(error.response.data.message || 'An error occurred');
        setSuggestedColorforweekday('');
      });
  };

  return (
    <div className='weekday-container'>
      <h3>Choose the dress color based on your Weekdays</h3>
      <h2>The Weekdays are:</h2>
      <div className='radio-container'>
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Monday"
          checked={selectedDay === 'Monday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Monday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Tuesday"
          checked={selectedDay === 'Tuesday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Tuesday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Wednesday"
          checked={selectedDay === 'Wednesday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Wednesday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Thursday"
          checked={selectedDay === 'Thursday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Thursday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Friday"
          checked={selectedDay === 'Friday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Friday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Saturday"
          checked={selectedDay === 'Saturday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Saturday
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="selectedDay"
          value="Sunday"
          checked={selectedDay === 'Sunday'}
          onChange={(e) => setSelectedDay(e.target.value)}
        />
        Sunday
      </label>
      </div>
      <br />
      
      <button onClick={suggestColorsforweekday}>Suggest Colors</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Suggested Dress Color:</h2>
      <p className="suggested-color">{suggestedColorforweekday}</p>
    </div>
  );
}

export default Weekday;