import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';
import Button from '../components/Button';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks(token);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks', error);
      }
    };
    fetchTasks();
  }, [token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, status };
      const response = await createTask(newTask, token);
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleEdit = (task) => {
    setEditMode(true);
    setCurrentTask(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { title, description, status };
      const response = await updateTask(currentTask, updatedTask, token);
      setTasks(tasks.map(task => (task.id === currentTask ? response.data : task)));
      setEditMode(false);
      setTitle('');
      setDescription('');
      setStatus('');
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  const handleProfileEdit = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  return (
    <div className={styles.dashboard}>
      <Button type="button" onClick={handleProfileEdit} className={styles.editProfileButton}>
        Edit Profile
      </Button>
      <h2>Task Dashboard</h2>
      <form onSubmit={editMode ? handleUpdateTask : handleCreateTask} className={styles.form}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className={styles.input}
        ></textarea>
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className={styles.select} 
          required
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <Button type="submit">{editMode ? 'Update Task' : 'Create Task'}</Button>
      </form>

      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <Button onClick={() => handleEdit(task)}>Edit</Button>
            <Button onClick={() => handleDelete(task.id)} className={styles.deleteButton}>
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
