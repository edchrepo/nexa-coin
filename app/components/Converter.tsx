"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import TimeFrameSelector from "@/app/components/TimeFrameSelector";
import { useTheme } from "@/app/context/ThemeContext";
import Image from "next/image";
import * as Icons from "../icons";
import { useAppSelector, useAppDispatch } from "@/app/store/hooks";
import { fetchChartData } from "@/app/store/slices/chartDataSlice";
import { options, prepareConverterData } from "../utils/chartUtils";
import { convert } from "../utils/converterUtils"
ChartJS.register(...registerables);

const Converter = () => {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("ethereum");
  const chartData = useAppSelector((state) => state.chartData);
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const coins = useAppSelector((state) => state.coinsData);
  const fromData = coins.find((obj) => obj.id === fromCurrency);
  const toData = coins.find((obj) => obj.id === toCurrency);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, selectedCoins: [fromCurrency] })
    );
    console.log(coins);
    console.log(chartData)
  }, [dispatch, timeFrame]);

  return (
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
            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex space-x-2 items-center">
                <img
                  src={fromData?.image}
                  className="w-5 h-5"
                  alt={fromData?.name}
                />
                <p>
                  {fromData?.name} ({fromData?.symbol.toUpperCase()})
                </p>
              </div>
              <p>
                1
              </p>
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 {fromData?.symbol.toUpperCase()} = $
              {fromData?.current_price}
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
            <div className="flex items-center justify-between mt-7 mb-3">
              <div className="flex space-x-2 items-center">
                <img src={toData?.image} className="w-5 h-5" alt={toData?.name} />
                <p>
                  {toData?.name} ({toData?.symbol.toUpperCase()})
                </p>
              </div>
              <p>
                {convert(1, fromData?.current_price ?? 0, toData?.current_price ?? 0)}
              </p>
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 {toData?.symbol.toUpperCase()} = ${toData?.current_price}
            </p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[450px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
        <p className="text-[#424286] dark:text-white">
          {fromData?.name} ({fromData?.symbol.toUpperCase()}) to {toData?.name} (
          {toData?.symbol.toUpperCase()})
        </p>
        <div className="w-full h-full p-4">
          <Line
            data={prepareConverterData(chartData, fromData?.current_price ?? 0, toData?.current_price ?? 0)}
            options={{
              ...options,
              maintainAspectRatio: false,
              responsive: true,
            }}
          />
        </div>
      </div>
      <TimeFrameSelector />
    </div>
  );
};

export default Converter;
