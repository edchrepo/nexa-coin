"use client"

import { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2'
ChartJS.register(...registerables);

export default function Home() {
  const [chartData, setChartData] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily')
      const data = await response.json();

      setChartData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-[#1f2128] flex justify-center">
      <div className="w-[80%]">
        <div>
          Overview
          <Line
            data={{
              labels: ['Jun', 'Jul', 'Aug'],
              datasets: [
                {
                  label: 'Test1',
                  data: [5, 6, 7],
                },
                {
                  label: 'Test2',
                  data: [3, 2, 1],
                },
              ],
            }}
          />
        </div>
        <div>
          Table
        </div>
      </div>
    </div>
  );
}