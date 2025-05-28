import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

const options = {
  disabilityTypes: ["하지 장애인"],
  barrierFreeOptions: [
    "장애인 전용 주차 공간",
    "장애인 전용 엘리베이터",
    "장애인 전용 화장실",
    "높이 조절 가능한 침대",
  ],
  transportOptions: [
    "휠체어 접근 가능한 차량 렌트",
    "휠체어 전용 택시",
    "휠체어 전용 버스",
    "휠체어 전용 기차",
  ],
  travelTypes: ["단체 여행", "가족 여행", "커플 여행", "혼자 여행"],
};

const SectionSelector = ({ step, title, options, selectedOptions, setSelectedOptions }) => {
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

const OptionPage = () => {
  const [user] = useRecoilState(userState);
  const [disabilityTypes, setDisabilityTypes] = useState([]);
  const [barrierFreeOptions, setBarrierFreeOptions] = useState([]);
  const [transportOptions, setTransportOptions] = useState([]);
  const [destination, setDestination] = useState("");
  const [travelTypes, setTravelTypes] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const requestData = {
      userId: user.id,
      disabilityType: disabilityTypes[0] || "",
      destination,
      barrierFreeOptions,
      transportOptions,
      travelType: travelTypes[0] || "",
      startDate,
      endDate,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/travel/recommend`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await res.json();

      if (res.ok) {
        console.log("추천 결과:", data);
        navigate("/accessible-travel", { state: { recommendation: data.recommendation } });
      } else {
        alert("추천 실패: " + data.error);
      }
    } catch (error) {
      console.error("서버 연결 실패", error);
      alert("서버 오류 발생");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="relative w-full h-[500px] bg-cover bg-gray-200" style={{ backgroundImage: `url("/mainpage2.svg")` }}>
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-2">{user.name} 안녕하세요,</h1>
          <h2 className="text-2xl">함께 여행을 계획해봐요</h2>
          <div className="mt-8 w-[500px] flex gap-4 items-center bg-white rounded-full overflow-hidden shadow-md px-6 py-3">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full text-gray-700 text-center focus:outline-none"
            />
            <span className="text-black">~</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full text-gray-700 text-center focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mt-10 mx-auto p-6 rounded-lg">
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
          setSelectedOptions={setTravelTypes}
        />

        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleSubmit}
            className="w-[334px] h-[121px] text-[34px] bg-green-500 text-white p-3 rounded-lg mt-4 hover:bg-green-600 transition-all"
          >
            여행찾기
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionPage;