import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ParkingSpaces from "./components/ParkingSpaces";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parkingSpaces:noOfSpaces" element={<ParkingSpaces />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
