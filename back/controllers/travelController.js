const db = require("../db/database");
const { askOpenAI } = require("../utils/openaiClient");

exports.recommendTravel = async (req, res) => {
  const {
    userId,
    date,
    disabilityType,
    destination,
    barrierFreeOptions,
    transportOptions,
    travelType,
  } = req.body;

  const userPrompt = `
  여행 유형: ${travelType}
  여행 날짜: ${date}
  장애유형: ${disabilityType}
  여행지: ${destination}
  무장애 옵션: ${barrierFreeOptions.join(", ")}
  이동수단: ${transportOptions.join(", ")}

  위 조건에 맞는 국내 여행지를 1곳 추천해주고, 다음 항목을 포함해서 답해줘:
  - 여행지 이름
  - 여행지 소개
  - 장애인 주차장/화장실/숙소 접근성 정보
  `;

  try {
    const aiResponse = await askOpenAI(userPrompt);

    db.run(
      `INSERT INTO travel_recommendations (user_id, prompt, response) VALUES (?, ?, ?)`,
      [userId, userPrompt, aiResponse],
      function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ recommendation: aiResponse });
      }
    );
  } catch (e) {
    res.status(500).json({ error: "OpenAI API error" });
  }
};