// React, 이미지, 전역 상태, 라우팅 관련 훅 import
import React from "react";
import bgImage from "../../src/assets/bg.png";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useLocation } from "react-router-dom";

// 여행 추천 결과를 시각적으로 표시하는 페이지 컴포넌트
export default function AccessibleTravelPage() {
  const [user, setUser] = useRecoilState(userState); // Recoil을 통해 사용자 상태 접근
  const location = useLocation(); // 이전 페이지에서 전달된 상태값 접근
  const recommendation = location.state?.recommendation; // 추천 결과 데이터

  // 추천 데이터 또는 사용자 정보가 없으면 로딩 메시지 출력
  if (!recommendation || !user || !user.id) {
    return <div className="text-center mt-10">데이터를 불러오는 중입니다...</div>;
  }

  console.log("user 상태:", user);

  return (
    <div className="min-h-screen font-sans">
      <div
        className="relative w-full min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }} // 배경 이미지 설정
      >
        {/* 좌우 그라데이션 오버레이 */}
        <div className=" inset-0 bg-gradient-to-r from-green-800/60 to-green-500/40 z-0"></div>

        {/* 콘텐츠 박스 */}
        <div className=" inset-0 flex flex-col justify-center pl-20 z-10 gap-5">
          {/* 사용자 이름 포함한 인사 메시지 */}
          <h1 className="text-[50px] md:text-[50px] font-bold mt-5 mb-5">
            {user.name || "여행자"}님을 위한 맞춤 여행계획입니다.
          </h1>

          {/* 추천 일정 리스트 출력 */}
          {recommendation.map((item, index) => (
            <div key={index} className="mb-12">
              <h2 className="text-[58px] md:text-[58px] font-bold text-green-500">
                {item.date} - {item.title}
              </h2>
              <p className="mt-2 text-[32px] font-semibold">
                이동 수단 추천: {item.transportRecommendation}
              </p>
              <p className="mt-4 max-w-xl text-[20px] text-gray-100">
                {item.description}
              </p>

              {/* 접근성 정보 출력 (O/X에 따라 스타일 다름) */}
              <div className="flex flex-wrap mt-4 gap-2">
                {Object.entries(item.access || {}).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-8 py-5 rounded-full text-[19px] font-medium ${
                      value
                        ? "bg-white text-green-700" // 접근성 항목이 있는 경우
                        : "bg-gray-200 text-gray-500 line-through" // 없는 경우 취소선 처리
                    }`}
                  >
                    #{key}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
