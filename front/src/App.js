import "./App.css";
import React from "react";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";
import Mainpage2 from "./pages/Mainpage2";
import AccessibleTravelPage from "./pages/AccessibleTravelPage";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Mainpage />} />
            <Route path="/main" element={<Mainpage2/>} />
            <Route path="/accessible-travel" element={<AccessibleTravelPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
