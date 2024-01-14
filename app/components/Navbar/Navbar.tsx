"use client";

import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/app/icons";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from 'next/navigation'
import { useAppSelector } from "@/app/store/hooks";
import { CoinData } from "@/app/store/slices/coinsDataSlice";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  // only allow user to submit search if searchterm is a valid coin name
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  const [activeLink, setActiveLink] = useState("home");
  const coins = useAppSelector((state) => state.coinsData);
  const { theme } = useTheme();
  const router = useRouter();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredCoins(filterCoins(e.target.value));

    // Check if the search value matches the name property of any coin
    const isMatchingCoin = coins.some((coin) => coin.name.toLowerCase() === e.target.value.toLowerCase());
    setIsSubmitEnabled(isMatchingCoin);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isSubmitEnabled) {
      const coinToSearch = coins.find((coin) => coin.name.toLowerCase() === search.toLowerCase());
      if (coinToSearch) {
        router.push(`/${coinToSearch.id}`);
      }
    }
  };

  const filterCoins = (search: string) => {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    return coins.filter((coin) => regex.test(coin.name));
  };

  return (
    <nav className="relative flex items-center justify-between p-4 w-[90%]">
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
          <div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                className="bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md mr-4 p-2 pl-10 w-96 h-10"
                value={search}
                onChange={handleChange}
                placeholder="Search..."
              />
            </form>
            {search && (
              <div className="absolute z-50 bg-white dark:bg-[#1e1932] max-h-[500px] w-full overflow-y-auto">
                {filteredCoins.map((coin) => (
                  <div
                    key={coin.id}
                    className="ml-2"
                    onClick={() => router.push(`/${coin.id}`)}
                  >
                    {coin.name}
                  </div>
                ))}
              </div>
            )}
          </div>
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
