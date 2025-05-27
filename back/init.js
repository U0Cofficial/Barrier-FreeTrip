const db = require("./db/database");

async function init() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS travel_recommendations (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        title TEXT,
        description TEXT,
        period TEXT,
        transport_recommendation TEXT,
        access_info JSONB,
        input_json JSONB,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await db.query(`
      CREATE TABLE IF NOT EXISTS community_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        tags TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("✅ 모든 테이블 생성 완료!");
    process.exit();
  } catch (err) {
    console.error("❌ 테이블 생성 실패:", err.message);
    process.exit(1);
  }
}

init();