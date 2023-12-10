import React from "react";
import Image from "next/image";
import * as Icons from "../icons";

const Currency = () => {
  return (
    <div className="flex bg-[#181825] border border-border rounded-md mx-1">
      <Image
        className="h-7 w-7 mr-1"
        src={Icons.BitcoinIcon}
        alt="BitcoinIcon"
      />
      BitCoin (BTC)
      <div>$20k</div>
      <div>1hr - price</div>
    </div>
  );
};

export default Currency;
