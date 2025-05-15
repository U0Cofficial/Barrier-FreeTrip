const db = require("../db/database");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, username, password } = req.body;

  if (!name || !username || !password) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  try {
    const hashedPw = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, hashedPw],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
          }
          return res.status(500).json({ error: err.message });
        }
        console.log("✅ 회원가입 성공, userId:", this.lastID); // ✅ 추가
        res.status(201).json({ message: "회원가입 성공", userId: this.lastID });
      }
    );
  } catch (err) {
    res.status(500).json({ error: "서버 오류" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    if (err || !user) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    res.status(200).json({ userId: user.id });
  });
};