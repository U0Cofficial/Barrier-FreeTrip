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
당신은 장애인 친화 여행 일정을 전문으로 설계하는 AI입니다. 아래 조건을 기반으로 **신뢰할 수 있는 장소와 정보를 바탕으로** 여행 일정을 추천해 주세요.

각 조건을 고려하여 **실제 존재하는 장소명을 중심으로**, 장애인 접근성이 좋은 여행지를 제안하고, 그 이유도 설명해 주세요.

여행 조건:
- 장애 유형: ${disabilityType}
- 희망 지역: ${destination}
- 무장애 옵션: ${barrierFreeOptions.join(", ")}
- 이동 수단: ${transportOptions.join(", ")}
- 여행 유형: ${travelType}
- 여행 기간: ${startDate} ~ ${endDate}

요구 형식 (JSON 형태로만 응답하세요):
{
  "title": "추천 여행지 이름 (실제 존재하는 장소)",
  "description": "이 여행지는 어떤 곳이며, 왜 장애인에게 적합한지 설명해주세요.",
  "period": "추천 일정 기간 또는 추천 일수",
  "transportRecommendation": "이 조건에 적합한 이동 수단 추천 (예: 장애인 택시, KTX 등)",
  "access": {
    "장애인 화장실": true | false,
    "장애인 주차장": true | false,
    "휠체어 접근성": true | false
  }
}
※ 반드시 JSON 형식으로만 답변하세요. 설명은 description 필드 내에서만 작성해주세요.
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;

    let result;
    try {
      result = JSON.parse(reply); // GPT 응답이 JSON이라면
    } catch (err) {

  res.status(500).json({ error: "OpenAI 요청 실패", detail: err.response?.data || err.message });
    }

    // DB 저장 (선택적)
 db.run(
  `INSERT INTO travel_recommendations 
    (user_id, title, description, period, transport_recommendation, access_info, input_json, created_at)
   VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
  [
    userId,
    result.title,
    result.description,
    result.period,
    result.transport_recommendation,
    JSON.stringify(result.access),
    JSON.stringify(req.body)
  ],
  function (err) {
    if (err) {
      console.error("DB 저장 실패:", err.message);
      return res.status(500).json({ error: "DB 저장 실패" });
    }
    res.status(200).json({
      message: "추천 성공",
      recommendation: result,
      dbId: this.lastID,
    });
  }
);
  } catch (err) {
    console.error("OpenAI 오류:", err.response?.data || err.message);
    res.status(500).json({ error: "OpenAI 요청 실패" });
  }
};