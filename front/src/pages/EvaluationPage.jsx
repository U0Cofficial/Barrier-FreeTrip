// 무장애 관광지 지도를 표시하는 평가 페이지 컴포넌트

import React from "react";

const EvaluationPage = () => {
  return (
    // 페이지 전체 레이아웃 설정
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      {/* 페이지 제목 */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        국내 무장애 관광지 지도
      </h1>

      {/* 지도 시각화를 위한 iframe 삽입 */}
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        <iframe
          src="/서울_무장애_관광지도2.html" // 로컬 HTML 파일 삽입
          width="100%"
          height="700px"
          style={{ border: "none" }}
          title="서울 무장애 관광지도"
        />
      </div>

      {/* 지도 설명 텍스트 */}
      <div className="mt-6 text-center text-gray-700 text-lg">
        <p>본 지도는 한국관광공사에서 제공하는 무장애 여행 정보 api를 활용하여 시각화했습니다.</p>
      </div>
    </div>
  );
};

export default EvaluationPage;
