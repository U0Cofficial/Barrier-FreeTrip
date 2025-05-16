import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { userState } from "../atoms/userAtom";


export default function LoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [user, setUser] = useRecoilState(userState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setUser({ id: data.userId, name: data.name });
        localStorage.setItem(
          "user",
          JSON.stringify({ id: data.userId, name: data.name })
        );
        setMessage("✅ 로그인 성공!");
        setTimeout(() => {
          navigate("/mainpage");
        }, 1500);
      } else {
        setMessage(`❌ 오류: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ 서버에 연결할 수 없습니다.");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto mt-20 mb-20 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          로그인
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">
          {message}
          {/* {userId && `(userId: ${userId})`} */}
        </p>
      )}
    </div>
  );
}
