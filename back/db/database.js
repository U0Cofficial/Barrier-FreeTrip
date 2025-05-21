const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./barrierfree.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      username TEXT UNIQUE,
      password TEXT
    );
  `);



db.run(`
  CREATE TABLE IF NOT EXISTS travel_recommendations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    title TEXT,
    description TEXT,
    period TEXT,
    transport_recommendation TEXT,
    access_info TEXT,
    input_json TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`);
});

module.exports = db;