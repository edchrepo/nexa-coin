"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "../icons";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const { theme } = useTheme();

  return (
    <nav className="flex items-center justify-between p-4 w-[90%]">
      {/* Logo Section */}
      <div className="flex items-center">
        {theme === "light" ? (
          <Image className="w-[150px]" src={Icons.logolight} alt="NexaCoin" />
        ) : (
          <Image className="w-[150px]" src={Icons.logo} alt="NexaCoin" />
        )}
      </div>

      {/* Page Section */}
      <div className="flex items-center">
        <Link
          className={`flex items-center mr-10 p-2 rounded cursor-pointer ${
            activeLink !== "home"
              ? "text-secondary"
              : "text-[#3c3c7e] dark:text-white"
          }`}
          onClick={() => setActiveLink("home")}
          href="/"
        >
          <Image
            className="h-7 w-7 mr-2"
            src={
              activeLink === "home"
                ? theme === "light"
                  ? Icons.HomeLight
                  : Icons.Home
                : Icons.HomeStatic
            }
            alt="home"
          />
          <p>Home</p>
        </Link>
        <Link
          className={`flex items-center p-2 rounded cursor-pointer ${
            activeLink !== "portfolio"
              ? "text-secondary"
              : "text-[#3c3c7e] dark:text-white"
          }`}
          onClick={() => setActiveLink("portfolio")}
          href="/portfolio"
        >
          <Image
            className="h-7 w-7 mr-2"
            src={
              activeLink === "portfolio"
                ? theme === "light"
                  ? Icons.StackLight
                  : Icons.Stack
                : Icons.StackStatic
            }
            alt="portfolio"
          />
          <p>Portfolio</p>
        </Link>
      </div>

      {/* Search and Settings Section */}
      <div className="flex items-center text-[#3c3c7e] dark:text-white">
        <div className="relative">
          <div className="absolute inset-y-0 ml-3 flex items-center pointer-events-none">
            <Image className="h-5 w-5" src={Icons.Search} alt="search" />
          </div>
          <input
            type="text"
            placeholder="Search..."
            className="bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md mr-4 p-2 pl-10 w-96 h-10"
          />
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 ml-3 flex items-center pointer-events-none">
            <Image className="h-7 w-7" src={Icons.Currency} alt="currency" />
          </div>
          <select className="bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md mr-4 p-2 pl-10 h-10">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="EUR">GBP</option>
            <option value="EUR">JPY</option>
            <option value="EUR">RMB</option>
            <option value="EUR">KRW</option>
          </select>
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
