import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate, Link} from 'react-router-dom';
import './Register.css'

const Register = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/register', formData);
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    }
  return (
    
    <div className='register'> 
        <h2>REGISTER</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor='username'><strong>Username:</strong></label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    onChange={handleChange}
                    value={formData.username}
                    required
                ></input>
            </div>
            
            <div className="form-group">
                <label htmlFor='email'><strong>Email:</strong></label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={handleChange}
                    value={formData.email}
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

            <button type="submit">Register</button>
            </form>
            <div className="link">
            <p>Already have an Account? <Link to="/login">Login</Link></p>
        </div>    
        </div>    
    
  )
}

export default Register