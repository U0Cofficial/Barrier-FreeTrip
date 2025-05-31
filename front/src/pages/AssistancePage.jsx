// AssistancePage 컴포넌트는 사용자에게 여행 중 도움이 필요한 경우 참고할 수 있는 연락처 및 정보를 제공합니다.

import React from "react";

export default function AssistancePage() {
  return (
    <div className="max-w-[700px] mx-auto mt-20 mb-20 p-6 bg-white rounded shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-center">여행 지원 센터</h2>

      <p className="text-center text-gray-700 mb-10">
        여행 중 도움이 필요하신가요? 아래의 정보를 참고해주세요.
      </p>

      <div className="space-y-4 text-lg text-gray-800 p-3">
        {/* 전화 지원 정보 */}
        <div>
          <strong>📞 전화 지원:</strong>{" "}
          <a href="tel:1588-0000" className="text-green-600 hover:underline">
            1588-0000
          </a>{" "}
          (운영 시간: 평일 9시 ~ 18시)
        </div>
        {/* 이메일 문의 정보 */}
        <div>
          <strong>📧 이메일 문의:</strong>{" "}
          <a
            href="mailto:support@barrierfreetrip.com"
            className="text-green-600 hover:underline"
          >
            support@barrierfreetrip.com
          </a>
        </div>
        {/* FAQ 링크 */}
        <div>
          <strong>💬 자주 묻는 질문:</strong>{" "}
          <a
            href="/faq"
            className="text-green-600 hover:underline"
          >
            FAQ 바로가기
          </a>
        </div>
      </div>
    </div>
  );
}