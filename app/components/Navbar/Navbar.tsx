"use client";

import { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/app/icons";
import ThemeSwitch from "./ThemeSwitch";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { CoinData } from "@/app/store/slices/coinsDataSlice";
import { setCurrency } from "@/app/store/slices/currencySlice";

const currencyOptions = [
  { value: "usd", label: "USD" },
  { value: "eur", label: "EUR" },
  { value: "gbp", label: "GBP" },
  { value: "jpy", label: "JPY" },
  { value: "krw", label: "KRW" },
];

const Navbar = () => {
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const [filteredCoins, setFilteredCoins] = useState<CoinData[]>([]);
  // Only allow user to submit search if searchterm is a valid coin name
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);
  // Allows user to press up and down when searching for coin to focus/highlight a coin
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [activeLink, setActiveLink] = useState("home");
  const coins = useAppSelector((state) => state.coinsData);
  const { theme } = useTheme();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setFilteredCoins(filterCoins(e.target.value));

    // Check if the search value matches the name property of any coin
    const isMatchingCoin = coins.some(
      (coin) => coin.name.toLowerCase() === e.target.value.toLowerCase()
    );
    setIsSubmitEnabled(isMatchingCoin);
    if (e.target.value.length === 0) {
      setFocusedIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newIndex = -1;
    if (e.key === "ArrowDown") {
      newIndex =
        focusedIndex < filteredCoins.length - 1
          ? focusedIndex + 1
          : focusedIndex;
      setFocusedIndex(newIndex);
    } else if (e.key === "ArrowUp") {
      newIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
      setFocusedIndex(newIndex);
    } else if (e.key === "Enter" && focusedIndex !== -1) {
      const selectedCoin = filteredCoins[focusedIndex];
      if (selectedCoin) {
        router.push(`/${selectedCoin.id}`);
        setSearch("");
        setFocusedIndex(-1);
      }
      return;
    }
    if (newIndex !== -1) {
      const focusedCoin = filteredCoins[newIndex];
      setSearch(focusedCoin ? focusedCoin.name : "");
    }
  };

  const handleClick = (search: string) => {
    router.push(search);
    setSearch("");
    setFocusedIndex(-1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isSubmitEnabled) {
      const coinToSearch = coins.find(
        (coin) => coin.name.toLowerCase() === search.toLowerCase()
      );
      if (coinToSearch) {
        router.push(`/${coinToSearch.id}`);
      }
    }
  };

  const handleCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedCurrency: string = e.target.value;
    dispatch(setCurrency(selectedCurrency));
  };

  const filterCoins = (search: string) => {
    const regex = new RegExp(search, "i"); // 'i' flag for case-insensitive search
    return coins.filter((coin) => regex.test(coin.name));
  };

  return (
    <nav className="flex items-center justify-between p-4 w-[90%]">
      {/* Logo Section */}
      <div className="lg:hidden">$$$</div>
      <div className="hidden lg:flex items-center">
        {theme === "light" ? (
          <Image className="w-[150px]" src={Icons.logolight} alt="NexaCoin" />
        ) : (
          <Image className="w-[150px]" src={Icons.logo} alt="NexaCoin" />
        )}
      </div>

      {/* Page Section */}
      <div className="hidden md:flex items-center">
        <Link
          className={`flex items-center p-2 mr-4 rounded cursor-pointer ${
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
          <button className="flex items-center bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md p-2 h-10 mr-4 sm:hidden">
            <Image className="h-5 w-5" src={Icons.Search} alt="search" />
          </button>
          <div className="hidden sm:flex absolute inset-y-0 ml-3 items-center pointer-events-none">
            <Image className="h-5 w-5" src={Icons.Search} alt="search" />
          </div>
          <form onSubmit={handleSubmit} className="hidden sm:block">
            <input
              type="text"
              className="bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md mr-4 p-2 pl-10 h-10"
              value={search}
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              placeholder="Search..."
            />
          </form>
          {search && (
            <div className="absolute z-50 bg-white dark:bg-[#1e1932] max-h-[500px] w-full overflow-y-auto">
              {filteredCoins.map((coin, index) => (
                <div
                  key={coin.id}
                  className={`ml-2 hover:bg-blue-100 cursor-pointer ${
                    index === focusedIndex ? "bg-blue-200" : ""
                  }`}
                  onClick={() => handleClick(`/${coin.id}`)}
                >
                  {coin.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 ml-3 flex items-center pointer-events-none">
            <Image className="h-7 w-7" src={Icons.Currency} alt="currency" />
          </div>
          <select
            className="bg-[#ebebfd] dark:bg-[#181825] border dark:border-border rounded-md mr-4 p-2 pl-10 h-10"
            onChange={handleCurrencyChange}
          >
            {currencyOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <ThemeSwitch />
      </div>
    </nav>
  );
};

export default Navbar;
