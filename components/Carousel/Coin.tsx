import React from "react";
import Image from "next/image";
import * as Icons from "@/icons";
import { CoinData } from "@/store/slices/coinsDataSlice";
import { useAppSelector } from "@/store/hooks";
import { currencyMap, formatCurrencyCommas } from "@/utils/utils";

interface CoinProps {
  coin: CoinData;
  isSelected: boolean;
}

const Coin: React.FC<CoinProps> = ({ coin, isSelected }) => {
  const currency = useAppSelector((state) => state.currency.value);

  const currencyClass = isSelected
    ? "bg-[#aaabe8] dark:bg-[#3c3c7e] border-[#6161cb] shadow-whiteShadow"
    : "bg-white dark:bg-[#181825] border-white dark:border-[#181825]";

  return (
    <div
      className={`flex items-center border-2 ${currencyClass} rounded-md m-1 p-2 h-15 w-30 lg:h-20 lg:w-50 lg:my-3`}
    >
      <img src={coin.image} className="h-7 w-7 mx-2" alt={coin.name} />
      <div
        className={`flex-col ml-2 ${
          isSelected ? "text-white" : "text-black dark:text-white"
        }`}
      >
        <div className="flex">
          <span className="hidden lg:inline mr-2">{coin.name} </span>
          <span className="lg:hidden">{coin.symbol.toUpperCase()}</span>
          <span className="hidden lg:inline">
            ({coin.symbol.toUpperCase()})
          </span>
        </div>
        <div className="hidden lg:flex">
          <div
            className={`mr-2 ${
              isSelected
                ? "text-secondary"
                : "text-[#3c3c7e] dark:text-secondary"
            }`}
          >
            {formatCurrencyCommas(
              coin.current_price,
              currency as keyof typeof currencyMap
            )}
          </div>
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

export default Coin;