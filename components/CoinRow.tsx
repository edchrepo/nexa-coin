import React from "react";
import Image from "next/image";
import * as Icons from "../icons";
import ProgressBar from "./ProgressBar";
import { formatCurrency } from "@/utils/utils";
import { CoinData } from "@/app/store/slices/coinsDataSlice";
import { Line } from "react-chartjs-2";

interface CoinProps {
  coin: CoinData;
  index: number;
}

const CoinRow: React.FC<CoinProps> = ({ coin, index }) => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    },
  };

  const chartData = {
    labels: coin.sparkline_in_7d.price.map((_, index) => index),
    datasets: [
      {
        data: coin.sparkline_in_7d.price,
        tension: 0.4,
        borderColor:
          coin.price_change_percentage_24h_in_currency > 0
            ? "#00b1a6"
            : "#fe2264",
      },
    ],
  };

  return (
    <div className="grid grid-cols-48 gap-2 bg-white dark:bg-[#181825] border-[#181825] rounded-xl my-2 items-center">
      <div className="col-span-2 text-center text-[#3c3c7e] dark:text-secondary">
        {index + 1}
      </div>
      <div className="col-span-6 text-black dark:text-white">
        <img
          src={coin.image}
          className="w-8 h-8 inline-block"
          alt={coin.name}
        />{" "}
        {coin.name} ({coin.symbol.toUpperCase()})
      </div>
      <div className="col-span-4 text-black dark:text-white">
        ${coin.current_price}
      </div>
      <div
        className={`col-span-4 flex items-center ${
          coin.price_change_percentage_1h_in_currency > 0
            ? "text-[#00b1a6]"
            : "text-[#fe2264]"
        }`}
      >
        {coin.price_change_percentage_1h_in_currency > 0 ? (
          <Image className="h-3 w-3 mr-1" src={Icons.UpArrow} alt="+" />
        ) : (
          <Image className="h-3 w-3 mr-1" src={Icons.DownArrow} alt="-" />
        )}
        {Math.abs(
          Math.round(100 * coin.price_change_percentage_1h_in_currency) / 100
        )}
        %
      </div>
      <div
        className={`col-span-4 flex items-center ${
          coin.price_change_percentage_24h_in_currency > 0
            ? "text-[#00b1a6]"
            : "text-[#fe2264]"
        }`}
      >
        {coin.price_change_percentage_24h_in_currency > 0 ? (
          <Image className="h-3 w-3 mr-1" src={Icons.UpArrow} alt="+" />
        ) : (
          <Image className="h-3 w-3 mr-1" src={Icons.DownArrow} alt="-" />
        )}
        {Math.abs(
          Math.round(100 * coin.price_change_percentage_24h_in_currency) / 100
        )}
        %
      </div>
      <div
        className={`col-span-4 flex items-center ${
          coin.price_change_percentage_7d_in_currency > 0
            ? "text-[#00b1a6]"
            : "text-[#fe2264]"
        }`}
      >
        {coin.price_change_percentage_7d_in_currency > 0 ? (
          <Image className="h-3 w-3 mr-1" src={Icons.UpArrow} alt="+" />
        ) : (
          <Image className="h-3 w-3 mr-1" src={Icons.DownArrow} alt="-" />
        )}
        {Math.abs(
          Math.round(100 * coin.price_change_percentage_7d_in_currency) / 100
        )}
        %
      </div>
      <div className="col-span-8 mr-4">
        <div className="flex justify-between">
          <div
            className={`${
              coin.price_change_percentage_24h_in_currency > 0
                ? "text-[#00b1a6]"
                : "text-[#fe2264]"
            }`}
          >
            {formatCurrency(coin.total_volume)}
          </div>
          <div className="text-black dark:text-white">
            {formatCurrency(coin.market_cap)}
          </div>
        </div>
        <ProgressBar
          progress={Math.min(
            Math.round((coin.total_volume / coin.market_cap) * 100),
            100
          )}
          color={`${
            coin.price_change_percentage_24h_in_currency > 0
              ? "#00b1a6"
              : "#fe2264"
          }`}
          secondaryColor={`${
            coin.price_change_percentage_24h_in_currency > 0
              ? "#afe5e5"
              : "#fbbad1"
          }`}
        />
      </div>
      <div className="col-span-8 mr-4">
        <div className="flex justify-between">
          <div
            className={`${
              coin.price_change_percentage_24h_in_currency > 0
                ? "text-[#00b1a6]"
                : "text-[#fe2264]"
            }`}
          >
            {formatCurrency(coin.circulating_supply)}
          </div>
          <div className="text-black dark:text-white">
            {formatCurrency(coin.total_supply)}
          </div>
        </div>
        <ProgressBar
          progress={Math.round(
            (coin.circulating_supply / coin.total_supply) * 100
          )}
          color={`${
            coin.price_change_percentage_24h_in_currency > 0
              ? "#00b1a6"
              : "#fe2264"
          }`}
          secondaryColor={`${
            coin.price_change_percentage_24h_in_currency > 0
              ? "#afe5e5"
              : "#fbbad1"
          }`}
        />
      </div>
      <div className="col-span-6">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default CoinRow;
