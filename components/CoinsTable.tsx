"use client";

import { useState, useEffect } from "react";

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
    <table className="table-fixed w-full">
      <thead>
        <tr>
          <th className="w-1/8">#</th>
          <th className="w-1/8">Name</th>
          <th className="w-1/8">Current Price</th>
          <th className="w-1/8">1h</th>
          <th className="w-1/8">24h</th>
          <th className="w-1/8">7d</th>
          <th className="w-1/5">24h Vol / Market Cap</th>
          <th className="w-1/5">Circulating / Total Sup</th>
          <th className="w-1/8">Last 7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id}>
            <td className="w-1/8">{index + 1}</td>
            <td className="w-1/8">
              {coin.name} ({coin.symbol.toUpperCase()})
            </td>
            <td className="w-1/8">${coin.current_price}</td>
            <td className="w-1/8">
              {Math.round(100 * coin.price_change_percentage_1h_in_currency) /
                100}
            </td>
            <td className="w-1/8">
              {Math.round(100 * coin.price_change_percentage_24h_in_currency) /
                100}
            </td>
            <td className="w-1/8">
              {Math.round(100 * coin.price_change_percentage_7d_in_currency) /
                100}
            </td>
            <td className="w-1/5">
              {coin.total_volume} / {coin.market_cap}
            </td>
            <td className="w-1/5">
              {coin.circulating_supply} / {coin.total_supply}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTable;
