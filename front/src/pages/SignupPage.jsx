import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";
import { useSetRecoilState } from "recoil";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ 회원가입 성공! 사용자 ID: ${data.userId}`);
        setUser({ id: data.userId, name: formData.name });
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.userId, name: formData.name })
        );
        navigate("/mainpage");
      } else {
        setMessage(`❌ 오류: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ 서버에 연결할 수 없습니다.");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto mt-20 mb-20 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">회원가입</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={formData.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          회원가입
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
}
