// 커뮤니티 페이지: 여행 게시물 목록을 불러와 카드 형식으로 렌더링하는 컴포넌트

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  // 게시물 데이터 상태 관리
  const [travelData, setTravelData] = useState([]);
  const navigate = useNavigate();

  // 컴포넌트가 마운트될 때 게시물 목록을 서버에서 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/community`)
      .then((res) => {
        setTravelData(res.data); // 불러온 데이터 저장
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err); // 에러 로깅
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex mb-8 items-center">
        {/* 게시물 작성 페이지로 이동하는 버튼 */}
        <button
          className="bg-green-500 px-6 py-2 rounded-full text-white font-bold"
          onClick={() => navigate("/CommunityPage/new")}
        >
          게시물 등록하기
        </button>
      </div>
      {/* 게시물 리스트 출력 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {travelData.map((travel) => (
          <div
            key={travel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            {/* 게시물 이미지 */}
            <img
              src={travel.image}
              alt={travel.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              {/* 게시물 제목 */}
              <h2 className="text-lg font-semibold text-gray-800">
                {travel.title}
              </h2>
              {/* 게시물 설명 */}
              <p className="text-sm text-gray-600 mt-1">{travel.description}</p>
              {/* 태그 목록 */}
              <div className="flex flex-wrap mt-2 space-x-2">
                {travel.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
