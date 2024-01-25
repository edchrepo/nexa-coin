import React from "react";
import { AssetData } from "@/app/store/slices/portfolioSlice";
import Image from "next/image";
import * as Icons from "@/app/icons";
import PercentageDisplay from "./PercentageDisplay";
import ProgressBar from "../ProgressBar";
import { currencyMap } from "@/app/utils/utils";

export interface AssetProps {
  asset: AssetData;
  onEdit: () => void;
}

const Asset: React.FC<AssetProps> = ({ asset, onEdit }) => {
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
            {asset.profitPercentage > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <PercentageDisplay
              value={asset.profitPercentage}
              isPositive={asset.profitPercentage > 0}
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
            {currencyMap[asset.currency as keyof typeof currencyMap]}
            {asset.currentPrice.toLocaleString()}
          </span>
          <span className="text-secondary">Current Price</span>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex items-center">
            <PercentageDisplay
              className="text-xl mr-6"
              value={asset.marketToVolume}
              isPositive={asset.priceChange24h > 0}
            />
            <ProgressBar
              progress={asset.marketToVolume}
              color={`${asset.priceChange24h > 0 ? "#00b1a6" : "#fe2264"}`}
              secondaryColor={`${
                asset.priceChange24h > 0 ? "#afe5e5" : "#fbbad1"
              }`}
            />
          </div>
          <div className="text-secondary">Market cap vs volume</div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col rounded-lg p-3">
          <div
            className={`flex space-x-2 ${
              asset.priceChange24h > 0 ? "text-[#00b1a6]" : "text-[#fe2264]"
            }`}
          >
            {asset.priceChange24h > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <span className="text-xl">
              {Math.abs(Math.round(100 * asset.priceChange24h) / 100)}%
            </span>
          </div>
          <div className="text-secondary">24h%</div>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex space-x-2">
            {asset.priceChange24h > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <PercentageDisplay
              className="text-xl"
              value={asset.circToMax}
              isPositive={asset.priceChange24h > 0}
            />
          </div>
          <div className="text-secondary">Circ supply vs max supply</div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
