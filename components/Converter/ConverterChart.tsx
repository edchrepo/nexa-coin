"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, TooltipItem, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { CoinData } from "@/store/slices/coinsDataSlice";
import { ChartData } from "@/store/slices/chartDataSlice";
import { currencyMap, formatCurrencyCommas } from "@/utils/utils";
import {
  options,
  prepareConverterData,
} from "../../utils/chartUtils";
import { useAppSelector } from "@/store/hooks";
ChartJS.register(...registerables);

interface ConverterChartProps {
  fromData?: CoinData;
  toData?: CoinData;
  toAmount: number;
  chartData: ChartData[];
}

const ConverterChart = ({
  fromData,
  toData,
  toAmount,
  chartData,
}: ConverterChartProps) => {
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const currency = useAppSelector((state) => state.currency.value);
  const [price, setPrice] = useState<number>(toAmount);
  const [time, setTime] = useState<string>(new Date().toDateString());

  // Extra options for hovering tooltip functionality
  const converterOptions = {
    ...options,
    responsive: true,
    plugins: {
      ...options.plugins,
      tooltip: {
        ...options.plugins.tooltip,
        callbacks: {
          ...options.plugins.tooltip.callbacks,
          title: function (tooltipItems: TooltipItem<"line">[]) {
            if (tooltipItems) {
              const price = tooltipItems[0].raw
              const timestamp = chartData[0].prices[tooltipItems[0].dataIndex][0];

              setPrice(price as number);
              setTime(new Date(timestamp).toLocaleString());

              // Display tooltip information
              return new Date(timestamp).toLocaleString("default", {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            }
            return "";
          },
        },
      },
    },
  };

  useEffect(() => {
    setPrice(toAmount)
    setTime(new Date().toDateString())
  }, [chartData])

  return (
    <div className="sm:h-[250px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
      <div className="absolute">
        <p className="text-[#424286] dark:text-secondary mb-3">
          {fromData?.name} ({fromData?.symbol.toUpperCase()}) to {toData?.name}{" "}
          ({toData?.symbol.toUpperCase()})
        </p>
        <p className="text-2xl">
          {formatCurrencyCommas(
            price || toAmount,
            currency as keyof typeof currencyMap
          )}
        </p>
        <p className="text-secondary"> {time || new Date().toDateString()}</p>
      </div>
      <div className="w-full h-full pb-4">
        <Line
          data={prepareConverterData(
            chartData,
            fromData?.current_price ?? 0,
            toData?.current_price ?? 0,
            timeFrame
          )}
          options={converterOptions}
        />
      </div>
    </div>
  );
};

export default ConverterChart;
