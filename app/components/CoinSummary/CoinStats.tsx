import Image from "next/image";
import * as Icons from "@/app/icons";
import { DataProps } from "./DataStats";

const CoinStats: React.FC<DataProps> = ({ data }) => {
  return (
    <div className="flex space-x-8">
      <div className="w-[45%] space-y-5">
        <div className="bg-white dark:bg-[#1e1932] px-8 py-20 rounded-[20px] text-black dark:text-white ">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <img className="h-10 w-10" src={data.image.large} alt="Bitcoin" />
            <p className="text-xl font-bold">
              {data.name} ({data.symbol.toUpperCase()})
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white dark:bg-[#1e1932] p-5 rounded-[20px] text-black dark:text-white space-x-3">
          <Image className="h-5 w-5" src={Icons.WhiteLink} alt="whitelink" />
          <p>{data.links.homepage}</p>
          <Image className="h-5 w-5" src={Icons.WhiteCopy} alt="whitetab" />
        </div>
      </div>
      <div className="w-[55%] p-8 flex flex-col justify-center items-center bg-white dark:bg-[#1e1932] rounded-[20px] text-black dark:text-white">
        <div>
          <div className="flex space-x-6">
            <p className="text-3xl font-bold">
              ${data.market_data.current_price.usd}
            </p>
            <div className="flex items-center space-x-1">
              <Image className="h-2 w-2" src={Icons.UpArrow} alt="uparrow" />
              <p className="text-[#00b1a6]">
                {data.market_data.price_change_percentage_24h}
              </p>
            </div>
          </div>
          <div className="flex text-lg space-x-2 mt-2">
            <p>Profit:</p>
            <p className="text-[#00b1a6]">$1,502</p>
          </div>
          <div className="flex justify-center">
            <Image className="h-5 w-5 mt-5" src={Icons.Stack} alt="stack" />
          </div>
          <div className="flex items-center mt-5 space-x-3">
            <Image className="h-5 w-5" src={Icons.UpArrow} alt="uparrow2" />
            <p>All time high:</p>
            <p>{data.market_data.ath.usd}</p>
          </div>
          <p className="text-[#3c3c7e] dark:text-secondary ml-8">
            {new Date(data.market_data.ath_date.usd).toUTCString()}
          </p>
          <div className="flex items-center mt-5 space-x-3">
            <Image className="h-5 w-5" src={Icons.DownArrow} alt="downarrow2" />
            <p>All time low:</p>
            <p>{data.market_data.atl.usd}</p>
          </div>
          <p className="text-[#3c3c7e] dark:text-secondary ml-8">
            {new Date(data.market_data.atl_date.usd).toUTCString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoinStats;
