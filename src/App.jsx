import React from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NoPage from "./pages/NoPages";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";


const App = () => {
  return (
    <BrowserRouter>
      <RouterHandler />
    </BrowserRouter>
  );
};
const RouterHandler = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor/:id" element={isLoggedIn ? <Editor /> : <Navigate to={"/login"} />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={600}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="light"
      />
    </>
  );
};

export default App;
