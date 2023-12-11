"use client";

import { useState, useEffect } from "react";
import CoinRow from "./CoinRow";

export interface CoinData {
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
      <div className="grid grid-cols-48 gap-2 text-left text-secondary mt-20 mb-5">
        <div className="col-span-2 text-center">#</div>
        <div className="col-span-6">Name</div>
        <div className="col-span-4">Price</div>
        <div className="col-span-4">1h%</div>
        <div className="col-span-4">24h%</div>
        <div className="col-span-4">7d%</div>
        <div className="col-span-8">24h Volume / Market Cap</div>
        <div className="col-span-8">Circulating / Total Supply</div>
        <div className="col-span-6">Last 7d</div>
      </div>
      {coins.map((coin, index) => (
        <CoinRow key={coin.id} coin={coin} index={index} />
      ))}
    </div>
  );
};

export default CoinsTable;
