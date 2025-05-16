require("dotenv").config();
const OpenAI = require("openai");


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT_ID,
});

exports.getTravelRecommendation = async (req, res) => {
  const {
    disabilityType,
    destination,
    barrierFreeOptions,
    transportOptions,
    travelType,
    startDate,
    endDate,
  } = req.body;

  const prompt = `
당신은 장애인 친화 여행지를 추천해주는 전문가입니다.
다음 조건에 맞춰 여행지를 추천해주세요:

- 희망 지역: ${destination}
- 장애 유형: ${disabilityType}
- 무장애 옵션: ${barrierFreeOptions.join(", ")}
- 이동 수단: ${transportOptions.join(", ")}
- 여행 유형: ${travelType}
- 여행 기간: ${startDate} ~ ${endDate}

JSON 형식 예시:
{
  "title": "추천 여행지 이름",
  "description": "소개 및 추천 이유",
  "access": {
    "장애인 화장실": true,
    "장애인 주차장": true,
    "휠체어 접근": true
  }
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const reply = completion.choices[0].message.content;
    const result = JSON.parse(reply);

    res.json(result);
  } catch (err) {
    console.error("OpenAI 오류:", err.message);
    res.status(500).json({ error: "추천 생성 실패" });
  }
};