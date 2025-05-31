// 메인 페이지 컴포넌트: 사용자에게 서비스 소개 문구와 버튼, 이미지로 구성된 첫 화면 제공

import React from "react";
import { ReactComponent as Mainimage } from "../../src/assets/mainimage.svg";
import { ReactComponent as Mainbutton } from "../../src/assets/mainbutton.svg";
import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate();

  // 버튼 클릭 시 옵션 페이지로 이동
  const handleClick = () => {
    navigate("/OptionPage");
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center bg-white px-6 py-10 md:px-20 lg:px-40">
        {/* 텍스트 영역 */}
        <div className="w-full md:w-1/2 flex flex-col space-y-6 md:space-y-7 max-w-[560px] break-words whitespace-normal">
          {/* 서비스 메인 슬로건 */}
          <h1 className="text-3xl md:text-4xl font-bold text-black leading-snug">
            모두를 위한 여행, 당신만의 <br className="hidden md:block" /> 완벽한 계획을 세워보세요.
          </h1>

          {/* 서비스 설명 텍스트 */}
          <p className="w-full text-base md:text-lg text-gray-700 leading-relaxed whitespace-normal">
            저희는 모두가 편안하게 여행을 즐길 수 있도록 돕습니다.
            <br className="hidden md:block" />
            장애 유형별 맞춤 정보, 접근성 좋은 숙소와 명소 추천까지<br></br> 당신만의 여행 스타일에 맞는 플랜을 쉽게 만들고,<br></br> 자유롭게 여행을 떠나보세요.
          </p>

          {/* 동기부여 문구 */}
          <p className="w-full text-base md:text-lg font-semibold text-gray-800 leading-relaxed whitespace-normal">
            이제, 장애는 여행의 걸림돌이 아닙니다.
            <br className="hidden md:block" />
            당신의 이야기를 채울 새로운 여행을 시작해보세요.
          </p>

          {/* 시작 버튼 */}
          <button className="pt-10" onClick={handleClick}>
            <div className="w-80 md:w-96">
              <Mainbutton className="w-full h-auto" />
            </div>
          </button>
        </div>

        {/* 오른쪽 일러스트 이미지 영역 */}
        <div className="w-full md:w-1/2 relative h-[300px] md:h-[768px] md:w-[704px] overflow-hidden mt-10 md:mt-0">
          <Mainimage className="absolute inset-0 w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;