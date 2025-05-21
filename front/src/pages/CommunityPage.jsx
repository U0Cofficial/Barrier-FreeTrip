import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CommunityPage() {
  const [travelData, setTravelData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/community")
      .then((res) => {
        setTravelData(res.data);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
      });
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex mb-8 items-center">
        <button
          className="bg-green-500 px-6 py-2 rounded-full text-white font-bold"
          onClick={() => navigate("/CommunityPage/new")}
        >
          게시물 등록하기
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-6">
        {travelData.map((travel) => (
          <div
            key={travel.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={travel.image}
              alt={travel.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">
                {travel.title}
              </h2>
              <p className="text-sm text-gray-600 mt-1">{travel.description}</p>
              <div className="flex flex-wrap mt-2 space-x-2">
                {travel.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
