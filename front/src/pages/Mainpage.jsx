import React from "react";
import { ReactComponent as Mainimage } from "../../src/assets/mainimage.svg";
import { ReactComponent as Mainbutton } from "../../src/assets/mainbutton.svg";
import { useNavigate } from "react-router-dom";

function Mainpage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/OptionPage");
  };
  return (
    <div>
      <div className="flex flex-wrap justify-between items-center bg-white px-40 py-10">
        <div className="w-1/2 flex ml-8 flex-col max-w-md space-y-6 gap-7 ">
          <h1 className="text-4xl font-bold text-black">
            모두를 위한 여행, 당신만의 <br /> 완벽한 계획을 세워보세요.
          </h1>
          <p className="text-lg text-gray-600">
            저희는 모두가 편안하게 여행을 즐길 수 있도록 돕습니다.
            <br />
            장애 유형별 맞춤 정보, 접근성 좋은 숙소와 명소 추천까지 당신만의
            여행 스타일에 맞는 플랜을 쉽게 만들고, 자유롭게 떠나보세요.
          </p>
          <p className="text-lg font-semibold text-gray-800">
            이제, 장애는 여행의 걸림돌이 아닙니다.
            <br />
            당신의 이야기를 채울 새로운 여행을 시작해보세요.
          </p>
          <button className="pt-20" onClick={handleClick}>
            <Mainbutton className="w-[400px]" />
          </button>
        </div>
        <div className="w-1/2 relative w-[700px] h-[770px] overflow-hidden ">
          <Mainimage className="absolute inset-0 w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
export default Mainpage;
