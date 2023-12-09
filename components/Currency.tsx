import React from "react";
import Image from "next/image";
import * as Icons from "../icons";

const Currency = () => {
  return (
    <div className="bg-[#181825] border border-border rounded-md">
      <Image
        className="h-7 w-7 mr-1"
        src={Icons.BitcoinIcon}
        alt="BitcoinIcon"
      />
      BitCoin
      <div>$20k</div>
      <div>1hr - price</div>
    </div>
  );
};

export default Currency;
