import React from "react";
import CountryDetail from "./Components/CountryDetail";
import InputForm from "./Components/SearchCountry";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path="/" element={<InputForm />} />
        <Route  path="/CountryDetail" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
