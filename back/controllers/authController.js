const db = require("../db/database");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  try {
    const hashedPw = await bcrypt.hash(password, 10);

    try {
      const result = await db.query(
        "INSERT INTO users (name, username, password) VALUES ($1, $2, $3) RETURNING id",
        [name, username, hashedPw]
      );
      const userId = result.rows[0].id;
      console.log("✅ 회원가입 성공, userId:", userId);
      res.status(201).json({ message: "회원가입 성공", userId });
    } catch (err) {
      if (err.code === '23505') {
        return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
      }
      return res.status(500).json({ error: err.message });
    }
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    res.status(200).json({ userId: user.id,name: user.name });
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
};
