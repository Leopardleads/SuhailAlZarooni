import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AccountDetails.css';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons'
const AccountDetails = ({setActiveStep}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Save token or user data if needed
        // localStorage.setItem('token', data.token);
        navigate('/admindashboard'); // Navigate to the dashboard
      } else {
        notification.error(data.message || 'Login failed. Please try again.')
        // setError();
      }
    } catch (error) {
      notification.error( 'An error occurred. Please try again.')
      setError('');
    }
  };

  return (
<div class="containerAccount">

<form action="#" className='formDiv'>
            <div class="user_details">
                <div class="input_box">
                    <label for="name">First Name</label>
                    <input type="text" id="name" placeholder="Enter your name" required/>
                </div>
                <div class="input_box">
                    <label for="username">Last Name</label>
                    <input type="text" id="username" placeholder="Enter your username" required/>
                </div>
                <div class="input_box">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Enter your email" required/>
                </div>
                <div class="input_box">
                    <label for="phone">Profile Image</label>
                    <input type="file" className='image' id="phone" placeholder="Enter your number" required/>
                </div>
                <div class="input_box">
                    <label for="pass">Password</label>
                    <input type="password" id="pass" placeholder="Enter your password" required/>
                </div>
                <div class="input_box">
                    <label for="confirmPass">Confirm Password</label>
                    <input type="password" id="confirmPass" placeholder="Confirm your password" required/>
                </div>
                <div class="input_box">
                    <label for="email">Occuption</label>
                    <input type="email" id="email" placeholder="Enter your email" required/>
                </div>
                <div class="input_box">
                    <label for="phone">Description</label>
                    <textarea id="w3review" name="w3review" rows="4" cols="50"/>
                </div>
            </div>
          
            <div class="reg_btn">
            <div className='flexBoxButton'> 
                  <input type="submit" value="Next" className='' onClick={()=>setActiveStep(1)}/>
                </div>
		         </div>
        </form>
		
		
</div>
  );
};

export default AccountDetails;
