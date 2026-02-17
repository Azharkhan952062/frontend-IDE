import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logos/logo.png";
import { api_base_url } from "../helper";
import { toast } from "react-toastify";



const SignUp = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Password and Confirm Password do not match");
      return;
    }

    fetch(api_base_url + "/signUp", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        email: formData.email,
        pwd: formData.password
      })
    }).then(res => res.json()).then(data => {
      if (data.success) {
        navigate("/login");
      }
      else {
        toast.error(data.msg);
      }
    })
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
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>

        <div className="inputBox">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className="inputBox">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <p className="text-gray-400 text-sm mt-3 mb-3">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">Login</Link>
        </p>

        <button className="btnNormal bg-blue-500 hover:bg-blue-600">
          Sign Up
        </button>

      </form>

    </div>
  );
};

export default SignUp;
