import React from "react";
import Image from "next/image";
import * as Icons from "../icons";
import { CoinData } from "@/app/store/slices/coinsDataSlice";

interface CurrencyProps {
  coin: CoinData;
  isSelected: boolean;
}

const Currency: React.FC<CurrencyProps> = ({ coin, isSelected }) => {
  const currencyClass = isSelected
    ? "bg-[#3c3c7e] border-[#6161cb] shadow-whiteShadow"
    : "bg-[#181825] border-[#181825]";

  return (
    <div
      className={`flex items-center border-2 ${currencyClass} rounded-md mx-1 my-3 p-2 h-20 w-50`}
    >
      <img src={coin.image} className="h-7 w-7 mx-2" alt={coin.name} />
      <div className="flex-col ml-2">
        {coin.name} ({coin.symbol.toUpperCase()})
        <div className="flex">
          <div className="text-secondary mr-2">{coin.current_price}</div>
          <div
            className={`flex items-center ${
              coin.price_change_percentage_1h_in_currency > 0
                ? "text-[#00b1a6]"
                : "text-[#fe2264]"
            }`}
          >
            {coin.price_change_percentage_1h_in_currency > 0 ? (
              <Image className="h-3 w-3 mr-1" src={Icons.UpArrow} alt="+" />
            ) : (
              <Image className="h-3 w-3 mr-1" src={Icons.DownArrow} alt="-" />
            )}
            {Math.abs(
              Math.round(100 * coin.price_change_percentage_1h_in_currency) /
                100
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
