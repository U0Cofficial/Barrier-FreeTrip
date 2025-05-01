import "./App.css";
import React from "react";
import Layout from "./components/layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./pages/Mainpage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="main" element={<Mainpage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
