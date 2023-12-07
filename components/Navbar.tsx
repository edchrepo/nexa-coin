"use client";

import { useState } from "react";
import Image from "next/image";
import * as Icons from "../icons"

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav className="flex items-center justify-between p-4 w-[90%]">
      {/* Logo Section */}
      <div className="flex items-center">
        <Image className="w-[150px]" src={Icons.logo} alt="NexaCoin" />
      </div>

      {/* Page Section */}
      <div className="flex items-center">
        <div
          className={`flex items-center mr-4 p-2 rounded cursor-pointer ${
            activeLink === "home" ? "gradient-active" : "text-[#8e8e8e]"
          }`}
          onClick={() => setActiveLink("home")}
        >
          <Image className="h-7 w-7 mr-2" src={activeLink === "home" ? Icons.Home : Icons.HomeStatic} alt="home"/>
          <p>Home</p>
        </div>
        <div
          className={`flex items-center mr-4 p-2 rounded cursor-pointer ${
            activeLink === "portfolio" ? "gradient-active" : "text-[#8e8e8e]"
          }`}
          onClick={() => setActiveLink("portfolio")}
        >
          <Image className="h-7 w-7 mr-2" src={activeLink === "portfolio" ? Icons.Stack : Icons.StackStatic} alt="portfolio"/>
          <p>Portfolio</p>
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
          {darkMode ? <Image className="h-7 w-7 mr-2" src={Icons.Dark} alt="Dark"/> : <Image className="h-7 w-7 mr-2" src={Icons.Light} alt="Light"/>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
