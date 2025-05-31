// Express 모듈 및 라우터 객체 생성
const express = require("express");
const router = express.Router();

// SQLite 데이터베이스 연결
const db = require("../db/database");

// 여행 추천 관련 컨트롤러 함수 가져오기
const {
  getTravelRecommendation,
  getUserRecommendations,
} = require("../controllers/travelController");

// 여행 추천 요청 처리 (POST /api/travel/recommend)
// 클라이언트로부터 여행 추천 요청을 받아 처리하는 라우트
router.post("/recommend", getTravelRecommendation);

// 사용자별 여행 추천 목록 조회 (GET /api/travel/user/:userId)
// 특정 사용자의 여행 추천 목록을 데이터베이스에서 조회하여 반환하는 라우트
router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;

  // DB에서 해당 사용자(userId)의 추천 목록 조회
  // travel_recommendations 테이블에서 user_id가 일치하는 모든 추천 정보를
  // 생성일자(created_at) 내림차순으로 정렬하여 가져옴
  db.all(
    `SELECT id, title, description, period, transport_recommendation, access_info, created_at 
     FROM travel_recommendations 
     WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        // DB 조회 실패 시 에러 로그 및 응답
        console.error("DB 오류:", err.message);
        return res.status(500).json({ error: "DB 조회 실패" });
      }

      // 조회된 각 추천 항목의 access_info 필드는 JSON 문자열로 저장되어 있으므로
      // 이를 JavaScript 객체로 파싱하여 포함시킴
      const formatted = rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        period: row.period,
        transportRecommendation: row.transport_recommendation,
        access: JSON.parse(row.access_info || "{}"),
        created_at: row.created_at,
      }));

      // 최종적으로 변환된 추천 목록 데이터를 클라이언트에 JSON 형태로 응답
      res.status(200).json(formatted);
    }
  );
});

// 라우터 모듈 내보내기
module.exports = router;
