"use client";

import { useEffect } from "react";
import { Chart as ChartJS, registerables, ChartArea } from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import TimeChart from "./TimeChart";
import { useAppDispatch, useAppSelector } from "../app/store/hooks";
import { ChartData, fetchChartData } from "../app/store/slices/chartDataSlice";
import { formatCurrency } from "@/utils/utils";
ChartJS.register(...registerables);

interface Dataset {
  label: string;
  data: number[];
  tension?: number;
  borderColor?: string;
  fill?: boolean;
  borderRadius?: number;
  backgroundColor: any;
}

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
      stacked: true,
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
    y: {
      grid: {
        display: false,
      },
      border: {
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
  const selectedCoins = useAppSelector((state) => state.selectedCoinData.coins);
  const chartData = useAppSelector((state) => state.chartData);
  const latestPriceData = getLatestData(chartData[0].prices);
  const latestVolumeData = getLatestData(chartData[0].total_volumes);

  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, selectedCoins: selectedCoins })
    );
    console.log(chartData);
  }, [dispatch, timeFrame, selectedCoins]);

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: ChartArea,
    type: string,
    index: number
  ) => {
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    if (type === "line" || (index === 1 && type === "bar")) {
      gradient.addColorStop(0, "rgba(34, 34, 67, 1)");
      gradient.addColorStop(1, "rgba(63, 63, 131, 1)");
    }
    if (type === "bar" || (index === 1 && type === "line")) {
      gradient.addColorStop(0, "rgba(51,38,78, 1)");
      gradient.addColorStop(1, "rgba(152,95,210, 1)");
    }
    return gradient;
  };

  function getLatestData(dataArray: number[][]) {
    if (dataArray.length > 0 && dataArray[0].length > 0) {
      const lastElement = dataArray[0][dataArray[0].length - 1] as unknown as [number, number];
      return {
        lastValue: lastElement[1],
        lastDate: new Date(lastElement[0]).toDateString(),
      };
    }
    return { lastValue: null, lastDate: null };
  }

  function prepareChartData(chartData: ChartData[], chartType: 'line' | 'bar'): { labels: string[], datasets: Dataset[] } {
    let labels: string[] = [];
    let unsortedDatasets: Dataset[] = [];
  
    // Generate labels for Chart
    if (chartData.length > 0) {
      labels = chartData[0].prices.map(data => new Date(data[0]).toLocaleDateString());
    }
  
    chartData.forEach((coinData, index) => {
      const dataArray = chartType === 'line' ? coinData.prices : coinData.total_volumes;
  
      // Generate dataset for each currency
      if (dataArray.length > 0) {
        const dataPoints = dataArray.map(data => data[1]);
  
        unsortedDatasets.push({
          label: `Dataset ${index + 1}`,
          data: dataPoints,
          ...(chartType === 'line' ? {
            tension: 0.4,
            borderColor: index === 0 ? "#7272ed" : "#d878fa",
            fill: true,
          } : {
            borderRadius: 7,
          }),
          backgroundColor: (context: any) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea || !ctx) {
              return 'rgba(0,0,0,0)';
            }
            return getGradient(ctx, chartArea, chartType, index);
          },
        })
    }});
  
    // Sort datasets based on their data range (smaller to larger)
    let datasets = unsortedDatasets.sort((a, b) => {
      let aMax = Math.max(...a.data);
      let bMax = Math.max(...b.data);
      return aMax - bMax;
    });
  
    return { labels, datasets };
  }

return (
  <div>
      <div className="md:flex justify-between my-3 md:space-x-5">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
          <div className="absolute text-sm">
          <div className="absolute text-sm">
            <p>Price</p>
            {latestPriceData.lastValue !== null ? (
              <>
                <p className="text-2xl">{formatCurrency(latestPriceData.lastValue / 1000)} ths</p>
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
                <p className="text-2xl">{formatCurrency(latestVolumeData.lastValue / 1000000000)} blns</p>
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
