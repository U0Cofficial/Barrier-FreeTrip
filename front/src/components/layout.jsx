// 페이지 공통 레이아웃을 구성하는 컴포넌트입니다.
// Header, Outlet(페이지별 내용), Footer로 구성되어 있습니다.

import Header from "./header";
import { Outlet } from "react-router-dom";
import Footer from "./footer";

function Layout() {
  return (
    // 전체 화면 높이에 맞춰 세로 방향으로 구성된 flex 레이아웃
    <div className="flex flex-col min-h-screen">
      <Header /> {/* 페이지 상단 고정 헤더 */}
      <main className="flex-grow "> {/* 페이지별 콘텐츠 영역 (동적으로 변경됨) */}
        <Outlet /> {/* 자식 라우트가 이 위치에 렌더링됨 */}
      </main>
      <Footer /> {/* 페이지 하단 고정 푸터 */}
    </div>
  );
}

export default Layout;