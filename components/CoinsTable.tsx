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
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Current Price</th>
          <th>1h</th>
          <th>24h</th>
          <th>7d</th>
          <th>24h Vol / Market Cap</th>
          <th>Circulating / Total Sup</th>
          <th>Last 7d</th>
        </tr>
      </thead>
      <tbody>
        {coins.map((coin, index) => (
          <tr key={coin.id}>
            <td>{index + 1}</td>
            <td>
              {coin.name} ({coin.symbol.toUpperCase()})
            </td>
            <td>${coin.current_price}</td>
            <td>
              {Math.round(100 * coin.price_change_percentage_1h_in_currency) /
                100}
            </td>
            <td>
              {Math.round(100 * coin.price_change_percentage_24h_in_currency) /
                100}
            </td>
            <td>
              {Math.round(100 * coin.price_change_percentage_7d_in_currency) /
                100}
            </td>
            <td>
              {coin.total_volume} / {coin.market_cap}
            </td>
            <td>
              {coin.circulating_supply} / {coin.total_supply}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinsTable;
