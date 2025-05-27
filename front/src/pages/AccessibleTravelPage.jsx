import React from "react";
import bgImage from "../../src/assets/bg.png";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useLocation } from "react-router-dom";

export default function AccessibleTravelPage() {
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  const recommendation = location.state?.recommendation;

  if (!recommendation || !user || !user.id) {
    return <div className="text-center mt-10">데이터를 불러오는 중입니다...</div>;
  }

  console.log("user 상태:", user);

  return (
    <div className="min-h-screen font-sans">
      <div
        className="relative w-full min-h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className=" inset-0 bg-gradient-to-r from-green-800/60 to-green-500/40 z-0"></div>
        <div className=" inset-0 flex flex-col justify-center pl-20 z-10 gap-5">
          <h1 className="text-[50px] md:text-[50px] font-bold mt-5 mb-5">
            {user.name || "여행자"}님을 위한 맞춤 여행계획입니다.
          </h1>
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

              <div className="flex flex-wrap mt-4 gap-2">
                {Object.entries(item.access || {}).map(([key, value]) => (
                  <span
                    key={key}
                    className={`px-8 py-5 rounded-full text-[19px] font-medium ${
                      value
                        ? "bg-white text-green-700"
                        : "bg-gray-200 text-gray-500 line-through"
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
