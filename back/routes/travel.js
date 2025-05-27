const express = require("express");
const router = express.Router();
const db = require("../db/database");
const {
  getTravelRecommendation,
  getUserRecommendations,
} = require("../controllers/travelController");

router.post("/recommend", getTravelRecommendation);

router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const result = await db.query(
      `SELECT id, title, description, period, transport_recommendation, access_info, created_at 
       FROM travel_recommendations 
       WHERE user_id = $1 
       ORDER BY created_at DESC`,
      [userId]
    );

    const formatted = result.rows.map((row) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      period: row.period,
      transportRecommendation: row.transport_recommendation,
      access: row.access_info,
      created_at: row.created_at,
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error("DB 오류:", err.message);
    res.status(500).json({ error: "DB 조회 실패" });
  }
});

module.exports = router;
