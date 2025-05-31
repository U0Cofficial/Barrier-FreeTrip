// 로그인 페이지 컴포넌트: 사용자 인증을 처리하고 로그인 후 메인 페이지로 이동

import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";

export default function LoginPage() {
  // 사용자 입력 상태
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // 로그인 메시지 상태 (성공/오류)
  const [message, setMessage] = useState("");

  // 전역 사용자 상태 관리
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  // 입력 필드 변경 시 상태 업데이트
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 로그인 요청 처리
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 로그인 성공 시 사용자 정보 설정 및 로컬 스토리지 저장
        setUser({ id: data.userId, name: data.name });
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.userId, name: data.name })
        );
        setMessage("✅ 로그인 성공!");
        // 일정 시간 후 메인 페이지로 이동
        setTimeout(() => {
          navigate("/mainpage");
        }, 1500);
      } else {
        // 로그인 실패 시 메시지 출력
        setMessage(`❌ 오류: ${data.error}`);
      }
    } catch (err) {
      // 서버 연결 실패
      setMessage("❌ 서버에 연결할 수 없습니다.");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto mt-20 mb-20 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

      {/* 로그인 폼 */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 아이디 입력 필드 */}
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        {/* 비밀번호 입력 필드 */}
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          로그인
        </button>
      </form>

      {/* 로그인 결과 메시지 출력 */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
