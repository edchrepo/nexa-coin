"use client";

import { useEffect } from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TimeFrameSelector from "../TimeFrameSelector";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchChartData } from "@/app/store/slices/chartDataSlice";
import { borderColors } from "@/app/utils/chartUtils";
import { currencyMap, formatCurrency } from "@/app/utils/utils";
import {
  options,
  getLatestData,
  prepareChartData,
} from "../../utils/chartUtils";
ChartJS.register(...registerables);

const ChartOverview = () => {
  const dispatch = useAppDispatch();
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const currency = useAppSelector((state) => state.currency.value);
  const selectedCoins = useAppSelector((state) => state.selectedCoinData.coins);
  const coins = useAppSelector((state) => state.coinsData);
  const coinToPreview = coins.find((obj) => obj.id === selectedCoins[0]);
  const chartData = useAppSelector((state) => state.chartData);
  const latestPriceData =
    chartData.length > 0
      ? getLatestData(chartData[0].prices)
      : { lastValue: null, lastDate: null };
  const latestVolumeData =
    chartData.length > 0
      ? getLatestData(chartData[0].total_volumes)
      : { lastValue: null, lastDate: null };

  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, currency: currency, selectedCoins: selectedCoins })
    );
  }, [dispatch, timeFrame, currency, selectedCoins]);

  return (
    <div>
      <div className="md:flex justify-between my-3 md:space-x-5">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
          <div className="absolute text-sm">
            {selectedCoins.length > 1 ? (
              <p className="text-2xl">{new Date().toDateString()}</p>
            ) : (
              <div>
                <p className="text-secondary mb-3">
                  {coinToPreview ? coinToPreview.name : "Bitcoin"} (
                  {coinToPreview ? coinToPreview.symbol.toUpperCase() : "BTC"})
                </p>
                {latestPriceData.lastValue !== null ? (
                  <>
                    <p className="text-2xl">
                      {formatCurrency(latestPriceData.lastValue, currency as keyof typeof currencyMap)}
                    </p>
                    <p className="text-secondary">{latestPriceData.lastDate}</p>
                  </>
                ) : (
                  <p>No price data available</p>
                )}
              </div>
            )}
          </div>
          <Line data={prepareChartData(chartData, "line")} options={options} />
          {selectedCoins.length > 1 && (
            <div className="flex space-x-3 mt-3">
              {selectedCoins.map((selectedCoin, index) => (
                <div key={index} className="flex space-x-1">
                  <div
                    className={`w-5 h-5`}
                    style={{ backgroundColor: borderColors[index] }}
                  />
                  <p>{selectedCoin}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white">
          <div className="absolute text-sm">
            {selectedCoins.length > 1 ? (
              <div>
                <p className="text-2xl mb-2">Volume 24h</p>
                <p className="text-sm text-secondary">
                  {new Date().toDateString()}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-secondary mb-3">Volume 24h</p>
                {latestVolumeData.lastValue !== null ? (
                  <>
                    <p className="text-2xl">
                      {formatCurrency(latestVolumeData.lastValue, currency as keyof typeof currencyMap)}
                    </p>
                    <p className="text-secondary">
                      {latestVolumeData.lastDate}
                    </p>
                  </>
                ) : (
                  <p>No volume data available</p>
                )}
              </div>
            )}
          </div>
          <Bar data={prepareChartData(chartData, "bar")} options={options} />
          {selectedCoins.length > 1 && (
            <div className="flex space-x-3 mt-3">
              {selectedCoins.map((selectedCoin, index) => (
                <div key={index} className="flex space-x-1">
                  <div
                    className={`w-5 h-5`}
                    style={{ backgroundColor: borderColors[index] }}
                  />
                  <p>{selectedCoin}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <TimeFrameSelector />
    </div>
  );
};

export default ChartOverview;
