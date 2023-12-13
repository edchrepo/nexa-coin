"use client";

import { useEffect } from "react";
import { Chart as ChartJS, registerables, ChartArea } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TimeChart from "./TimeChart";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { fetchChartData } from "../app/store/slices/chartDataSlice";
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
  const dispatch = useAppDispatch();
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const chartData = useAppSelector((state) => state.chartData);

  useEffect(() => {
    dispatch(fetchChartData(timeFrame));
  }, [dispatch, timeFrame]);

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
    type: string
  ) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    if (type === "line") {
      gradient.addColorStop(0, "rgba(34, 34, 67, 1)");
      gradient.addColorStop(1, "rgba(63, 63, 131, 1)");
    } else {
      gradient.addColorStop(0, "rgba(51,38,78,255)");
      gradient.addColorStop(1, "rgba(152,95,210,255)");
    }
    return gradient;
  };

  return (
    <div>
      <div className="md:flex justify-between my-3 md:space-x-5">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
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
                  borderColor: "#7272ed",
                  fill: true,
                  backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                      return;
                    }
                    return getGradient(ctx, chartArea, "line");
                  },
                },
              ],
            }}
            options={options}
          />
        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white">
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
                  borderRadius: 7,
                  backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) {
                      return;
                    }
                    return getGradient(ctx, chartArea, "bar");
                  },
                },
              ],
            }}
            options={options}
          />
        </div>
      </div>
      <TimeChart />
    </div>
  );
};

export default ChartOverview;
