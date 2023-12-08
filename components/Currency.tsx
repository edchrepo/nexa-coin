import React from "react";
import Image from "next/image";
import * as Icons from "../icons";

const Currency = () => {
  return (
    <div>
      <Image
        className="h-7 w-7 mr-1"
        src={Icons.BitcoinIcon}
        alt="BitcoinIcon"
      />
      BitCoin
      <div>$20k</div>
    </div>
  );
};

export default Currency;
