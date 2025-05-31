require("dotenv").config();
const OpenAI = require("openai");
const db = require("../db/database");

// OpenAI 인스턴스 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("✅ OPENAI_API_KEY:", process.env.OPENAI_API_KEY?.slice(0, 10));
console.log("✅ OPENAI_PROJECT_ID:", process.env.OPENAI_PROJECT_ID);

// 여행 추천 생성 API
exports.getTravelRecommendation = async (req, res) => {
  const {
    userId,
    disabilityType,
    destination,
    barrierFreeOptions,
    transportOptions,
    travelType,
    startDate,
    endDate,
  } = req.body;

  // OpenAI에게 보낼 프롬프트 작성
  const prompt = `
당신은 장애인 친화 여행 일정을 전문으로 설계하는 AI입니다.
아래 조건에 따라 **여행 기간 동안 하루에 하나의 여행지**를 추천해 주세요.
각 날짜마다 **실제 존재하는 장소**를 중심으로 장애인 접근성이 좋은 장소를 추천하고, 추천 이유도 간략히 설명해 주세요.

여행 조건:
- 장애 유형: ${disabilityType}
- 희망 지역: ${destination}
- 무장애 옵션: ${barrierFreeOptions.join(", ")}
- 이동 수단: ${transportOptions.join(", ")}
- 여행 유형: ${travelType}
- 여행 기간: ${startDate} ~ ${endDate}

응답 형식 (JSON 배열로만 응답하세요):
[
  {
    "date": "2025-05-01",
    "title": "여행지 이름",
    "description": "왜 이곳이 적합한지 설명",
    "transportRecommendation": "추천 이동 수단",
    "access": {
      "장애인 화장실": true | false,
      "장애인 주차장": true | false,
      "휠체어 접근성": true | false
    }
  },
  ...
]
※ 반드시 JSON 배열 형식으로만 응답하세요. 날짜별로 하루 하나의 여행지를 포함해야 합니다.
`;

  try {
    // OpenAI API 호출
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;

    let result;
    try {
      // OpenAI 응답 파싱
      result = JSON.parse(reply);
    } catch (err) {
      // JSON 파싱 실패 시 응답 원본 포함하여 에러 반환
      return res.status(500).json({ error: "OpenAI 응답 파싱 실패", raw: reply });
    }

    // DB에 추천 결과 저장
    const insertStmt = db.prepare(
      `INSERT INTO travel_recommendations 
        (user_id, title, description, period, transport_recommendation, access_info, input_json, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`
    );

    // 각 여행 일정별로 DB에 삽입
    for (const plan of result) {
      insertStmt.run(
        userId,
        plan.title,
        plan.description,
        plan.date,
        plan.transportRecommendation,
        JSON.stringify(plan.access),
        JSON.stringify(req.body)
      );
    }
    insertStmt.finalize(); // statement 종료

    // 클라이언트에 결과 응답
    res.status(200).json({
      message: "추천 성공",
      recommendation: result
    });
  } catch (err) {
    // OpenAI 요청 실패 처리
    console.error("OpenAI 오류:", err.response?.data || err.message);
    res.status(500).json({ error: "OpenAI 요청 실패" });
  }
};

// 사용자별 추천 내역 조회 API
exports.getUserRecommendations = (req, res) => {
  const userId = req.params.userId;

  // userId 기준으로 DB에서 추천 내역 조회
  db.all(
    `SELECT id, title, description, period, transport_recommendation, access_info, created_at 
     FROM travel_recommendations 
     WHERE user_id = ? 
     ORDER BY created_at DESC`,
    [userId],
    (err, rows) => {
      if (err) {
        console.error("DB 조회 실패:", err.message);
        return res.status(500).json({ error: "DB 조회 실패" });
      }

      // access_info는 문자열이므로 다시 JSON으로 변환
      const result = rows.map((row) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        period: row.period,
        transportRecommendation: row.transport_recommendation,
        access: JSON.parse(row.access_info || '{}'),
        created_at: row.created_at,
      }));

      // 클라이언트에 추천 내역 반환
      res.status(200).json(result);
    }
  );
};