import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../services/api';
import Button from '../components/Button';
import styles from '../styles/Profile.module.css';

const Profile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile(token);
        setName(response.data.name);
        setEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, [token]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const updatedProfile = { name, email, password };
      const response = await updateProfile(updatedProfile, token);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error updating profile', error);
      setMessage('Update failed. Try again.');
    }
  };

  const back = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className={styles.profileContainer}>
      <h2>User Profile</h2>
      <form onSubmit={handleUpdateProfile} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
        />
        <Button type="submit">Update Profile</Button>
      </form>
      <Button type="button" onClick={back}>Back</Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Profile;
