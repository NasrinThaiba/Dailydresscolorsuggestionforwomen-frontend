import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom';
import './Login.css'

const Login = ({setToken}) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/login', formData);
            const { token } = response.data;
            setToken(token); 
            localStorage.setItem('token', token);
            navigate('/home')
        } catch (error) {
            console.error(error.response.data.message);
        }
    }
  return (
    
  <div className="login">
    <h2>LOGIN</h2>
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor='email'><strong>Email:</strong></label>
            <input
                type='email'
                id='email'
                name='email'
                onChange={handleChange}
                value={formData.username}
                required
            ></input>
        </div>
        <div className="form-group">
            <label htmlFor='password'><strong>Password:</strong></label>
            <input
                type='password'
                id='password'
                name='password'
                onChange={handleChange}
                value={formData.password}
                required
            ></input>
        </div>
        <br></br>
        <button type="submit">Login</button>
    </form>
    <br></br>
    <p>Create New Account</p>
    <Link to='/'><button>Sign Up</button></Link>
</div>

  )
}

export default Login