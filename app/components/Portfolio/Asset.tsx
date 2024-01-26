"use client";

import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { fetchCoinsData } from "@/app/store/slices/coinsDataSlice";
import { fetchProfitPercentage } from "@/app/store/slices/portfolioSlice";
import { AssetData } from "@/app/store/slices/portfolioSlice";
import Image from "next/image";
import * as Icons from "@/app/icons";
import PercentageDisplay from "./PercentageDisplay";
import ProgressBar from "../ProgressBar";
import { currencyMap, formatCurrency } from "@/app/utils/utils";

export interface AssetProps {
  asset: AssetData;
  onEdit: () => void;
}

const Asset: React.FC<AssetProps> = ({ asset, onEdit }) => {
  const dispatch = useAppDispatch();
  const coins = useAppSelector((state) => state.coinsData);
  const currency = useAppSelector((state) => state.currency.value);
  const coin = coins.find(
    (coin) => coin.name === asset.name || coin.symbol === asset.symbol
  );
  const currentPrice = coin ? coin.current_price : 0;
  const [profitPercentage, setProfitPercentage] = useState(0);
  const marketToVolume = coin
    ? Math.round((coin.total_volume / coin.market_cap) * 100)
    : 0;
  const priceChange24h = coin
    ? coin.price_change_percentage_24h_in_currency
    : 0;
  const circToMax = coin
    ? Math.round((coin.circulating_supply / coin.total_supply) * 100)
    : 0;

  useEffect(() => {
    dispatch(fetchCoinsData(1));
  }, [dispatch, currency]);

  useEffect(() => {
    const calculateProfitPercentage = async () => {
      if (coin && asset && coin.id && coin.current_price) {
        try {
          const response = await dispatch(
            fetchProfitPercentage({
              assetId: coin.id,
              purchaseDate: asset.purchaseDate,
              currentPrice: coin.current_price,
              currency: currency,
            })
          ).unwrap();
          setProfitPercentage(response);
        } catch (error) {
          console.error("Error calculating profit percentage:", error);
        }
      }
    };

    // call async function
    calculateProfitPercentage();
  }, [coin, asset, currency, dispatch]);

  return (
    <div className="flex border bg-white dark:bg-[#191925] dark:border-[#19192e] rounded-lg mb-6">
      <div className="flex-1 p-2 bg-[#a2a3e8] dark:bg-[#191932] rounded-l-lg">
        <div className="p-2">
          <div className="flex justify-between mt-2">
            <div className="flex space-x-2">
              <img src={asset.image} className="w-7" alt={asset.name} />
              <span className="text-[#3c3c7e] dark:text-white text-2xl">
                {asset.name} ({asset.symbol?.toUpperCase()})
              </span>
            </div>
            <button className="bg-[#3c3c7e] rounded-md p-1" onClick={onEdit}>
              <Image className="w-6" src={Icons.Edit} alt="edit" />
            </button>
          </div>
          <div className="dark:text-secondary mt-8">Total Value</div>
          <div className="flex space-x-2 items-center mt-1">
            <span className="text-[#3c3c7e] dark:text-white text-2xl">
              {currencyMap[asset.currency as keyof typeof currencyMap]}
              {asset.totalValue.toLocaleString()} {asset.currency.toUpperCase()}
            </span>
            {profitPercentage > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <PercentageDisplay
              value={profitPercentage}
              isPositive={profitPercentage > 0}
            />
          </div>
          <div className="dark:text-secondary mt-1">
            Purchased {new Date(asset.purchaseDate).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col rounded-lg p-3">
          <span className="text-[#3c3c7e] dark:text-white text-xl">
            {formatCurrency(currentPrice, currency as keyof typeof currencyMap)}
          </span>
          <span className="text-secondary">Current Price</span>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex items-center">
            <PercentageDisplay
              className="text-xl mr-6"
              value={marketToVolume}
              isPositive={priceChange24h > 0}
            />
            <ProgressBar
              progress={marketToVolume}
              color={`${priceChange24h > 0 ? "#00b1a6" : "#fe2264"}`}
              secondaryColor={`${priceChange24h > 0 ? "#afe5e5" : "#fbbad1"}`}
            />
          </div>
          <div className="text-secondary">Market cap vs volume</div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col rounded-lg p-3">
          <div
            className={`flex space-x-2 ${
              priceChange24h > 0 ? "text-[#00b1a6]" : "text-[#fe2264]"
            }`}
          >
            {priceChange24h > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <span className="text-xl">
              {Math.abs(Math.round(100 * priceChange24h) / 100)}%
            </span>
          </div>
          <div className="text-secondary">24h%</div>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex space-x-2">
            {priceChange24h > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <PercentageDisplay
              className="text-xl"
              value={circToMax}
              isPositive={priceChange24h > 0}
            />
          </div>
          <div className="text-secondary">Circ supply vs max supply</div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
