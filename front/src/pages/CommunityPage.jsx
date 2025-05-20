import React from "react";
import { useNavigate } from "react-router-dom";


export default function CommunityPage() {


  const travelData = [
    {
      id: 1,
      title: "강릉 해변의 여유",
      description: "강릉 3박 4일",
      tags: ["#강릉", "#바다", "#커피거리"],
      image: "https://images.unsplash.com/photo-1669302849400-5cfdf29ff32b?q=80&w=2371&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 2,
      title: "제주의 자연과 힐링",
      description: "제주 4박 5일",
      tags: ["#제주", "#한라산", "#오름"],
      image: "https://images.unsplash.com/photo-1725002058674-a77c07145c9a?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 3,
      title: "서울의 야경",
      description: "서울 당일치기",
      tags: ["#서울", "#남산타워", "#한강"],
      image: "https://images.unsplash.com/photo-1698518890735-ae524d53ed53?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 4,
      title: "부산의 매력",
      description: "부산 2박 3일",
      tags: ["#부산", "#해운대", "#광안대교"],
      image: "https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 5,
      title: "전주의 전통과 맛",
      description: "전주 1박 2일",
      tags: ["#전주", "#한옥마을", "#비빔밥"],
      image: "https://images.unsplash.com/photo-1653230675261-fe00bde32c8e?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      id: 6,
      title: "속초의 신선함",
      description: "속초 2박 3일",
      tags: ["#속초", "#설악산", "#속초항"],
      image: "https://images.unsplash.com/photo-1660785462445-f9d21cad7ada?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];
  
  

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex mb-8 items-center">
        <input
          type="text"
          placeholder="관광지를 검색해주세요"
          className="w-full px-4 py-2 border rounded-l-full focus:outline-none"
        />
        <button className="bg-green-500 px-4 py-2 rounded-r-full text-white font-bold">
          🔍
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