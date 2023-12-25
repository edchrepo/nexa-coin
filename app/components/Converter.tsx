"use client";

import { useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import TimeChart from "@/app/components/Charts/TimeChart";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import * as Icons from "../icons";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { fetchChartData } from "@/app/store/slices/chartDataSlice";
import { options, prepareChartData } from "../utils/chartUtils";
ChartJS.register(...registerables);

const Converter = () => {
  const chartData = useAppSelector((state) => state.chartData);
  const dispatch = useAppDispatch();
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(fetchChartData({ timeFrame: timeFrame, selectedCoins: [] }));
  }, [dispatch, timeFrame]);

  return (
    // Dummy Data for now
    <div>
      <div className="mt-9 mb-5">
        <p className="text-lg text-[#424286] dark:text-white">
          Online currency converter
        </p>
        <p className="text-[#3c3c7e] dark:text-secondary">
          {new Date().toLocaleString()}
        </p>
      </div>
      <div className="md:flex items-center justify-between relative">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
          <div>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary">
              You sell
            </p>
            <div className="flex space-x-2 mt-7 mb-3">
              <Image className="w-5" src={Icons.BitcoinIcon} alt="BTC" />
              <p>Bitcoin (BTC)</p>
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 BTC = $26,250.15
            </p>
          </div>
        </div>
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ top: "50%", left: "50%" }}
        >
          {theme === "light" ? (
            <Image
              className="w-[50px]"
              src={Icons.ConverterIcon}
              alt="ConverterIcon"
            />
          ) : (
            <Image
              className="w-[50px]"
              src={Icons.WhiteConverterIcon}
              alt="WhiteConverterIcon"
            />
          )}
        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white ml-5">
          <div>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary">
              You buy
            </p>
            <div className="flex space-x-2 mt-7 mb-3">
              <Image className="w-5" src={Icons.EthereumIcon} alt="ETH" />
              <p>Ethereum (ETH)</p>
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 BTC = $8,914.12
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[450px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
        <p className="text-[#424286] dark:text-white">
          Bitcoin(BTC) to Ethereum(ETH)
        </p>
        <div className="w-full h-full p-4">
          <Line
            data={prepareChartData(chartData, "line")}
            options={{
              ...options,
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      </div>
      <TimeChart />
    </div>
  );
};

export default Converter;
