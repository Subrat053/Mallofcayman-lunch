import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Hero from "./pages/Hero";
import Testimonial from "./pages/Testimonial";
import Store from "./pages/Store";
import Marketing from "./pages/Marketing";
import Footer from "./pages/Footer";
import Register from "./pages/Register";
import SuccessPage from "./pages/SuccessPage";

const Home = () => (
  <div>
    <Navbar />
    <Hero />
    <Testimonial />
    <Store />
    <Marketing />
    <Footer />
  </div>
);

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/register" element={<Register />} />
    <Route path="/success" element={<SuccessPage />} />
  </Routes>
);

export default App;
