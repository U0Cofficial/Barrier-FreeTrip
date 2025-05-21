import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommunityFormPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    image: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
        image: formData.image,
      };
      await axios.post("http://localhost:3001/api/community", payload);
      alert("게시글 등록 완료!");
      navigate("/CommunityPage");
    } catch (err) {
      console.error("등록 실패:", err);
      alert("에러 발생");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">여행 게시물 작성</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="제목"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="description"
          placeholder="설명"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="tags"
          placeholder="태그 (예: #강릉, #바다)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="image"
          placeholder="이미지 URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          등록하기
        </button>
      </form>
    </div>
  );
}