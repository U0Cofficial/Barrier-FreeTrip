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

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/mainpage" element={<Mainpage />} />
            <Route path="/OptionPage" element={<OptionPage />} />
            <Route
              path="/accessible-travel"
              element={<AccessibleTravelPage />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
