// 인증(회원가입/로그인) 관련 주요 기능을 담당하는 컨트롤러입니다.
const db = require("../db/database");
const bcrypt = require("bcrypt");

// 회원가입 기능
exports.signup = async (req, res) => {
  const { name, username, password } = req.body;

  // 1. 필수 입력값 확인
  if (!name || !username || !password) {
    return res.status(400).json({ error: "모든 필드를 입력해주세요." });
  }

  try {
    // 2. 비밀번호 해싱
    const hashedPw = await bcrypt.hash(password, 10);

    // 3. 사용자 정보 DB에 저장
    db.run(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, hashedPw],
      function (err) {
        // 4. DB 쿼리 에러 처리
        if (err) {
          // 4-1. 중복 사용자명 에러 처리
          if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(409).json({ error: "이미 존재하는 아이디입니다." });
          }
          // 4-2. 기타 서버 에러
          return res.status(500).json({ error: err.message });
        }
        // 5. 회원가입 성공 로그 및 응답
        console.log("✅ 회원가입 성공, userId:", this.lastID);
        res.status(201).json({ message: "회원가입 성공", userId: this.lastID });
      }
    );
  } catch (err) {
    // 6. 비동기 처리 중 서버 오류
    res.status(500).json({ error: "서버 오류" });
  }
};

// 로그인 기능
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // 1. 사용자 정보 DB에서 조회
  db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
    // 2. 사용자 없음 또는 쿼리 에러 처리
    if (err || !user) return res.status(401).json({ error: "User not found" });

    // 3. 비밀번호 비교
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Wrong password" });

    // 4. 로그인 성공 응답 반환
    res.status(200).json({ userId: user.id, name: user.name });
  });
};

