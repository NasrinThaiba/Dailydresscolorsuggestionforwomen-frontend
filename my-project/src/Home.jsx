import React from 'react'
import { Link } from 'react-router-dom'
import Skintype from './Homecontent/Skintype'
import Weatherdata from './Homecontent/Weatherdata'
import Specialday from './Homecontent/Specialday'
import Weekday from './Homecontent/Weekday'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <h3>Welcome to Dress Colour Suggestion Page</h3>
      <h2>Select your dress colour based on these requirement</h2>
      <Link to="/home/skintype"><button><strong>Skin Type</strong></button></Link><br></br>
      <Link to="/home/weekday"><button><strong>WeekDays</strong></button></Link><br></br>
      <Link to="/home/weatherdata"><button><strong>Weather Data</strong></button></Link><br></br>
      <Link to="/home/specialday"><button><strong>Special Days</strong></button></Link><br></br>
    
    </div>
  )
}

export default Home;