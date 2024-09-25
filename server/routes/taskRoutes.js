const express = require('express');
const {
    createTask,
    getTasks,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const router = express.Router();

// CRUD operations for tasks
router.post('/', createTask);
router.get('/', getTasks);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
