"use client";

import { useState, useEffect } from "react";
import { Chart as ChartJS, TooltipItem, registerables } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TimeFrameSelector from "../TimeFrameSelector";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchChartData } from "@/store/slices/chartDataSlice";
import { borderColors } from "@/utils/chartUtils";
import {
  currencyMap,
  formatCurrency,
  formatCurrencyCommas,
} from "@/utils/utils";
import {
  options,
  getLatestData,
  prepareChartData,
} from "../../utils/chartUtils";
import ChartSkeleton from "./ChartSkeleton";
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
  const [priceData, setPriceData] = useState<number>(
    latestPriceData.lastValue || 0
  );
  const [priceTime, setPriceTime] = useState<string>(
    latestPriceData.lastDate || ""
  );
  const [volumeData, setVolumeData] = useState<number>(
    latestVolumeData.lastValue || 0
  );
  const [volumeTime, setVolumeTime] = useState<string>(
    latestVolumeData.lastDate || ""
  );
  const [multiLineData, setMultiLineData] = useState<number[]>([0, 0, 0]);
  const [multiBarData, setMultiBarData] = useState<number[]>([0, 0, 0]);

  const updateMultiChartData = (
    index: number,
    newValue: number,
    type: string
  ) => {
    if (type === "line") {
      setMultiLineData((arr) =>
        arr.map((item, i) => (i === index ? newValue : item))
      );
    } else {
      setMultiBarData((arr) =>
        arr.map((item, i) => (i === index ? newValue : item))
      );
    }
  };

  // Extra options for hovering tooltip functionality
  const lineChartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        ...options.plugins.tooltip,
        callbacks: {
          ...options.plugins.tooltip.callbacks,
          title: function (tooltipItems: TooltipItem<"line">[]) {
            //If more than 1 tooltipItem (more than 1 coin shown), handle comparison options
            if (tooltipItems.length > 1) {
              tooltipItems.map((tooltipItem, index) =>
                updateMultiChartData(
                  index,
                  chartData[index].prices[tooltipItem.dataIndex][1],
                  "line"
                )
              );
            }
            // Grab index for first coin data to display on top of chart
            const dataIndex = tooltipItems[0].dataIndex;
            const price = chartData[0].prices[dataIndex][1];
            const timestamp = chartData[0].prices[dataIndex][0];

            //If just one tooltipitem (only 1 chart), handle data displayed for 1 chart
            if (tooltipItems.length === 1) {
              setPriceData(price);
              setPriceTime(new Date(timestamp).toLocaleString());
            }

            // Display tooltip information
            return new Date(timestamp).toLocaleString("default", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          },
        },
      },
    },
  };

  // Extra options for hovering tooltip functionality
  const barChartOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      tooltip: {
        ...options.plugins.tooltip,
        callbacks: {
          ...options.plugins.tooltip.callbacks,
          title: function (tooltipItems: TooltipItem<"bar">[]) {
            //If more than 1 tooltipItem (more than 1 coin shown), handle comparison options
            if (tooltipItems.length > 1) {
              tooltipItems.map((tooltipItem, index) =>
                updateMultiChartData(
                  index,
                  chartData[index].total_volumes[tooltipItem.dataIndex][1],
                  "bar"
                )
              );
            }
            // Grab index for first coin data to display on top of chart
            const dataIndex = tooltipItems[0].dataIndex;
            const volume = chartData[0].total_volumes[dataIndex][1];
            const timestamp = chartData[0].total_volumes[dataIndex][0];

            //If just one tooltipitem (only 1 chart), handle data displayed for 1 chart
            if (tooltipItems.length === 1) {
              setVolumeData(volume);
              setVolumeTime(new Date(timestamp).toLocaleString());
            }

            // Display tooltip information
            return new Date(timestamp).toLocaleString("default", {
              month: "short",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            });
          },
        },
      },
    },
  };

  useEffect(() => {
    dispatch(
      fetchChartData({
        timeFrame: timeFrame,
        currency: currency,
        selectedCoins: selectedCoins,
      })
    );
  }, [dispatch, timeFrame, currency, selectedCoins]);

  useEffect(() => {
    if (chartData.length > 0) {
      const newLatestPriceData = getLatestData(chartData[0]?.prices);
      const newLatestVolumeData = getLatestData(chartData[0]?.total_volumes);
  
      if (newLatestPriceData.lastValue !== null && newLatestPriceData.lastDate !== null) {
        setPriceData(newLatestPriceData.lastValue);
        setPriceTime(newLatestPriceData.lastDate);
      }
  
      if (newLatestVolumeData.lastValue !== null && newLatestVolumeData.lastDate !== null) {
        setVolumeData(newLatestVolumeData.lastValue);
        setVolumeTime(newLatestVolumeData.lastDate);
      }
    }
  }, [chartData]); 

  return (
    <div>
      <div className="md:flex justify-between my-3 space-y-5 sm:space-y-5 md:space-y-0 lg:space-y-0 md:space-x-5 lg:space-x-5">
        <div className="md:w-[50%] sm:w-[100%] h-[250px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white flex flex-col justify-between">
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
                      {formatCurrency(
                        priceData || latestPriceData.lastValue,
                        currency as keyof typeof currencyMap
                      )}
                    </p>
                    <p className="text-secondary">
                      {priceTime || latestPriceData.lastDate}
                    </p>
                  </>
                ) : (
                  <p className="animate-pulse">Loading Price Data...</p>
                )}
              </div>
            )}
          </div>
          {latestPriceData.lastValue !== null ? (
            <Line
              data={prepareChartData(chartData, "line", timeFrame)}
              options={lineChartOptions}
            />
          ) : (
            <div className="mt-auto">
              <ChartSkeleton />
            </div>
          )}
          {selectedCoins.length > 1 && (
            <div className="flex space-x-3 mt-auto">
              {selectedCoins.map((selectedCoin, index) => (
                <div key={index} className="flex space-x-1">
                  <div
                    className={`w-5 h-5`}
                    style={{ backgroundColor: borderColors[index] }}
                  />
                  <p>
                    {selectedCoin}{" "}
                    {multiLineData[index] !== 0
                      ? formatCurrencyCommas(
                          multiLineData[index],
                          currency as keyof typeof currencyMap
                        )
                      : formatCurrencyCommas(
                          coins.find((obj) => obj.id === selectedCoin)
                            ?.current_price as number,
                          currency as keyof typeof currencyMap
                        )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="md:w-[50%] sm:w-[100%] h-[250px] md:h-[350px] lg:h-[350px] xl:h-[400px] 2xl:h-[500px] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white flex flex-col justify-between">
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
                      {formatCurrency(
                        volumeData || latestVolumeData.lastValue,
                        currency as keyof typeof currencyMap
                      )}
                    </p>
                    <p className="text-secondary">
                      {volumeTime || latestVolumeData.lastDate}
                    </p>
                  </>
                ) : (
                  <p className="animate-pulse">Loading Volume Data...</p>
                )}
              </div>
            )}
          </div>
          {latestPriceData.lastValue !== null ? (
            <Bar
              data={prepareChartData(chartData, "bar", timeFrame)}
              options={barChartOptions}
            />
          ) : (
            <div className="mt-auto">
              <ChartSkeleton />
            </div>
          )}
          {selectedCoins.length > 1 && (
            <div className="flex space-x-3 mt-auto">
              {selectedCoins.map((selectedCoin, index) => (
                <div key={index} className="flex space-x-1">
                  <div
                    className={`w-5 h-5`}
                    style={{ backgroundColor: borderColors[index] }}
                  />
                  <p>
                    {selectedCoin}{" "}
                    {multiBarData[index] !== 0
                      ? formatCurrency(
                          multiBarData[index],
                          currency as keyof typeof currencyMap
                        )
                      : formatCurrency(
                          coins.find((obj) => obj.id === selectedCoin)
                            ?.total_volume as number,
                          currency as keyof typeof currencyMap
                        )}
                  </p>
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
