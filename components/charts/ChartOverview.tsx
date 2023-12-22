"use client";

import { useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TimeChart from "../TimeChart";
import { useAppDispatch, useAppSelector } from "../../app/store/hooks";
import { fetchChartData } from "../../app/store/slices/chartDataSlice";
import { formatCurrency } from "@/utils/utils";
import { options, getLatestData, prepareChartData } from "../../utils/chartUtils"
ChartJS.register(...registerables);


const ChartOverview = () => {
  const dispatch = useAppDispatch();
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const selectedCoins = useAppSelector((state) => state.selectedCoinData.coins);
  const chartData = useAppSelector((state) => state.chartData);
  const latestPriceData = chartData.length > 0 ? getLatestData(chartData[0].prices) 
  : { lastValue: null, lastDate: null };
  const latestVolumeData = chartData.length > 0 ? getLatestData(chartData[0].total_volumes) 
  : { lastValue: null, lastDate: null };

  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, selectedCoins: selectedCoins })
    );
  }, [dispatch, timeFrame, selectedCoins]);

return (
  <div>
      <div className="md:flex justify-between my-3 md:space-x-5">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
          <div className="absolute text-sm">
          <div className="absolute text-sm">
            <p>Price</p>
            {latestPriceData.lastValue !== null ? (
              <>
                <p className="text-2xl">{formatCurrency(latestPriceData.lastValue)}</p>
                <p>{latestPriceData.lastDate}</p>
              </>
            ) : (
              <p>No price data available</p>
            )}
          </div>
          </div>
          <Line data={prepareChartData(chartData, 'line')} options={options} />

        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white">
          <div className="absolute text-sm">
            <p>Volume</p>
            {latestVolumeData.lastValue !== null ? (
              <>
                <p className="text-2xl">{formatCurrency(latestVolumeData.lastValue)}</p>
                <p>{latestVolumeData.lastDate}</p>
              </>
            ) : (
              <p>No volume data available</p>
            )}
          </div>
          <Bar data={prepareChartData(chartData, 'bar')} options={options} />
        </div>
      </div>
      <TimeChart />
    </div>
  );
};

export default ChartOverview;
