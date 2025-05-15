import React from "react";
import bgImage from "../../src/assets/bg.png";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";

export default function AccessibleTravelPage() {
  const [user, setUser] = useRecoilState(userState);
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
            제주도 여행
            <br />
            송담 마로 (편백나무숲 산책길)
          </h2>
          <p className="mt-2 text-[32px] font-semibold">
            2025.01.01~2025.01.23
          </p>
          <p className="mt-4 max-w-xl text-[20px] text-gray-100">
            송당마을 무장애 코스는 1.2km 길이의 편안한 산책 코스로, 휠체어
            사용자를 포함한 모든 방문객들이 송당마을의 아름다운 자연을 만끽할 수
            있도록 조성되었습니다.
          </p>

          <div className="flex  flex-wrap mt-4 gap-2">
            <span className="bg-white text-green-700 px-8 py-5 rounded-full text-[19px] font-medium">
              #정정자연
            </span>
            <span className="bg-white text-green-700 px-8 py-5 rounded-full text-[19px] font-medium">
              #편백나무 향기
            </span>
            <span className="bg-white text-green-700 px-8 py-5 rounded-full text-[19px] font-medium">
              #편안한 경사로
            </span>
          </div>
        </div>
      </div>

      {/* 편의 기능 버튼들 */}
      <div className="bg-white py-12 px-6 md:px-20 text-center grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-green-500 text-white py-7 rounded-lg font-semibold text-[34px]">
          장애인 주차장
        </div>
        <div className="bg-green-500 text-white py-7 rounded-lg font-semibold text-[34px]">
          장애인 화장실
        </div>
        <div className="bg-green-500 text-white py-7 rounded-lg font-semibold text-[34px]">
          숙소 휠체어 접근 가능성
        </div>
      </div>
    </div>
  );
}
