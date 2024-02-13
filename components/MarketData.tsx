"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchMarketData } from "@/store/slices/marketDataSlice";
import Image from "next/image";
import ProgressBar from "./ProgressBar";
import { currencyMap, formatCurrency } from "@/utils/utils";
import * as Icons from "@/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const settings = {
  autoplay: true,
  arrows: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      }
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const MarketData = () => {
  const dispatch = useAppDispatch();
  const marketData = useAppSelector((state) => state.marketData);
  const currency = useAppSelector((state) => state.currency.value);

  useEffect(() => {
    dispatch(fetchMarketData());
  }, [dispatch]);

  const dataPoints = [
    {
      icon: Icons.BoltCircle,
      style: "h-7 w-7 mr-1",
      label: "Coins",
      value: marketData.active_cryptocurrencies,
    },
    {
      icon: Icons.ExchangeIcon,
      style: "h-7 w-7 mr-1",
      label: "Exchange",
      value: marketData.markets,
    },
    {
      icon:
        marketData.market_cap_change_percentage_24h_usd > 0
          ? Icons.UpArrow
          : Icons.DownArrow,
      style: "h-3 w-3 mr-1",
      label: formatCurrency(
        marketData.total_market_cap[currency],
        currency as keyof typeof currencyMap
      ),
    },
    {
      label: formatCurrency(
        marketData.total_volume[currency],
        currency as keyof typeof currencyMap
      ),
      progressBar: {
        progress: Math.min(
          100,
          Math.round(
            (marketData.total_volume[currency] /
              marketData.total_market_cap[currency]) *
              100
          )
        ),
        color: "#71797E",
      },
    },
    {
      icon: Icons.BitcoinIcon,
      style: "h-7 w-7 mr-1",
      label: `${Math.floor(marketData.market_cap_percentage.btc)}%`,
      progressBar: {
        progress: Math.floor(marketData.market_cap_percentage.btc),
        color: "#f7931a",
      },
    },
    {
      icon: Icons.EthereumIcon,
      style: "h-7 w-7 mr-1",
      label: `${Math.floor(marketData.market_cap_percentage.eth)}%`,
      progressBar: {
        progress: Math.floor(marketData.market_cap_percentage.eth),
        color: "#849dff",
      },
    },
  ];

  const dataMap = dataPoints.map((point, index) => (
    <div key={index} className="w-[13.5%]">
      <div className="h-7 flex items-center justify-center my-2">
        {point.icon && (
          <Image className={point.style} src={point.icon} alt={point.label} />
        )}
        <p className="mr-1 text-[#cfcfcf]">{point.label}</p>
        <span>{point.value}</span>
        {point.progressBar && (
          <div className="ml-2 w-full">
            <ProgressBar
              progress={point.progressBar.progress}
              color={point.progressBar.color}
              height={6}
            />
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div className="bg-[#383474] dark:bg-[#1e1932] p-5 border-b-2 border-[#3f3f4a]">
      <div className="w-[60%] text-sm mx-auto">
        {marketData ? (
          <>
            {/* Mobile View */}
            <div className="lg:hidden">
              <Slider {...settings}>{dataMap}</Slider>
            </div>

            {/* Desktop View */}
            <div className="hidden lg:flex justify-between">{dataMap}</div>
          </>
        ) : (
          <p>Loading Market Data...</p>
        )}
      </div>
    </div>
  );
};

export default MarketData;
