import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';  // API call for login
import Button from '../components/Button';  // Reusable button component
import styles from '../styles/Form.module.css';  // Form styles

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      localStorage.setItem('token', response.data.token);  // Store JWT token in localStorage
      navigate('/dashboard');  // Redirect to Dashboard
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
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
      <Button onClick={() => navigate('/signup')}>Sign Up</Button>
    </div>
  );
};

export default Login;
