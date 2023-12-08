"use client";

import { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { formatCurrency } from "@/utils/utils";

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
    <div>
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
            <tr key={coin.id} className="border-b border-gray-500">
              <td className="w-1/12">{index + 1}</td>
              <td className="w-1/12">
                <img src={coin.image} className="w-8 h-8 inline-block" />{" "}
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
                  progress={Math.min(
                    Math.round((coin.total_volume / coin.market_cap) * 100),
                    100
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
