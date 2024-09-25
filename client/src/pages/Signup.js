import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import styles from '../styles/Form.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await signup({ name, email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setMessage('Signup failed. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
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
        <Button type="submit">Signup</Button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
