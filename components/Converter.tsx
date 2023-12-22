"use client"
import { useEffect } from "react";
import { Chart as ChartJS, registerables, ChartArea } from "chart.js";
import { Line } from "react-chartjs-2";
import TimeChart from "./TimeChart";
import { useTheme } from "@/context/ThemeContext";
import Image from "next/image";
import * as Icons from "../icons";
import { useAppSelector, useAppDispatch } from "../app/store/hooks";
import { ChartData, fetchChartData } from "../app/store/slices/chartDataSlice";
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

const options = {
  responsive: true,
  maintainAspectRatio: false,
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

function prepareChartData(chartData: ChartData[], chartType: 'line' | 'bar'): { labels: string[], datasets: Dataset[] } {
  let labels: string[] = [];
  let unsortedDatasets: Dataset[] = [];

  // Generate labels for Chart
  if (chartData.length > 0) {
    labels = chartData[0].prices.map(data => new Date(data[0]).toLocaleString("default", { month: "short" }));
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

const Converter = () => {
  const chartData = useAppSelector((state) => state.chartData);
  const dispatch = useAppDispatch();
  const timeFrame = useAppSelector((state) => state.time.timeFrame);
  const { theme } = useTheme();

  useEffect(() => {
    dispatch(
      fetchChartData({ timeFrame: timeFrame, selectedCoins: [] })
    );
  }, [dispatch, timeFrame]);

  return (
    <div>
      <div className="mt-9 mb-5">
        <p className="text-lg text-[#424286] dark:text-white">Online currency converter</p>
        <p className="text-[#3c3c7e] dark:text-secondary">{new Date().toLocaleString()}</p>
      </div>
      <div className="md:flex items-center justify-between relative">
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#191932] p-7 rounded-[20px] text-black dark:text-white">
          <div>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary">You sell</p>
            <div className="flex space-x-2 mt-7 mb-3">
              <Image className="w-5" src={Icons.BitcoinIcon} alt="BTC"/>
              <p>Bitcoin (BTC)</p>
            </div>
            <hr className=""/>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">1 BTC = $26,250.15</p>
          </div>
        </div>
        <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ top: '50%', left: '50%' }}>
          {theme === "light" ? (
            <Image className="w-[50px]" src={Icons.ConverterIcon} alt="ConverterIcon" />
          ) : (
            <Image className="w-[50px]" src={Icons.WhiteConverterIcon} alt="WhiteConverterIcon" />
          )}
        </div>
        <div className="md:w-[50%] sm:w-[100%] bg-white dark:bg-[#1e1932] p-7 rounded-[20px] text-black dark:text-white ml-5">
        <div>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary">You buy</p>
            <div className="flex space-x-2 mt-7 mb-3">
              <Image className="w-5" src={Icons.EthereumIcon} alt="ETH"/>
              <p>Ethereum (ETH)</p>
            </div>
            <hr className=""/>
            <p className="text-xs text-[#3c3c7e] dark:text-secondary mt-3">1 BTC = $8,914.12</p>
          </div>
        </div>
      </div>
      <div className="w-[100%] h-[450px] bg-white dark:bg-[#191932] mt-14 p-7 rounded-[20px] text-black dark:text-white">
        <p className="text-[#424286] dark:text-white">Bitcoin(BTC) to Ethereum(ETH)</p>
        <div className="w-full h-full p-4">
          <Line data={prepareChartData(chartData, 'line')} options={options} />
        </div>
      </div>
      <TimeChart />
    </div>
  ) 
}

export default Converter;