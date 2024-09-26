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

  // Fetch tasks on component load
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

  // Handle Create Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = { title, description, status };
      const response = await createTask(newTask, token);
      setTasks([...tasks, response.data]);
      resetForm(); // Reset form after creating task
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  // Handle Edit Task
  const handleEdit = (task) => {
    setEditMode(true);
    setCurrentTask(task.id);
    setTitle(task.title);  // Populate form fields with selected task details
    setDescription(task.description);
    setStatus(task.status);
  };

  // Handle Update Task
  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const updatedTask = { title, description, status };
      const response = await updateTask(currentTask, updatedTask, token);
      setTasks(tasks.map(task => (task.id === currentTask ? response.data : task)));  // Update task in state
      resetForm(); // Reset form after updating task
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  // Reset the form fields and edit state
  const resetForm = () => {
    setEditMode(false);
    setTitle('');
    setDescription('');
    setStatus('');
  };

  // Handle Delete Task
  const handleDelete = async (taskId) => {
    try {
      await deleteTask(taskId, token);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task', error);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear JWT token from localStorage
    navigate('/login');  // Redirect to login page
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <Button type="button" onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </Button>
      </div>

      <h2>Task Dashboard</h2>

      {/* Task Form for Create/Update */}
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
          <option value="" disabled>Select Status</option>
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <Button type="submit">{editMode ? 'Update Task' : 'Create Task'}</Button>
      </form>

      {/* Task List */}
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
