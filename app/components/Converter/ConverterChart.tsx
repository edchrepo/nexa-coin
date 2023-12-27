"use client";

import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { CoinData } from "@/app/store/slices/coinsDataSlice";
import { ChartData } from "@/app/store/slices/chartDataSlice";
import { options, prepareConverterData } from "../../utils/chartUtils";
ChartJS.register(...registerables);

interface ConverterChartProps {
    fromData?: CoinData;
    toData?: CoinData;
    chartData: ChartData[];
}

const ConverterChart = ({ fromData, toData, chartData }: ConverterChartProps) => {
    return (
    <div className="w-[100%] h-[450px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
      <p className="text-[#424286] dark:text-white">
        {fromData?.name} ({fromData?.symbol.toUpperCase()}) to {toData?.name} (
        {toData?.symbol.toUpperCase()})
      </p>
      <div className="w-full h-full p-4">
        <Line
          data={prepareConverterData(
            chartData,
            fromData?.current_price ?? 0,
            toData?.current_price ?? 0
          )}
          options={{
            ...options,
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default ConverterChart;
