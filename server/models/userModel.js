const db = require('../db');

// Create a new user
exports.create = (user) => {
  const query = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
  return db.run(query, [user.id, user.name, user.email, user.password]);
};

// Find user by email
exports.findByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM users WHERE email = ?`;
    db.get(query, [email], (err, row) => {
      if (err) reject(err);
      resolve(row);
    });
  });
};
