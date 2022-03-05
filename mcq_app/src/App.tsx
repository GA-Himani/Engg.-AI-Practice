import React from "react";
import StartPage from "./Components/StartPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Question from "./Pages/Question";

// Made some changes in the file.
function App() {
  return (
    <Router>
      <h1 style={{ textAlign: "center" }}> Online MCQ App </h1>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/Question/:id" element={<Question />} />
      </Routes>
    </Router>
  );
}

export default App;
