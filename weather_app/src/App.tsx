import React from "react";
import CountryDetail from "./Components/CountryDetail";
import InputForm from "./Components/SearchCountry";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
    	<h2 style={{textAlign:'center'}} data-testid="home-heading"> Weather App </h2>
      <Routes>
        <Route  path="/" element={<InputForm />} />
        <Route  path="/CountryDetail" element={<CountryDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
