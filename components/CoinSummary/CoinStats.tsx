import Image from "next/image";
import * as Icons from "@/icons";
import { CoinSummary } from "@/store/slices/coinSummarySlice";
import { AssetData } from "@/store/slices/portfolioSlice";
import { useAppSelector } from "@/store/hooks";
import {
  currencyMap,
  formatCurrencyCommas,
  calculateProfitPercentage,
} from "@/utils/utils";

export type CoinStatsProps = {
  data: CoinSummary;
  handleCopy: (link: string) => void;
  asset: AssetData | undefined;
  copiedLink: string | null;
};

const CoinStats: React.FC<CoinStatsProps> = ({
  data,
  handleCopy,
  asset,
  copiedLink,
}) => {
  const currency = useAppSelector((state) => state.currency);
  const profit = Math.round(
    ((asset?.totalValue || 0) *
      calculateProfitPercentage(
        data.market_data.current_price[currency.value],
        asset?.historicalPrice
      )) /
      100
  );
  const percentage = data.market_data.price_change_percentage_24h;

  return (
    <div className="flex flex-col med:flex-row space-y-8 med:space-x-8 med:space-y-0">
      <div className="med:w-[45%] space-y-5">
        <div className="bg-[#7272ab] dark:bg-[#1e1932] px-8 py-20 rounded-[20px] text-black dark:text-white ">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <img className="h-10 w-10" src={data.image.large} alt="Bitcoin" />
            <p className="text-xl font-bold">
              {data.name} ({data.symbol.toUpperCase()})
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-[#7272ab] dark:bg-[#1e1932] p-5 rounded-[20px] text-black dark:text-white space-x-3">
          <a
            href={data.links.homepage[0]}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="h-5 w-5 cursor-pointer"
              src={Icons.WhiteLink}
              alt="whitelink"
            />
          </a>
          <p>{data.links.homepage}</p>
          <div className="relative">
            <Image
              className="h-5 w-5 cursor-pointer"
              src={
                copiedLink === data.links.homepage[0]
                  ? Icons.Copied
                  : Icons.WhiteCopy
              }
              alt={copiedLink === data.links.homepage[0] ? "Check" : "Copy"}
              onClick={() => handleCopy(data.links.homepage[0])}
            />
            {copiedLink === data.links.homepage[0] && (
              <div className="absolute -mt-14 p-2 bg-black text-white text-xs rounded-lg">
                Copied!
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="med:w-[55%] p-8 flex flex-col justify-center items-center bg-[#7272ab] dark:bg-[#1e1932] rounded-[20px] text-black dark:text-white">
        <div>
          <div className="flex space-x-6">
            <p className="text-3xl font-bold">
              {formatCurrencyCommas(
                data.market_data.current_price[currency.value],
                currency.value as keyof typeof currencyMap
              )}
            </p>
            <div className="flex items-center space-x-1">
              {percentage > 0 ? (
                <Image className="h-2 w-2" src={Icons.UpArrow} alt="uparrow" />
              ) : (
                <Image
                  className="h-2 w-2"
                  src={Icons.DownArrow}
                  alt="downarrow"
                />
              )}
              <p
                className={`${
                  percentage > 0 ? "text-[#00b1a6]" : "text-[#fe2264]"
                }`}
              >
                {data.market_data.price_change_percentage_24h}%
              </p>
            </div>
          </div>
          <div className="flex text-lg space-x-2 mt-2">
            <p>Profit:</p>
            <p
              className={`${profit > 0 ? "text-[#00b1a6]" : "text-[#fe2264]"}`}
            >
              {formatCurrencyCommas(
                profit,
                currency.value as keyof typeof currencyMap
              )}
            </p>
          </div>
          <div className="flex justify-center">
            <Image className="h-5 w-5 mt-5" src={Icons.Stack} alt="stack" />
          </div>
          <div className="flex items-center mt-5 space-x-3">
            <Image className="h-5 w-5" src={Icons.UpArrow} alt="uparrow2" />
            <p>All time high:</p>
            <p>
              {formatCurrencyCommas(
                data.market_data.ath[currency.value],
                currency.value as keyof typeof currencyMap
              )}
            </p>
          </div>
          <p className="text-[#3c3c7e] dark:text-secondary ml-8">
            {new Date(data.market_data.ath_date[currency.value]).toUTCString()}
          </p>
          <div className="flex items-center mt-5 space-x-3">
            <Image className="h-5 w-5" src={Icons.DownArrow} alt="downarrow2" />
            <p>All time low:</p>
            <p>
              {formatCurrencyCommas(
                data.market_data.atl[currency.value],
                currency.value as keyof typeof currencyMap
              )}
            </p>
          </div>
          <p className="text-[#3c3c7e] dark:text-secondary ml-8">
            {new Date(data.market_data.atl_date[currency.value]).toUTCString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinStats;
