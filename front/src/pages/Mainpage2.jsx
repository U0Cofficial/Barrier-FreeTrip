import React, { useState } from "react";
import { Link } from "react-router-dom";

const options = {
  disabilityTypes: ["하지 장애인", "기타"],
  barrierFreeOptions: [
    "객실 문제 없음",
    "넓은 출입문",
    "긴급 호출 버튼",
    "장애인 화장실",
    "높이 조절 가능한 침대",
    "시각 장애인용 점자",
  ],
  transportOptions: [
    "장애인 전용 차량 서비스",
    "장애인 렌터카 서비스",
    "지하철",
    "지하철/기타",
  ],

  travelTypes: ["단체 여행", "가족 여행", "커플 여행", "혼자 여행"],
};

const SectionSelector = ({
  step,
  title,
  options,
  selectedOptions,
  setSelectedOptions,
  travelTypes,
}) => {
  const handleChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="p-4 border rounded-lg mb-4 bg-white">
      <h3 className="text-xl font-semibold mb-2">
        <span className="text-green-500 font-bold mr-2">{step}</span>
        {title}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option, index) => (
          <label key={index} className="flex items-center gap-2">
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={() => handleChange(option)}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

const TravelPlanPage = () => {
  const [disabilityTypes, setDisabilityTypes] = useState([]);
  const [barrierFreeOptions, setBarrierFreeOptions] = useState([]);
  const [transportOptions, setTransportOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [travelTypes, setTravelTypes] = useState([]);

  const handleSubmit = () => {
    console.log({
      disabilityTypes,
      destination,
      barrierFreeOptions,
      transportOptions,
    });
  };

  return (
    <div className="bg-gray-100 ">
      <div
        className="relative w-full h-[500px] bg-cover bg-gray-200 "
        style={{
          backgroundImage: `url("/mainpage2.svg")`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-2">정유영님 안녕하세요,</h1>
          <h2 className="text-2xl">함께 여행을 계획해봐요</h2>

          <div className="mt-8 w-[500px] flex items-center bg-white rounded-full overflow-hidden shadow-md">
            <div className="flex text-center w-6 h-6 text-gray-500 ml-4" />
            <input
              type="text"
              placeholder="여행을 시작할 날짜를 찾아볼 날짜를 선택하세요."
              className="w-full px-4 py-3 text-gray-700 text-center focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mt-10 mx-auto  p-6 rounded-lg ">
        <SectionSelector
          step="01"
          title="장애유형 선택"
          options={options.disabilityTypes}
          selectedOptions={disabilityTypes}
          setSelectedOptions={setDisabilityTypes}
        />

        <div className="p-4 border rounded-lg mb-4 bg-white">
          <h3 className="text-xl font-semibold mb-2">
            <span className="text-green-500 font-bold mr-2">02</span>여행지 선택
          </h3>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="원하는 여행지를 입력해주세요"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </div>

        <SectionSelector
          step="03"
          title="무장애 객실"
          options={options.barrierFreeOptions}
          selectedOptions={barrierFreeOptions}
          setSelectedOptions={setBarrierFreeOptions}
        />

        <SectionSelector
          step="04"
          title="이동 옵션"
          options={options.transportOptions}
          selectedOptions={transportOptions}
          setSelectedOptions={setTransportOptions}
        />
        <SectionSelector
          step="05"
          title="여행 유형"
          options={options.travelTypes}
          selectedOptions={travelTypes}
          setSelectedOptions={travelTypes}
        />
        <div className="flex items-center justify-center mt-4">
          <Link to="/accessible-travel">
            <button
              onClick={handleSubmit}
              className="w-[334px] h-[121px] text-[34px] bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600 transition-all"
            >
              여행찾기
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TravelPlanPage;
