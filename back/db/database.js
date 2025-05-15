const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./barrierfree.db');

// db.serialize(() => {
//   db.run(`
//     CREATE TABLE IF NOT EXISTS travel_preferences (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       user_id TEXT,
//       disability_type TEXT,
//       travel_type TEXT,
//       destination TEXT
//     )
//   `);
// });

module.exports = db;