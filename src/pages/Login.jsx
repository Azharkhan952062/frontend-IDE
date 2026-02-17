import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logos/logo.png";
import { toast } from "react-toastify";
import { api_base_url } from "../helper"; 

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(api_base_url + "/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          pwd: formData.password
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login Successfully");
        localStorage.setItem("token", data.token); 
        localStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("justLoggedIn", "yes");
        setTimeout(() => {
          navigate("/");
        }, 700);
      } else {
        toast.error(data.msg);
      }

    } catch (error) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-[360px] bg-[#0f0e0e] p-6 rounded-lg shadow-xl"
      >

        <img
          src={logo}
          className="w-48 mx-auto mb-6"
          alt="logo"
        />

        <div className="inputBox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <p className="text-gray-400 text-sm mt-3 mb-3">
          Don't have an account?{" "}
          <Link to="/signUp" className="text-blue-500">SignUp</Link>
        </p>

        <button className="btnNormal bg-blue-500 hover:bg-blue-600">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;
