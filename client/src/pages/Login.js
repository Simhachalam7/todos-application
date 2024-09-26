import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { login } from '../services/api'; // Import login API call
import Button from '../components/Button';
import styles from '../styles/Form.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Get navigate function to redirect the user

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      // Call the login API with email and password
      const response = await login({ email, password });
      
      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Navigate to dashboard after successful login
      navigate('/dashboard'); // Redirect to Dashboard after login
    } catch (error) {
      setMessage('Login failed. Please check your credentials.'); // Display error message
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <Button type="submit">Login</Button>
        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
