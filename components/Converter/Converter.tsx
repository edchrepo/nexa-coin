"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import TimeFrameSelector from "@/components/TimeFrameSelector";
import ConverterChart from "./ConverterChart";
import CustomSelect from "./CustomSelect";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import * as Icons from "@/icons";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchChartData } from "@/store/slices/chartDataSlice";
import { currencyMap, formatCurrency } from "../../utils/utils";
import { convert } from "../../utils/converterUtils";
import ChartSkeleton from "../Charts/ChartSkeleton";
ChartJS.register(...registerables);

const Converter = () => {
  const [fromCurrency, setFromCurrency] = useState("bitcoin");
  const [toCurrency, setToCurrency] = useState("ethereum");
  const chartData = useAppSelector((state) => state.chartData);
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const currency = useAppSelector((state) => state.currency.value);
  const coins = useAppSelector((state) => state.coinsData);
  const fromData = coins.find((obj) => obj.id === fromCurrency);
  const toData = coins.find((obj) => obj.id === toCurrency);
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [fromAmount, setFromAmount] = useState(1);
  const [toAmount, setToAmount] = useState(
    convert(
      fromAmount,
      fromData?.current_price ?? 0,
      toData?.current_price ?? 0
    )
  );

  const FROM_CURRENCY = "from";
  const TO_CURRENCY = "to";

  // Load initial chart data, updates whenever either currency or timeFrame changes
  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, currency: currency, selectedCoins: [fromCurrency] })
    );
  }, [dispatch, timeFrame, currency, fromCurrency, toCurrency]);

  // Effect for updating amounts when fromCurrency changes
  useEffect(() => {
    if (fromData && toData) {
      const newToAmount = convert(
        fromAmount,
        fromData.current_price,
        toData.current_price
      );
      setToAmount(newToAmount);
    }
  }, [fromCurrency]);

  // Effect for updating amounts when toCurrency changes
  useEffect(() => {
    if (fromData && toData) {
      const newFromAmount = convert(
        toAmount,
        toData.current_price,
        fromData.current_price
      );
      setFromAmount(newFromAmount);
    }
  }, [toCurrency]);

  // Updates conversion values
  const handleAmountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    direction: string
  ) => {
    const newAmount = Number(event.target.value);
    if (direction === FROM_CURRENCY) {
      setFromAmount(newAmount);
      const newToAmount = convert(
        newAmount,
        fromData?.current_price ?? 0,
        toData?.current_price ?? 0
      );
      setToAmount(newToAmount);
    } else if (direction === TO_CURRENCY) {
      setToAmount(newAmount);
      const newFromAmount = convert(
        newAmount,
        toData?.current_price ?? 0,
        fromData?.current_price ?? 0
      );
      setFromAmount(newFromAmount);
    }
  };

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
              <CustomSelect
                options={coins}
                selectedValue={fromData}
                onSelect={(selectedCoin) => setFromCurrency(selectedCoin.id)}
              />
              <input
                type="number"
                value={Math.round(fromAmount * 1000) / 1000}
                onChange={(e) => handleAmountChange(e, FROM_CURRENCY)}
                className="bg-transparent text-right border-none focus:outline-none"
              />
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 {fromData?.symbol.toUpperCase()} =
              {formatCurrency(
                fromData?.current_price || 0,
                currency as keyof typeof currencyMap
              )}
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
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white mt-5 md:ml-5 md:mt-0">
          <div>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary">
              You buy
            </p>
            <div className="flex items-center justify-between mt-7 mb-3">
              <CustomSelect
                options={coins}
                selectedValue={toData}
                onSelect={(selectedCoin) => setToCurrency(selectedCoin.id)}
              />
              <input
                type="number"
                value={Math.round(toAmount * 1000) / 1000}
                onChange={(e) => handleAmountChange(e, TO_CURRENCY)}
                className="bg-transparent text-right border-none focus:outline-none"
              />
            </div>
            <hr className="" />
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">
              1 {toData?.symbol.toUpperCase()} =
              {formatCurrency(
                toData?.current_price || 0,
                currency as keyof typeof currencyMap
              )}
            </p>
          </div>
        </div>
      </div>
      {chartData.length !== 0 ? (
        <ConverterChart
          fromData={fromData}
          toData={toData}
          toAmount={toAmount}
          chartData={chartData}
        />
      ) : (
        <div className="mt-10 p-7 rounded-[20px] bg-white dark:bg-[#191932]">
          <ChartSkeleton />
        </div>
      )}
      <TimeFrameSelector />
    </div>
  );
};

export default Converter;
