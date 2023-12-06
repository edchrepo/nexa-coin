"use client"

import React, { useState, useEffect } from 'react'
import { formatCurrency } from "@/utils/utils";
import ProgressBar from "./ProgressBar";

interface MarketData {
    active_cryptocurrencies: number;
    ended_icos: number
    market_cap_change_percentage_24h_usd: number;
    market_cap_percentage: { [key: string]: number };
    markets: number;
    ongoing_icos: number;
    total_market_cap: { [key: string]: number };
    total_volume: { [key: string]: number };
    upcoming_icos: number;
    updated_at: number;
}


const MarketData = () => {
  const [marketData, setMarketData] = useState<MarketData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/global"
        );
        const data = await response.json();
        console.log(data);
        setMarketData(data.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#1f2128] mt-3 flex justify-center pb-3.5">
      <div className="bg-[#191b1f] w-[60%] rounded-b-[20px] text-base p-3.5 flex justify-between items-center space-x-2">
      {marketData ? 
        <>
          <p>{`Coins ${marketData.active_cryptocurrencies}`}</p>
          <p>{`Exchange ${marketData.markets}`}</p>
          <p>{formatCurrency(marketData.total_market_cap.usd)}</p>
          <p>{formatCurrency(marketData.total_volume.usd)}</p>
          <p>{`${Math.floor(marketData.market_cap_percentage.btc)}%`}
            <ProgressBar
                    progress={Math.min(
                      Math.round((marketData.market_cap_percentage.btc / 100) * 100),
                      100
                    )}
            />
          </p>
          <p>{`${Math.floor(marketData.market_cap_percentage.eth)}%`}
            <ProgressBar
                    progress={Math.min(
                      Math.round((marketData.market_cap_percentage.eth / 100) * 100),
                      100
                    )}
            />
          </p>
        </>
        :
        <p>Loading Market Data...</p>
      }
      </div>
    </div>
  )
}

export default MarketData