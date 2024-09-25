const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { verifyToken } = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Public routes
app.use('/api/users', userRoutes);

// Protected routes
app.use('/api/tasks', verifyToken, taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
