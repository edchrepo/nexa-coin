"use client";

import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import { CoinData } from "@/store/slices/coinsDataSlice";
import { ChartData } from "@/store/slices/chartDataSlice";
import { options, prepareConverterData } from "../../utils/chartUtils";
import { useAppSelector } from "@/store/hooks";
ChartJS.register(...registerables);

interface ConverterChartProps {
  fromData?: CoinData;
  toData?: CoinData;
  chartData: ChartData[];
}

const ConverterChart = ({
  fromData,
  toData,
  chartData,
}: ConverterChartProps) => {
  const timeFrame = useAppSelector((state) => state.time.timeFrame);

  return (
    <div className="sm:h-[250px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
      <p className="text-[#424286] dark:text-white">
        {fromData?.name} ({fromData?.symbol.toUpperCase()}) to {toData?.name} (
        {toData?.symbol.toUpperCase()})
      </p>
      <div className="w-full h-full pb-4">
        <Line
          data={prepareConverterData(
            chartData,
            fromData?.current_price ?? 0,
            toData?.current_price ?? 0,
            timeFrame
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
