import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useNavigate } from "react-router-dom";

export default function ArrangementPage() {
  // 전역 사용자 정보 로딩
  const user = useRecoilValue(userState);
  // 추천 여행 데이터 상태
  const [recommendedTrips, setRecommendedTrips] = useState([]);
  // 데이터 로딩 상태
  const [loading, setLoading] = useState(true);
  // 페이지 이동을 위한 navigate 함수
  const navigate = useNavigate();

  // 컴포넌트 마운트 시 사용자 ID로 추천 여행 데이터 fetch
  useEffect(() => {
    if (!user?.id) return; // 사용자 정보가 없으면 fetch하지 않음
    fetch(`${process.env.REACT_APP_API_URL}/api/travel/user/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecommendedTrips(data); // fetch된 추천 여행 데이터 저장
        setLoading(false); // 로딩 완료
      })
      .catch((err) => {
        // fetch 실패 시 에러 처리
        console.error("데이터 불러오기 실패:", err);
        setLoading(false);
      });
  }, [user]);

  // 추천 여행 목록을 카드 형식으로 렌더링하는 함수
  const renderTrips = (trips) => (
    <div className="grid gap-6 md:grid-cols-2 pb-10">
      {trips.map((trip) => (
        // 추천 여행 카드: 클릭 시 상세 페이지로 이동
        <div
          key={trip.id}
          onClick={() =>
            navigate(`/accessible-travel`, { state: { recommendation: trip } })
          }
          className="cursor-pointer border rounded-lg p-6 shadow-sm bg-white hover:shadow-md transition"
        >
          {/* 여행 제목 */}
          <h2 className="text-2xl font-semibold text-green-600 mb-2">
            {trip.title}
          </h2>
          {/* 여행 설명 */}
          <p className="text-gray-700 mb-3">{trip.description}</p>
          {/* 생성일 정보 */}
          <p className="text-sm text-gray-500 mb-2">
            생성일: {trip.created_at}
          </p>
          {/* 접근성 정보가 있을 경우 접근성 정보 표시 */}
          {trip.access && (
            <div className="flex flex-wrap gap-2">
              {Object.entries(trip.access).map(([key, value]) => (
                // 접근성 항목별로 이용 가능 여부 표시
                <span
                  key={key}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    value
                      ? "bg-green-100 text-green-700" // 이용 가능
                      : "bg-gray-200 text-gray-500 line-through" // 이용 불가
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
    // 페이지 전체 레이아웃
    <div className="max-w-5xl mx-auto mt-10 px-4">
      {/* 사용자 이름과 여행 기록 타이틀 */}
      <h1 className="text-3xl font-bold mb-6">{user.name}님의 여행 기록</h1>
      {/* 조건부 렌더링: 로딩 중/로딩 완료 */}
      {loading ? (
        // 데이터 로딩 중 메시지
        <p>불러오는 중...</p>
      ) : (
        <>
          {/* 추천 여행 섹션 타이틀 */}
          <h2 className="text-2xl font-semibold mt-8 mb-4">
            🐰 AI의 추천 여행
          </h2>
          {/* 추천 여행 데이터가 있을 때/없을 때 조건부 렌더링 */}
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
