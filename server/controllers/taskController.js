const { v4: uuidv4 } = require('uuid');
const db = require('../db');

// Create a new task
exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;
  const id = uuidv4();

  const query = `INSERT INTO tasks (id, title, description, status, user_id) VALUES (?, ?, ?, ?, ?)`;
  db.run(query, [id, title, description, status, userId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error creating task' });
    }
    res.status(201).json({ id, title, description, status, userId });
  });
};

// Get all tasks for authenticated user
exports.getTasks = (req, res) => {
  const userId = req.user.id;

  const query = `SELECT * FROM tasks WHERE user_id = ?`;
  db.all(query, [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching tasks' });
    }
    res.json(rows);
  });
};

// Update task
exports.updateTask = (req, res) => {
  const { title, description, status } = req.body;
  const taskId = req.params.id;

  const query = `UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?`;
  db.run(query, [title, description, status, taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating task' });
    }
    res.json({ message: 'Task updated successfully' });
  });
};

// Delete task
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;

  const query = `DELETE FROM tasks WHERE id = ?`;
  db.run(query, [taskId], function (err) {
    if (err) {
      return res.status(500).json({ error: 'Error deleting task' });
    }
    res.json({ message: 'Task deleted successfully' });
  });
};
