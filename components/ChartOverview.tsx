"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
ChartJS.register(...registerables);

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

const ChartOverview = () => {
  const [chartData, setChartData] = useState({
    prices: [],
    market_caps: [],
    total_volumes: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
      );
      const data = await response.json();
      setChartData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      Overview
      <div className="md:flex justify-between my-3 md:space-x-5 sm:space-y-5">
        <div className="md:w-[50%] sm:w-[100%] bg-[#191b1f] p-7 rounded-[20px]">
          <div className="absolute text-sm">
            <p>Price</p>
            {chartData.prices.length > 0 ? (
              <>
                <p className="text-2xl">{`$${
                  Math.ceil(chartData.prices[chartData.prices.length - 1][1]) /
                  1000
                } ths`}</p>
                <p>
                  {new Date(
                    chartData.prices[chartData.prices.length - 1][0]
                  ).toDateString()}
                </p>
              </>
            ) : (
              <p>No price data available</p>
            )}
          </div>
          <Line
            data={{
              labels: chartData.prices.map((price) =>
                new Date(price[0]).getDate()
              ),
              datasets: [
                {
                  data: chartData.prices.map((price) => new Date(price[1])),
                  tension: 0.4,
                  borderColor: "rgba(0,255,95,255)",
                  backgroundColor: "rgba(0,255,95,255)",
                },
              ],
            }}
            options={options}
          />
        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-[#191b1f] p-7 rounded-[20px]">
          <div className="absolute text-sm">
            <p>Volume</p>
            {chartData.total_volumes.length > 0 ? (
              <>
                <p className="text-2xl">{`$${
                  Math.ceil(
                    chartData.total_volumes[
                      chartData.total_volumes.length - 1
                    ][1]
                  ) / 1000000000
                } bln`}</p>
                <p>
                  {new Date(
                    chartData.total_volumes[
                      chartData.total_volumes.length - 1
                    ][0]
                  ).toDateString()}
                </p>
              </>
            ) : (
              <p>No volume data available</p>
            )}
          </div>
          <Bar
            data={{
              labels: chartData.total_volumes.map((vol) =>
                new Date(vol[0]).getDate()
              ),
              datasets: [
                {
                  data: chartData.total_volumes.map((vol) => new Date(vol[1])),
                  backgroundColor: "rgba(33,114,229,255)",
                  borderRadius: 3,
                },
              ],
            }}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOverview;
