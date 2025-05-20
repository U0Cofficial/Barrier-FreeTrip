import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Mainpage from "./pages/Mainpage";
import OptionPage from "./pages/OptionPage";
import AccessibleTravelPage from "./pages/AccessibleTravelPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./components/PrivateRoute";
import HomeRedirect from "./components/HomeRedirect";

import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { userState } from "./atoms/userAtom";

function App() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.id) {
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeRedirect />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="mainpage" element={<PrivateRoute element={<Mainpage />} />} />
            <Route path="OptionPage" element={<PrivateRoute element={<OptionPage />} />} />
            <Route path="accessible-travel" element={<PrivateRoute element={<AccessibleTravelPage />} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;