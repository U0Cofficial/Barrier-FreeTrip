import React from "react";
import bgImage from "../../src/assets/bg.png";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useLocation } from "react-router-dom";

export default function AccessibleTravelPage() {
  const [user, setUser] = useRecoilState(userState);
  const location = useLocation();
  const recommendation = location.state?.recommendation;

  if (!recommendation) {
    return (
      <div className="text-center mt-10">추천 정보를 찾을 수 없습니다.</div>
    );
  }
  return (
    <div className="min-h-screen font-sans">
      <div
        className="relative w-full h-screen bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-800/60 to-green-500/40 z-0"></div>
        <div className="absolute inset-0 flex flex-col justify-center pl-20 z-10 gap-5">
          <h1 className="text-[50px] md:text-[50px] font-bold mb-40">
            {user.name}님을 위한 맞춤 여행계획입니다.
          </h1>
          <h2 className="text-[58px] md:text-[58px] font-bold">
            {recommendation.title}
          </h2>
          <p className="mt-2 text-[32px] font-semibold">
            {recommendation.period}
          </p>
          <p className="mt-4 max-w-xl text-[20px] text-gray-100">
            {recommendation.description}
          </p>

          <div className="flex flex-wrap mt-4 gap-2">
            {Object.entries(recommendation.access).map(([key, value]) => (
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
      </div>


    </div>
  );
}
