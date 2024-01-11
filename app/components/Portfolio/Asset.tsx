import React from "react";
import { AssetData } from "@/app/pages/portfolio/page";
import Image from "next/image";
import * as Icons from "@/app/icons";
import ProgressBar from "../ProgressBar";

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
              ${asset.total_value.toLocaleString()} USD
            </span>
            <Image className="w-5" src={Icons.UpArrow} alt="+" />
            <span className="text-[#00b1a6]">6.76%</span>
          </div>
          <div className="dark:text-secondary mt-1">
            Purchased {asset.purchase_date.toDateString()}
          </div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col rounded-lg p-3">
          <span className="text-[#3c3c7e] dark:text-white text-xl">
            ${asset.current_price.toLocaleString()}
          </span>
          <span className="text-secondary">Current Price</span>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex items-center">
            <span
              className={`text-xl mr-6 ${
                asset.price_change_percentage_24h_in_currency > 0
                  ? "text-[#00b1a6]"
                  : "text-[#fe2264]"
              }`}
            >
              {asset.market_vs_volume}%
            </span>
            <ProgressBar
              progress={asset.market_vs_volume}
              color={`${
                asset.price_change_percentage_24h_in_currency > 0
                  ? "#00b1a6"
                  : "#fe2264"
              }`}
              secondaryColor={`${
                asset.price_change_percentage_24h_in_currency > 0
                  ? "#afe5e5"
                  : "#fbbad1"
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
              asset.price_change_percentage_24h_in_currency > 0
                ? "text-[#00b1a6]"
                : "text-[#fe2264]"
            }`}
          >
            {asset.price_change_percentage_24h_in_currency > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <span className="text-xl">
              {Math.abs(
                Math.round(
                  100 * asset.price_change_percentage_24h_in_currency
                ) / 100
              )}
              %
            </span>
          </div>
          <div className="text-secondary">24h%</div>
        </div>
        <div className="flex flex-col rounded-lg p-3 mt-4">
          <div className="flex space-x-2">
            {asset.price_change_percentage_24h_in_currency > 0 ? (
              <Image className="w-5" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="w-5" src={Icons.DownArrow} alt="-" />
            )}
            <span
              className={`text-xl ${
                asset.price_change_percentage_24h_in_currency > 0
                  ? "text-[#00b1a6]"
                  : "text-[#fe2264]"
              }`}
            >
              {asset.circ_vs_max}%
            </span>
          </div>
          <div className="text-secondary">Circ supply vs max supply</div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
