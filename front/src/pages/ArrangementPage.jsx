import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

export default function ArrangementPage() {
  const user = useRecoilValue(userState);
  const [recommendedTrips, setRecommendedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;
    fetch(`${process.env.REACT_APP_API_URL}/api/travel/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendedTrips(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("데이터 불러오기 실패:", err);
        setLoading(false);
      });
  }, [user]);

  const renderTrips = (trips) => (
    <div className="grid gap-6 md:grid-cols-2 pb-10">
      {trips.map((trip) => (
        <div
          key={trip.id}
          onClick={() =>
            navigate(`/accessible-travel`, { state: { recommendation: trip } })
          }
          className="cursor-pointer border rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
        >
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            {trip.title}
          </h2>
          <p className="text-gray-700 mb-3">{trip.description}</p>
          <p className="text-sm text-gray-500 mb-2">
            생성일: {trip.created_at}
          </p>
          {trip.access && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(trip.access).map(([key, value]) => (
                <span
                  key={key}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    value
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-500 line-through"
                  }`}
                >
                  {key}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{user.name}님의 여행 기록</h1>
      {loading ? (
        <p>불러오는 중...</p>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            🐰 AI의 추천 여행
          </h2>
          {recommendedTrips.length > 0 ? (
            renderTrips(recommendedTrips)
          ) : (
            <p className="text-gray-500">추천 받은 여행이 없습니다.</p>
          )}
        </>
      )}
    </div>
  );
}
