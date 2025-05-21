require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const travelRoute = require("./routes/travel"); 
const communityRoute = require("./routes/community"); 


app.use(cors());
app.use(express.json());
app.use("/api/travel", travelRoute);


app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

app.get("/", (req, res) => {
  res.send("✅ 백엔드 서버가 정상적으로 작동 중입니다.");
});
app.use("/api/auth", require("./routes/auth"));
app.use("/api/travel", require("./routes/travel"));
app.use("/api/community", communityRoute)