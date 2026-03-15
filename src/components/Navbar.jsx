import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`relative px-6 py-4 text-lg font-semibold transition-all duration-300
      ${location.pathname === path ? "text-white" : "text-gray-400 hover:text-white"}`}
    >
      {label}
      {location.pathname === path && (
        <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full" />
      )}
    </Link>
  );

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#020617]/95 border-b border-white/10">
      <div className="max-w-[1600px] mx-auto px-6 md:px-14 py-4 md:py-6 flex items-center justify-between">

        {/* LEFT SIDE : LOGO */}
        <div className="hidden md:flex items-center gap-5 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center font-bold text-black text-2xl">
            K
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            KodeBase
          </h1>
        </div>

        {/* RIGHT SIDE : NAV + LOGOUT */}
        <div className="flex items-center gap-8">
          {navItem("/", "Home")}
          {navItem("/about", "About")}
          {navItem("/services", "Services")}
          {navItem("/contact", "Contact")}

          <button
            onClick={logout}
            className="ml-4 px-8 py-3 text-lg rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 hover:scale-105 transition-all shadow-xl shadow-pink-500/40"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;