"use client"

import React, { useState, useEffect } from 'react'
import { formatCurrency } from "@/utils/utils";
import Image from 'next/image';
import * as Icons from "../icons";
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
    <div className="bg-[#1e1932] flex justify-center p-5 border-b-2 border-[#3f3f4a]">
      <div className="w-[60%] text-sm flex justify-between items-center">
      {marketData ? 
        <>
          <div className="flex items-center">
            <Image className="h-7 w-7 mr-1" src={Icons.BoltCircle} alt="Bolt Circle"/>
            <p className="mr-1 text-[#cfcfcf]">Coins</p>
            <span>{marketData.active_cryptocurrencies}</span>
          </div>
          <div className="flex items-center">
            <Image className="h-7 w-7 mr-1" src={Icons.ExchangeIcon} alt="Exchange"/>
            <p className="mr-1 text-[#cfcfcf]">Exchange</p>
            <span>{marketData.markets}</span>
          </div>
          <div className="flex items-center">
            <Image className="h-3 w-3 mr-1" src={marketData.market_cap_change_percentage_24h_usd > 0 ? Icons.UpArrow : Icons.DownArrow} alt="Arrow"/>
            <p>{formatCurrency(marketData.total_market_cap.usd)}</p>
          </div>
          <div className="flex items-center w-[13.5%]">
            <span className="mr-2">{formatCurrency(marketData.total_volume.usd)}</span>
            <ProgressBar
                    progress={Math.min(
                      Math.round((marketData.total_volume.usd / marketData.total_market_cap.usd) * 100),
                      100
                    )}
                    height={6}
            />
          </div>
          <div className="flex items-center w-[13.5%]">
              <Image className="h-7 w-7 mr-1" src={Icons.BitcoinIcon} alt="BitcoinIcon"/>
              <span className="mr-2">{`${Math.floor(marketData.market_cap_percentage.btc)}%`}</span>
              <ProgressBar
                      progress={Math.min(
                        Math.round((marketData.market_cap_percentage.btc / 100) * 100),
                        100
                      )}
                      color="#f7931a"
                      height={6}
              />
          </div>
          <div className="flex items-center w-[13.5%]">
            <Image className="h-7 w-7 mr-1" src={Icons.EthereumIcon} alt="EthereumIcon"/>
            <span className="mr-2">{`${Math.floor(marketData.market_cap_percentage.eth)}%`}</span>
            <ProgressBar
                    progress={Math.min(
                      Math.round((marketData.market_cap_percentage.eth / 100) * 100),
                      100
                    )}
                    color="#849dff"
                    height={5}
            />
          </div>
        </>
        :
        <p>Loading Market Data...</p>
      }
      </div>
    </div>
  )
}

export default MarketData