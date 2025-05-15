const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

app.get("/", (req, res) => {
  res.send("✅ 백엔드 서버가 정상적으로 작동 중입니다.");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/travel", require("./routes/travel"));