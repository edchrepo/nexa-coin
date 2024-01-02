import { Chart as ChartJS, registerables, ChartArea } from "chart.js";
import { ChartData } from "@/app/store/slices/chartDataSlice";
import { convert } from "@/app/utils/converterUtils"
ChartJS.register(...registerables);

// Type for Chart.js dataset
export interface Dataset {
  label: string;
  data: number[];
  tension?: number;
  borderColor?: string;
  fill?: boolean;
  borderRadius?: number;
  backgroundColor: any;
}

export const borderColors = ["#7272ed", "#d878fa", "#5ae3fb"];

// Chart.js chart option configs
export const options = {
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

// Chart.js gradient functionality
export const getGradient = (
  ctx: CanvasRenderingContext2D,
  chartArea: ChartArea,
  type: string,
  chartDataLength: number,
  index: number
) => {
  const gradient = ctx.createLinearGradient(
    0,
    chartArea.bottom,
    0,
    chartArea.top
  );
  if (chartDataLength === 1) {
    // Default gradients for single coin selection
    if (type === "line") {
      gradient.addColorStop(0, "rgba(34, 34, 67, 1)");
      gradient.addColorStop(1, "rgba(63, 63, 131, 1)");
    } else if (type === "bar") {
      gradient.addColorStop(0, "rgba(51,38,78, 1)");
      gradient.addColorStop(1, "rgba(152,95,210, 1)");
    }
  } else {
    // Shared gradients for multiple coins (up to 3 (1 < chartDataLength <= 3))
    if (index === 0) {
      gradient.addColorStop(0, "rgba(34, 34, 67, 1)");
      gradient.addColorStop(1, "rgba(63, 63, 131, 1)");
    } else if (index === 1) {
      gradient.addColorStop(0, "rgba(51,38,78, 1)");
      gradient.addColorStop(1, "rgba(152,95,210, 1)");
    } else if (index === 2) {
      gradient.addColorStop(0, "rgba(41, 128, 185, 1)");
      gradient.addColorStop(1, "rgba(21, 67, 96, 1)");
    }
  }
  return gradient;
};

// Get latest price/volume data for selected coin (passed as dataArray)
export function getLatestData(dataArray: number[][]) {
  if (dataArray.length > 0 && dataArray[0].length > 0) {
    const lastElement = dataArray[dataArray.length - 1];
    if (Array.isArray(lastElement)) {
      return {
        lastValue: lastElement[1],
        lastDate: new Date(lastElement[0]).toDateString(),
      };
    }
  }

  return { lastValue: null, lastDate: null };
}

// Create labels and datasets for either graph (line or bar)
export function prepareChartData(
  chartData: ChartData[],
  chartType: "line" | "bar"
): { labels: string[]; datasets: Dataset[] } {
  let labels: string[] = [];
  let unsortedDatasets: Dataset[] = [];

  // Generate labels for Chart
  if (chartData.length > 0) {
    labels = chartData[0].prices.map((data) =>
      new Date(data[0]).toLocaleDateString()
    );
  }

  chartData.forEach((coinData, index) => {
    const dataArray =
      chartType === "line" ? coinData.prices : coinData.total_volumes;

    // Generate dataset for each currency
    if (dataArray.length > 0) {
      const dataPoints = dataArray.map((data) => data[1]);

      unsortedDatasets.push({
        label: `Dataset ${index + 1}`,
        data: dataPoints,
        ...(chartType === "line"
          ? {
              tension: 0.4,
              borderColor: borderColors[index],
              fill: true,
            }
          : {
              borderRadius: 7,
            }),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea || !ctx) {
            return "rgba(0,0,0,0)";
          }
          return getGradient(ctx, chartArea, chartType, chartData.length, index);
        },
      });
    }
  });

  // Sort datasets based on their data range (smaller to larger)
  let datasets = unsortedDatasets.sort((a, b) => {
    let aMax = Math.max(...a.data);
    let bMax = Math.max(...b.data);
    return aMax - bMax;
  });

  return { labels, datasets };
}

// Create labels and datasets for Conversion Graph
export function prepareConverterData(
  chartData: ChartData[],
  convertFrom: number,
  convertTo: number
): { labels: string[]; datasets: Dataset[] } {
  let labels: string[] = [];
  let datasets: Dataset[] = []

  // Generate labels for Chart
  if (chartData.length > 0) {
    labels = chartData[0].prices.map((data) =>
      new Date(data[0]).toLocaleDateString()
    );
  }

  // Convert each original currency datapoint to converted currency amount (BTC to ETH)
  const dataPoints = chartData[0].prices.map((data) =>
    convert(data[1] / convertFrom, convertFrom, convertTo)
  );

  datasets.push({
    label: "Converted Dataset",
    data: dataPoints,
    tension: 0.4,
    borderColor: "#7272ed",
    fill: true,
    backgroundColor: (context: any) => {
      const chart = context.chart;
      const { ctx, chartArea } = chart;
      if (!chartArea || !ctx) {
        return "rgba(0,0,0,0)";
      }
      return getGradient(ctx, chartArea, "line", 1);
    },
  })

  return { labels, datasets };
}
