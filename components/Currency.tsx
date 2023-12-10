import React from "react";
import Image from "next/image";
import * as Icons from "../icons";

const Currency = () => {
  return (
    <div className="flex items-center bg-[#181825] border border-border rounded-md mx-1 p-2 h-20 w-50">
      <Image
        className="h-7 w-7 mx-2"
        src={Icons.BitcoinIcon}
        alt="BitcoinIcon"
      />
      <div className="flex-col ml-2">
        BitCoin (BTC)
        <div className="flex">
          <div className="text-secondary mr-2">27,445.55 USD</div>
          <div className="text-green-500">10.67%</div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
