"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "../icons";

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
        <Link
          className={`flex items-center mr-10 p-2 rounded cursor-pointer ${
            activeLink !== "home" && "text-secondary"
          }`}
          onClick={() => setActiveLink("home")}
          href="/"
        >
          <Image
            className="h-7 w-7 mr-2"
            src={activeLink === "home" ? Icons.Home : Icons.HomeStatic}
            alt="home"
          />
          <p>Home</p>
        </Link>
        <Link
          className={`flex items-center p-2 rounded cursor-pointer ${
            activeLink !== "portfolio" && "text-secondary"
          }`}
          onClick={() => setActiveLink("portfolio")}
          href="/portfolio"
        >
          <Image
            className="h-7 w-7 mr-2"
            src={activeLink === "portfolio" ? Icons.Stack : Icons.StackStatic}
            alt="portfolio"
          />
          <p>Portfolio</p>
        </Link>
      </div>

      {/* Search and Settings Section */}
      <div className="flex items-center">
        <div className="relative">
          <div className="absolute inset-y-0 ml-3 flex items-center pointer-events-none">
            <Image className="h-5 w-5" src={Icons.Search} alt="search" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#181825] border border-border rounded-md mr-4 p-2 pl-10 w-64 h-10"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 ml-3 flex items-center pointer-events-none">
            <Image className="h-7 w-7" src={Icons.Currency} alt="currency" />
          </div>
          <select className="bg-[#181825] border border-border rounded-md mr-4 p-2 pl-10 h-10">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="EUR">GBP</option>
            <option value="EUR">JPY</option>
            <option value="EUR">RMB</option>
            <option value="EUR">KRW</option>
          </select>
        </div>
        <button
          className="flex items-center bg-[#181825] border border-border rounded-xl p-2 h-10"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? (
            <Image className="h-5 w-5" src={Icons.Dark} alt="Dark" />
          ) : (
            <Image className="h-5 w-5" src={Icons.Light} alt="Light" />
          )}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
