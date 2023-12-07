"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "../icons/logo.png";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 w-[90%]">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image src={logo} alt="NexaVenture" className="w-[50%]" />
      </div>

      {/* Page Section */}
      <div className="flex items-center">
        <div
          className={`mr-4 p-2 rounded cursor-pointer ${
            activeLink === "home" ? "gradient-active" : "text-[#8e8e8e]"
          }`}
          onClick={() => setActiveLink("home")}
        >
          Home
        </div>
        <div
          className={`mr-4 p-2 rounded cursor-pointer ${
            activeLink === "portfolio" ? "gradient-active" : "text-[#8e8e8e]"
          }`}
          onClick={() => setActiveLink("portfolio")}
        >
          Portfolio
        </div>
      </div>

      {/* Search and Settings Section */}
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search..."
          className="bg-[#181825] rounded-md mr-4 p-2 w-64 h-10"
        />
        <select className="bg-[#181825] rounded-md mr-4 p-2 h-10">
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
        </select>
        <button
          className="bg-[#181825] rounded-md p-2 h-10"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "L" : "D"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
