"use client";

import Image from "next/image";
import * as Icons from "@/app/icons";
import DataStats from "./DataStats";
import Description from "./Description";
import { useParams } from 'next/navigation'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchCoinSummary } from "@/app/store/slices/coinSummarySlice";

const CoinSummary = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const coinSummary = useAppSelector((state) => state.coinSummary);

  useEffect(() => {
    const coinId = params.coinId as string;
    dispatch(fetchCoinSummary(coinId));
  }, [dispatch, params]);

  return (
    <div className="flex-col justify-center w-[90%]">
      <div className="mt-9 mb-5">
        <p className="text-lg text-[#424286] dark:text-white">
          Portfolio / {coinSummary.name} summary
        </p>
      </div>
      <div className="flex justify-center space-x-16">
        <div className="w-[55%] space-y-48">
          <div className="flex space-x-8">
            <div className="w-[45%] space-y-5">
              <div className="bg-white dark:bg-[#1e1932] p-20 rounded-[20px] text-black dark:text-white ">
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  <img
                    className="h-10 w-10"
                    src={coinSummary.image.large}
                    alt="Bitcoin"
                  />
                  <p className="text-xl font-bold">
                    {coinSummary.name} ({coinSummary.symbol.toUpperCase()})
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-5 rounded-[20px] text-black dark:text-white space-x-3">
                <Image
                  className="h-5 w-5"
                  src={Icons.WhiteLink}
                  alt="whitelink"
                />
                <p>{coinSummary.links.homepage}</p>
                <Image
                  className="h-5 w-5"
                  src={Icons.WhiteCopy}
                  alt="whitetab"
                />
              </div>
            </div>
            <div className="w-[55%] flex flex-col justify-center items-center bg-white dark:bg-[#1e1932] rounded-[20px] text-black dark:text-white">
              <div>
                <div className="flex space-x-6">
                  <p className="text-3xl font-bold">
                    ${coinSummary.market_data.current_price.usd}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Image
                      className="h-2 w-2"
                      src={Icons.UpArrow}
                      alt="uparrow"
                    />
                    <p className="text-[#00b1a6]">
                      {coinSummary.market_data.price_change_percentage_24h}
                    </p>
                  </div>
                </div>
                <div className="flex text-lg space-x-2 mt-2">
                  <p>Profit:</p>
                  <p className="text-[#00b1a6]">$1,502</p>
                </div>
                <div className="flex justify-center">
                  <Image
                    className="h-5 w-5 mt-5"
                    src={Icons.Stack}
                    alt="stack"
                  />
                </div>
                <div className="flex items-center mt-5 space-x-3">
                  <Image
                    className="h-5 w-5"
                    src={Icons.UpArrow}
                    alt="uparrow2"
                  />
                  <p>All time high:</p>
                  <p>{coinSummary.market_data.ath.usd}</p>
                </div>
                <p className="text-[#3c3c7e] dark:text-secondary ml-8">
                  {new Date(coinSummary.market_data.ath_date.usd).toUTCString()}
                </p>
                <div className="flex items-center mt-5 space-x-3">
                  <Image
                    className="h-5 w-5"
                    src={Icons.DownArrow}
                    alt="downarrow2"
                  />
                  <p>All time low:</p>
                  <p>{coinSummary.market_data.atl.usd}</p>
                </div>
                <p className="text-[#3c3c7e] dark:text-secondary ml-8">
                  {new Date(coinSummary.market_data.atl_date.usd).toUTCString()}
                </p>
              </div>
            </div>
          </div>
          <div>
            <p>Description</p>
            <Description text={coinSummary.description.en} maxLength={750} />
          </div>
        </div>
        <div className="w-[45%] space-y-44">
          <DataStats data={coinSummary} />
          <div className="space-y-6">
            {coinSummary.links.blockchain_site
              .filter((site) => site.length > 0)
              .slice(0, 3) // Get only the first 3 links
              .map((site, index) => (
                <div key={index} className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-4 rounded-[20px] text-black dark:text-white space-x-3">
                  <Image
                    className="h-5 w-5"
                    src={Icons.WhiteLink}
                    alt="whitelink"
                  />
                  <p>{site.substring(0, 50)}</p>
                  <Image
                    className="h-5 w-5"
                    src={Icons.WhiteCopy}
                    alt="whitetab"
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinSummary;
