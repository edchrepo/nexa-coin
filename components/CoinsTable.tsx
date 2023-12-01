"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: {
    price: number[];
  };
}

const CoinsTable = () => {
  const [coins, setCoins] = useState<CoinData[]>([]);

  function formatCurrency(value: number): string {
    let formattedValue: string;

    // conversion to M, B, T
    if (value >= 1e12) {
      formattedValue = `$${(value / 1e12).toFixed(2)}T`;
    } else if (value >= 1e9) {
      formattedValue = `$${(value / 1e9).toFixed(2)}B`;
    } else if (value >= 1e6) {
      formattedValue = `$${(value / 1e6).toFixed(2)}M`;
    } else {
      formattedValue = `$${value}`;
    }

    return formattedValue;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full font-sans">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">TOP 50 by Market Cap</h1>
        <div>
          <div className="inline-block mr-4">
            Show:
            <select className="bg-[#1f2128]">
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
              <option value="50">50 per page</option>
            </select>
          </div>
          <div className="inline-block">
            Page:
            <button className="ml-2 mr-2">←</button>
            <span className="mx-1">1</span>
            <button className="mr-2">→</button>
          </div>
        </div>
      </div>
      <table className="table-fixed">
        <thead>
          <tr className="text-left border-b border-gray-500">
            <th className="w-1/12">#</th>
            <th className="w-1/12">Name</th>
            <th className="w-1/12">Current Price</th>
            <th className="w-1/12">1h</th>
            <th className="w-1/12">24h</th>
            <th className="w-1/12">7d</th>
            <th className="w-1/6">24h Vol / Market Cap</th>
            <th className="w-1/6">Circulating / Total Sup</th>
            <th className="w-1/6">Last 7d</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin, index) => (
            <tr key={coin.id}>
              <td className="w-1/12">{index + 1}</td>
              <td className="w-1/12">
                {coin.name} ({coin.symbol.toUpperCase()})
              </td>
              <td className="w-1/12">${coin.current_price}</td>
              <td
                className={`w-1/12 ${
                  coin.price_change_percentage_1h_in_currency > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Math.round(100 * coin.price_change_percentage_1h_in_currency) /
                  100}
                %
              </td>
              <td
                className={`w-1/12 ${
                  coin.price_change_percentage_24h_in_currency > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Math.round(
                  100 * coin.price_change_percentage_24h_in_currency
                ) / 100}
                %
              </td>
              <td
                className={`w-1/12 ${
                  coin.price_change_percentage_7d_in_currency > 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {Math.round(100 * coin.price_change_percentage_7d_in_currency) /
                  100}
                %
              </td>
              <td className="w-1/6">
                {formatCurrency(coin.total_volume)} /{" "}
                {formatCurrency(coin.market_cap)}
                <ProgressBar
                  progress={Math.round(
                    (coin.total_volume / coin.market_cap) * 100
                  )}
                />
              </td>
              <td className="w-1/6">
                {formatCurrency(coin.circulating_supply)} /{" "}
                {formatCurrency(coin.total_supply)}
                <ProgressBar
                  progress={Math.round(
                    (coin.circulating_supply / coin.total_supply) * 100
                  )}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoinsTable;
