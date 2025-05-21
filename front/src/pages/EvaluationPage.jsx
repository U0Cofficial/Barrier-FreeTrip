import React from "react";

const EvaluationPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        국내 무장애 관광지 지도
      </h1>
      <div className="w-full max-w-6xl bg-white shadow-xl rounded-lg overflow-hidden">
        <iframe
          src="/서울_무장애_관광지도2.html"
          width="100%"
          height="700px"
          style={{ border: "none" }}
          title="서울 무장애 관광지도"
        />
      </div>
      <div className="mt-6 text-center text-gray-700 text-lg">
        <p>본 지도는 한국관광공사에서 제공하는 무장애 여행 정보 api를 활용하여 시각화했습니다.</p>
      </div>
    </div>
  );
};

export default EvaluationPage;
