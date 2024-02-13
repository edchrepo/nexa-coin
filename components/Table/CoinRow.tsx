import React from "react";
import Image from "next/image";
import Link from "next/link";
import * as Icons from "@/icons";
import ProgressBar from "@/components/ProgressBar";
import {
  currencyMap,
  formatCurrency,
  formatCurrencyCommas,
} from "@/utils/utils";
import { CoinData } from "@/store/slices/coinsDataSlice";
import { Line } from "react-chartjs-2";

interface CoinProps {
  coin: CoinData;
  index: number;
  currency: string;
}

const CoinRow: React.FC<CoinProps> = ({ coin, index, currency }) => {
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
        border: {
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
        border: {
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
    <Link href={`/${coin.id}`}>
      <div className="grid grid-cols-3 lg:grid-cols-48 gap-2 bg-white dark:bg-[#181825] border-[#181825] rounded-xl my-2 items-center">
        <div className="hidden lg:block col-span-1 text-center text-[#3c3c7e] dark:text-secondary">
          {index + 1}
        </div>
        <div className="lg:col-span-7 col-span-1 flex items-center space-x-2 text-black dark:text-white order-1 lg:order-none">
          <img
            src={coin.image}
            className="w-8 h-8 inline-block"
            alt={coin.name}
          />
          <div className="flex flex-col lg:flex-row">
            <span className="lg:mr-1">{coin.name}</span>
            <span>({coin.symbol.toUpperCase()})</span>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8 lg:flex order-3 lg:order-none">
          <div className="flex-1 text-black dark:text-white">
            {formatCurrencyCommas(
              coin.current_price,
              currency as keyof typeof currencyMap
            )}
          </div>
          <div
            className={`flex lg:flex-1 items-center ${
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
              Math.round(100 * coin.price_change_percentage_1h_in_currency) /
                100
            )}
            %
          </div>
        </div>
        <div
          className={`hidden lg:flex col-span-4 items-center ${
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
          className={`hidden lg:flex col-span-4 items-center ${
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
        <div className="hidden lg:block col-span-8 mr-4">
          <div className="flex justify-between">
            <div
              className={`${
                coin.price_change_percentage_24h_in_currency > 0
                  ? "text-[#00b1a6]"
                  : "text-[#fe2264]"
              }`}
            >
              {formatCurrency(
                coin.total_volume,
                currency as keyof typeof currencyMap
              )}
            </div>
            <div className="text-black dark:text-white">
              {formatCurrency(
                coin.market_cap,
                currency as keyof typeof currencyMap
              )}
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
        <div className="hidden lg:block col-span-8 mr-4">
          <div className="flex justify-between">
            <div
              className={`${
                coin.price_change_percentage_24h_in_currency > 0
                  ? "text-[#00b1a6]"
                  : "text-[#fe2264]"
              }`}
            >
              {formatCurrency(
                coin.circulating_supply,
                currency as keyof typeof currencyMap
              )}
            </div>
            <div className="text-black dark:text-white">
              {formatCurrency(
                coin.total_supply,
                currency as keyof typeof currencyMap
              )}
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
        <div className="lg:col-span-6 col-span-1 order-2 lg:order-none">
          <Line data={chartData} options={options} />
        </div>
      </div>
    </Link>
  );
};

export default CoinRow;
