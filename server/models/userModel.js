const db = require('../db');

// Create user in the database
exports.create = (user) => {
  const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
  return db.run(query, [user.id, user.name, user.email, user.password]);
};

// Find user by email
exports.findByEmail = (email) => {
  return db.get(`SELECT * FROM users WHERE email = ?`, [email]);
};

// Find user by ID
exports.findById = (id) => {
  return db.get(`SELECT * FROM users WHERE id = ?`, [id]);
};

// Update user profile
exports.update = (id, user) => {
  const query = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  return db.run(query, [user.name, user.email, user.password, id]);
};
