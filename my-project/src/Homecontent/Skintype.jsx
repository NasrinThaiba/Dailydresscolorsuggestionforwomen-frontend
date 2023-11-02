import React, { useState } from 'react';
import axios from 'axios';
import './Skintype.css'

function Skintype() {
  const [skinTone, setSkinTone] = useState('');
  const [suggestedColorsforskin, setSuggestedColorsforskin] = useState([]);
  const [error, setError] = useState(null);

  const suggestColorsskin = () => {
    axios
      .post('http://localhost:3000/api/suggest-colors-skintype', { skinTone })
      .then((response) => {
        const suggestedColorsforskin = response.data.suggestedColorsforskin;
        setSuggestedColorsforskin(suggestedColorsforskin);
        setError(null);
      })
      .catch((error) => {
        setError(error.response.data.message || 'An error occurred');
        setSuggestedColorsforskin([]);
      });
  };

  return (
    <div className='skintype-container'>
      <h3>Choose the dress color based on your Skin Tone</h3>
      <h2>The Skin Tone are:</h2>
      <div className='radio-container'>
      <label>
        <input
          type="radio"
          name="skinTone"
          value="fair"
          checked={skinTone === 'fair'}
          onChange={(e) => setSkinTone(e.target.value)}
        />
        Fair
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="skinTone"
          value="medium"
          checked={skinTone === 'medium'}
          onChange={(e) => setSkinTone(e.target.value)}
        />
        Medium
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="skinTone"
          value="dark"
          checked={skinTone === 'dark'}
          onChange={(e) => setSkinTone(e.target.value)}
        />
        Dark
      </label>
      </div>
      <br />
      <button onClick={suggestColorsskin}>Suggest Colors</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Suggested Dress Colors:</h2>
      <ul className='suggested-dress-skin'>
        {suggestedColorsforskin.map((color, index) => (
          <li key={index}>{color}</li>
        ))}
      </ul>
    </div>
  );
}

export default Skintype;