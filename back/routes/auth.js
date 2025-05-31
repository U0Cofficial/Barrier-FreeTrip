// Express 및 라우터 생성
const express = require("express");
const router = express.Router();

// 회원가입 및 로그인 컨트롤러 가져오기
const { signup, login } = require("../controllers/authController");

// 회원가입 요청 처리 (POST /api/auth/signup)
router.post("/signup", signup);

// 로그인 요청 처리 (POST /api/auth/login)
router.post("/login", login);

// 라우터 모듈 내보내기
module.exports = router;