import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Home from './Home'
import Skintype from './Homecontent/Skintype'
import Weatherdata from './Homecontent/Weatherdata'
import Specialday from './Homecontent/Specialday'
import Weekday from './Homecontent/Weekday'

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
  }

  return (
    <Router>
      <div className='App-container'>
        <header>
          <h1>Daily Dress Colour Suggestion for Women</h1>
          {token && <button onClick={logout} className="logout-button">Logout</button>}
        </header>
        <main>
        <Routes>
            <Route path="/" element={<Register />} />
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/home" element={token ? <Home /> : <Navigate to='/login' />} />
            <Route path="/home/skintype" element={<Skintype />} />
            <Route path="/home/weekday" element={<Weekday />} />
            <Route path="/home/weatherdata" element={<Weatherdata />} />
            <Route path="/home/specialday" element={<Specialday />} />           
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
