import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser,faLock } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
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
<div class="containerLogin">
	<div class="screen">
		<div class="screen__content">
			<form class="login">
				<div class="login__field">
			
        <FontAwesomeIcon icon={faUser}  class="login__icon " width={16} height={16}/>
					<input type="text" class="login__input" placeholder=" Email" onChange={(e)=>setEmail(e.target.value)}/>
				</div>
				<div class="login__field">
					<i class="login__icon fas fa-lock"></i>
          <FontAwesomeIcon icon={faLock}  class="login__icon " width={16} height={16}/>
					<input type="password" class="login__input" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
				</div>
				<button class="button login__submit" onClick={handleLogin}>
					<span class="button__text">Log In Now</span>
					<i class="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
		
		</div>
		<div class="screen__background">
			<span class="screen__background__shape screen__background__shape4"></span>
			<span class="screen__background__shape screen__background__shape3"></span>		
			<span class="screen__background__shape screen__background__shape2"></span>
			<span class="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
  );
};

export default Login;
