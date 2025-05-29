require("dotenv").config();
const OpenAI = require("openai");
const db = require("../db/database");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

console.log("✅ OPENAI_API_KEY:", process.env.OPENAI_API_KEY?.slice(0, 10));
console.log("✅ OPENAI_PROJECT_ID:", process.env.OPENAI_PROJECT_ID);

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
    "description": "여행지에 대한 설명과 왜 이곳이 적합한지 3문장으로 설명",
    "transportRecommendation": "추천 이동 수단과 그 이유를 간략하게 설명",
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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;

    let result;
    try {
      result = JSON.parse(reply);
    } catch (err) {
      return res.status(500).json({ error: "OpenAI 응답 파싱 실패", raw: reply });
    }

    for (const plan of result) {
      await db.query(
        `INSERT INTO travel_recommendations 
         (user_id, title, description, period, transport_recommendation, access_info, input_json, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
        [
          userId,
          plan.title,
          plan.description,
          plan.date,
          plan.transportRecommendation,
          JSON.stringify(plan.access),
          JSON.stringify(req.body)
        ]
      );
    }

    res.status(200).json({
      message: "추천 성공",
      recommendation: result
    });
  } catch (err) {
    console.error("OpenAI 오류:", err.response?.data || err.message);
    res.status(500).json({ error: "OpenAI 요청 실패" });
  }
};

exports.getUserRecommendations = async (req, res) => {
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
    console.error("DB 조회 실패:", err.message);
    res.status(500).json({ error: "DB 조회 실패" });
  }
};