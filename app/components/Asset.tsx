import React from "react";
import Image from "next/image";
import * as Icons from "@/app/icons";
import ProgressBar from "./ProgressBar";

const Asset = () => {
  return (
    <div className="flex border bg-[#191925] border-[#19192e] rounded-lg mb-6">
      <div className="flex-1 p-2 bg-[#191932] rounded-l-lg">
        <div className="p-2">
          <div className="flex space-x-2 items-center mt-2">
            <Image className="w-7" src={Icons.BitcoinIcon} alt="BTC" />
            <span className="text-2xl">Bitcoin (BTC)</span>
          </div>
          <div className="text-secondary mt-8">Total Value</div>
          <div className="flex space-x-2 items-center mt-1">
            <span className="text-2xl">$29,850 USD</span>
            <Image className="w-5" src={Icons.UpArrow} alt="+" />
            <span className="text-[#00b1a6]">6.76%</span>
          </div>
          <div className="text-secondary mt-1">Purchased 03.23.2023</div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col border border-[#212137] rounded-lg p-3">
          <span className="text-xl">$29,850</span>
          <span className="text-secondary">Current Price</span>
        </div>
        <div className="flex flex-col border border-[#212137] rounded-lg p-3 mt-4">
          <div className="flex items-center">
            <span className="text-[#00b1a6] text-xl mr-6">44%</span>
            <ProgressBar
              progress={44}
              color="#00b1a6"
              secondaryColor="#afe5e5"
            />
          </div>
          <div className="text-secondary">Market cap vs volume</div>
        </div>
      </div>
      <div className="flex-1 px-4 py-5">
        <div className="flex flex-col border border-[#212137] rounded-lg p-3">
          <div className="flex space-x-2">
            <Image className="w-5" src={Icons.UpArrow} alt="+" />
            <span className="text-[#00b1a6] text-xl">11.04%</span>
          </div>
          <div className="text-secondary">24h%</div>
        </div>
        <div className="flex flex-col border border-[#212137] rounded-lg p-3 mt-4">
          <div className="flex space-x-2">
            <Image className="w-5" src={Icons.UpArrow} alt="+" />
            <span className="text-[#00b1a6] text-xl">8.41%</span>
          </div>
          <div className="text-secondary">Circ supply vs max supply</div>
        </div>
      </div>
    </div>
  );
};

export default Asset;
