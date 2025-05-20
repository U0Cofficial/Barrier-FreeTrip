import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Mainpage from "./pages/Mainpage";
import OptionPage from "./pages/OptionPage";
import AccessibleTravelPage from "./pages/AccessibleTravelPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./atoms/userAtom";

function App() {
  const setUser = useSetRecoilState(userState);

  // 앱 시작 시 localStorage에서 사용자 정보 불러와 전역 상태에 저장
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* 라우팅 설정: 각 경로별로 페이지 컴포넌트 렌더링 */}
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignupPage />} /> {/* 회원가입 페이지 */}
            <Route path="/" element={<LoginPage />} /> {/* 로그인 페이지 */}
            <Route path="/mainpage" element={<Mainpage />} /> {/* 메인 페이지 */}
            <Route path="/OptionPage" element={<OptionPage />} /> {/* 옵션 선택 페이지 */}
            <Route
              path="/accessible-travel"
              element={<AccessibleTravelPage />}
            /> {/* 배리어프리 여행 페이지 */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;