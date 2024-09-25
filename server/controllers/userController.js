const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');

// Signup function
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: uuidv4(), name, email, password: hashedPassword };

  try {
    await User.create(user);
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

// Login function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  const user = await User.findByEmail(email);
  console.log('User found:', user);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  console.log('Password valid:', isPasswordValid);

  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
  res.json({ token });
};

// Get user profile
exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

// Update user profile
exports.updateProfile = async (req, res) => {
  const { name, email, password } = req.body;
  const updatedUser = { name, email };

  if (password) {
    updatedUser.password = await bcrypt.hash(password, 10);
  }

  await User.update(req.user.id, updatedUser);
  res.json({ message: 'Profile updated successfully' });
};
