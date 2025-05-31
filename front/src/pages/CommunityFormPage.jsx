// 커뮤니티 게시물 작성 페이지 컴포넌트
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommunityFormPage() {
  // 폼 입력 상태 관리
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    image: "",
  });

  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  // 입력 필드 값 변경 시 상태 업데이트
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 폼 제출 시 실행되는 함수
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 동작 방지
    try {
      // 서버에 보낼 데이터 가공 (tags를 배열로 변환)
      const payload = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        image: formData.image,
      };
      // POST 요청으로 게시물 저장
      await axios.post(`${process.env.REACT_APP_API_URL}/api/community`, payload);
      alert("게시글 등록 완료!"); // 성공 알림
      navigate("/CommunityPage"); // 커뮤니티 페이지로 이동
    } catch (err) {
      console.error("등록 실패:", err); // 오류 로그 출력
      alert("에러 발생"); // 실패 알림
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">여행 게시물 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 제목 입력 */}
        <input
          name="title"
          placeholder="제목"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* 설명 입력 */}
        <input
          name="description"
          placeholder="설명"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* 태그 입력 (쉼표로 구분) */}
        <input
          name="tags"
          placeholder="태그 (예: #강릉, #바다)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* 이미지 URL 입력 */}
        <input
          name="image"
          placeholder="이미지 URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        {/* 제출 버튼 */}
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          등록하기
        </button>
      </form>
    </div>
  );
}