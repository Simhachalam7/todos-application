const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, './database/todo.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
    process.exit(1);  // Exit if there’s an issue with the database
  } else {
    console.log('Connected to the SQLite database.');

    // Create the users table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
      )`, (err) => {
      if (err) {
        console.error('Error creating users table:', err.message);
      }
    });

    // Create the tasks table if it doesn't exist
    db.run(`
      CREATE TABLE IF NOT EXISTS tasks (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT,
        user_id TEXT NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id)
      )`, (err) => {
      if (err) {
        console.error('Error creating tasks table:', err.message);
      }
    });
  }
});

module.exports = db;
